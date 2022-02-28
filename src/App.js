import React, { Component } from "react";
import "./App.css";
import LetterRow from "./components/letterrow";
import Possibilities from "./components/possibilities";

class App extends Component {
  state = {
    letterRows: [
      {
        id: 0,
        letters: [
          { id: 0, value: "", adjective: "NotInWord" },
          { id: 1, value: "", adjective: "NotInWord" },
          { id: 2, value: "", adjective: "NotInWord" },
          { id: 3, value: "", adjective: "NotInWord" },
          { id: 4, value: "", adjective: "NotInWord" },
        ],
      },
      {
        id: 1,
        letters: [
          { id: 0, value: "", adjective: "NotInWord" },
          { id: 1, value: "", adjective: "NotInWord" },
          { id: 2, value: "", adjective: "NotInWord" },
          { id: 3, value: "", adjective: "NotInWord" },
          { id: 4, value: "", adjective: "NotInWord" },
        ],
      },
      {
        id: 2,
        letters: [
          { id: 0, value: "", adjective: "NotInWord" },
          { id: 1, value: "", adjective: "NotInWord" },
          { id: 2, value: "", adjective: "NotInWord" },
          { id: 3, value: "", adjective: "NotInWord" },
          { id: 4, value: "", adjective: "NotInWord" },
        ],
      },
      {
        id: 3,
        letters: [
          { id: 0, value: "", adjective: "NotInWord" },
          { id: 1, value: "", adjective: "NotInWord" },
          { id: 2, value: "", adjective: "NotInWord" },
          { id: 3, value: "", adjective: "NotInWord" },
          { id: 4, value: "", adjective: "NotInWord" },
        ],
      },
      {
        id: 4,
        letters: [
          { id: 0, value: "", adjective: "NotInWord" },
          { id: 1, value: "", adjective: "NotInWord" },
          { id: 2, value: "", adjective: "NotInWord" },
          { id: 3, value: "", adjective: "NotInWord" },
          { id: 4, value: "", adjective: "NotInWord" },
        ],
      },
    ],
  };

  getInCorrectPlaceLetters() {
    let letters = new Set();
    for(let i = 0; i < this.state.letterRows.length; i++) {
      this.state.letterRows[i].letters
     .filter(l => l.value !== "" && l.adjective === "InCorrectPlace")
     .forEach(l => letters.add(l));
    }
      console.log("InCorrectPlace", letters);
      return [...letters];
  }

  getInWordLetters() {
    let letters = new Set();
    for(let i = 0; i < this.state.letterRows.length; i++) {
      this.state.letterRows[i].letters
     .filter(l => l.value !== "" && l.adjective === "InWord")
     .forEach(l => letters.add(l));
    }
      console.log("Inword", letters);
      return [...letters];
  }

  getNotInWordLetters() {
    let letters = new Set();
    for(let i = 0; i < this.state.letterRows.length; i++) {
      this.state.letterRows[i].letters
     .filter(l => l.value !== "" && l.adjective === "NotInWord")
     .forEach(l => letters.add(l));
    }
    console.log("NotInWord", letters);
    return [...letters];
  }

  handleChange = (letterRow, letter, e) => {
    const data = e.nativeEvent.data;
    if(!data) return;
    const letterRows = [...this.state.letterRows];
    const letterRowIndex = letterRows.indexOf(letterRow);
    letterRows[letterRowIndex] = { ...letterRow };

    const letters = [...letterRows[letterRowIndex].letters];
    const letterIndex = letters.indexOf(letter);
    letters[letterIndex] = { ...letter };
    letterRows[letterRowIndex].letters = letters;

    letters[letterIndex].value = e.nativeEvent.data.toUpperCase();
    this.setState({ letterRows });
  };

  cycleAdjective(letterRow, letter) {
    if(!letter.value) return;
    const letterRows = [...this.state.letterRows];
    const letterRowIndex = letterRows.indexOf(letterRow);
    letterRows[letterRowIndex] = { ...letterRow };

    const letters = [...letterRows[letterRowIndex].letters];
    const letterIndex = letters.indexOf(letter);
    letters[letterIndex] = { ...letter };
    letterRows[letterRowIndex].letters = letters;

    letters[letterIndex] = { ...letter };
    if (letters[letterIndex].adjective === "NotInWord") {
      letters[letterIndex].adjective = "InWord";
    } else if (letters[letterIndex].adjective === "InWord") {
      letters[letterIndex].adjective = "InCorrectPlace";
    } else {
      ///must be "InCorrectPlace"
      letters[letterIndex].adjective = "NotInWord";
    }
    this.setState({ letterRows });
  }

  handleClick = (letterRow, letter, e) => {
    // e.detail === 2 means a double click
    if (e.detail === 2) {
      this.cycleAdjective(letterRow, letter);
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Top</h1>
        <div>
          {this.state.letterRows.map((lr) => (
            <LetterRow
              id={lr.id}
              key={lr.id}
              letterRow={lr}
              onChange={this.handleChange}
              onClick={this.handleClick}
            />
          ))}
        </div>
        <div>
          <Possibilities inCorrectPlaceLetters={this.getInCorrectPlaceLetters()}
                         inWordLetters={this.getInWordLetters()}
                         notInWordLetters={this.getNotInWordLetters()} />
        </div>
        <h1>Bottom</h1>
      </React.Fragment>
    );
  }
}

export default App;
