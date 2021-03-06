import React, { Component } from "react";
import "./scss/App.scss";
import LetterRow from "./components/letterrow";
import Possibilities from "./components/possibilities";
import Header from "./components/header";
import HelpModal from "./components/helpmodal";

class App extends Component {
  state = {
    helpModalOpen: true,
    previousElement: null,
    letterRows: [
      {
        id: 0,
        letters: [
          { id: 0, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 1, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 2, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 3, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 4, value: "", adjective: "Absent", ref: React.createRef() },
        ],
      },
      {
        id: 1,
        letters: [
          { id: 0, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 1, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 2, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 3, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 4, value: "", adjective: "Absent", ref: React.createRef() },
        ],
      },
      {
        id: 2,
        letters: [
          { id: 0, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 1, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 2, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 3, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 4, value: "", adjective: "Absent", ref: React.createRef() },
        ],
      },
      {
        id: 3,
        letters: [
          { id: 0, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 1, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 2, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 3, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 4, value: "", adjective: "Absent", ref: React.createRef() },
        ],
      },
      {
        id: 4,
        letters: [
          { id: 0, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 1, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 2, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 3, value: "", adjective: "Absent", ref: React.createRef() },
          { id: 4, value: "", adjective: "Absent", ref: React.createRef() },
        ],
      },
    ],
  };

  getCorrectLetters() {
    let letters = new Set();
    for (let i = 0; i < this.state.letterRows.length; i++) {
      this.state.letterRows[i].letters
        .filter((l) => l.value !== "" && l.adjective === "Correct")
        .forEach((l) => letters.add(l));
    }
    return [...letters];
  }

  getPresentLetters() {
    let letters = new Set();
    for (let i = 0; i < this.state.letterRows.length; i++) {
      this.state.letterRows[i].letters
        .filter((l) => l.value !== "" && l.adjective === "Present")
        .forEach((l) => letters.add(l));
    }
    return [...letters];
  }

  getAbsentLetters() {
    let letters = new Set();
    for (let i = 0; i < this.state.letterRows.length; i++) {
      this.state.letterRows[i].letters
        .filter((l) => l.value !== "" && l.adjective === "Absent")
        .forEach((l) => letters.add(l));
    }
    return [...letters];
  }

  handleKeyDown = (letterRow, letter, e) => {
    if (e.key === "Tab" || e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      e.stopPropagation();
    }
    if (e.key === "Backspace") {
      const letterRows = [...this.state.letterRows];
      const letterRowIndex = letterRows.indexOf(letterRow);
      letterRows[letterRowIndex] = { ...letterRow };
      const letters = [...letterRows[letterRowIndex].letters];
      const letterIndex = letters.indexOf(letter);
      letters[letterIndex] = { ...letter };
      letterRows[letterRowIndex].letters = letters;

      let operatingLetter = letters[letterIndex];
      // If the currently focused box is empty, backspace should
      // focus and clear out the previous box
      // Otherwise we clear out the focused box
      if (letterIndex !== 0 && letters[letterIndex].value === "") {
        letters[letterIndex - 1].ref.current.focus();
        operatingLetter = letters[letterIndex - 1];
      }
      operatingLetter.value = "";
      operatingLetter.adjective = "Absent";
      this.setState({ letterRows });
    }
  };

  handleBlur = (letterRow, letter, e) => {
    const previousElement = letter.ref.current;
    this.setState({ previousElement });
  };

  handleChange = (letterRow, letter, e) => {
    const letterRows = [...this.state.letterRows];
    const letterRowIndex = letterRows.indexOf(letterRow);
    letterRows[letterRowIndex] = { ...letterRow };

    const letters = [...letterRows[letterRowIndex].letters];
    const letterIndex = letters.indexOf(letter);
    letters[letterIndex] = { ...letter };
    letterRows[letterRowIndex].letters = letters;

    const data = e.nativeEvent.data;
    if (!/^[a-zA-Z]{1}$/.test(data)) {
      return;
    } else {
      letters[letterIndex].value = e.nativeEvent.data.toUpperCase();
      if (letterIndex !== 4) {
        letters[letterIndex + 1].ref.current.focus();
      }
    }
    this.setState({ letterRows });
  };

  cycleAdjective(letterRow, letter) {
    const letterRows = [...this.state.letterRows];
    const letterRowIndex = letterRows.indexOf(letterRow);
    letterRows[letterRowIndex] = { ...letterRow };

    const letters = [...letterRows[letterRowIndex].letters];
    const letterIndex = letters.indexOf(letter);
    letters[letterIndex] = { ...letter };
    letterRows[letterRowIndex].letters = letters;

    letters[letterIndex] = { ...letter };
    const { adjective } = letters[letterIndex];
    if (adjective === "Absent") {
      letters[letterIndex].adjective = "Present";
    } else if (adjective === "Present") {
      letters[letterIndex].adjective = "Correct";
    } else {
      ///must be "Correct"
      letters[letterIndex].adjective = "Absent";
    }
    this.setState({ letterRows });
  }

  handleClick = (letterRow, letter, e) => {
    const { previousElement } = this.state;
    // We don't want to cycle on empty Letters or if we are clicking to
    // change focus.  The latter is determined by looking at the previously
    // focused element and the current element.  If they are the same, we cycle.
    // If they are not the same, this click should focus the element but NOT
    // cycle.
    if (letter.value !== "" && previousElement === letter.ref.current) {
      this.cycleAdjective(letterRow, letter);
    }
    this.setState({ previousElement: letter.ref.current });
  };

  setModalOpen = (value) => {
    this.setState({ helpModalOpen: value});
  }

  handleHelpClick = () => {
    this.setModalOpen(true);
  }

  render() {
    return (
      <React.Fragment>
        <Header onClick={this.handleHelpClick} />
        {this.state.helpModalOpen && <HelpModal setModalOpen={this.setModalOpen}/>}
        <div>
          {this.state.letterRows.map((lr) => (
            <LetterRow
              id={lr.id}
              key={lr.id}
              letterRow={lr}
              onChange={this.handleChange}
              onClick={this.handleClick}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
            />
          ))}
        </div>
        <div>
          <Possibilities
            correctLetters={this.getCorrectLetters()}
            presentLetters={this.getPresentLetters()}
            absentLetters={this.getAbsentLetters()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
