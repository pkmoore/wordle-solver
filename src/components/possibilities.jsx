import React, { Component } from "react";
import { getWords } from "../data/dictionary";

class Possibilities extends Component {
  render() {
    let candidates = this.getCandidateWords();
    if (candidates.length > 100) {
      return <p> Too many possibilities to list... </p>;
    } else {
      return (
        <React.Fragment>
        <p> Possibilities... </p>
        <ul className="items">
          {candidates.map((w, i) => (
            <li className="item" key={i}>{w}</li>
          ))}
        </ul>
        </React.Fragment>
      );
    }
  }

  getCandidateWords() {
    let { inCorrectPlaceLetters, inWordLetters, notInWordLetters } =
      this.props;

    // This part is going to seem weird but is necessary based on how
    // the NYT WORDLE game deals with when you guess a word with a duplicated
    // letter and get one of the positions right.  The game gives you a green
    // square for the correct letter and an ABSENT square for the duplicate.
    // Without this code, marking your solver guess to match this would result
    // in NO RESULTS.  Instead, if a letter is correct and in the correct place,
    // we filter it out of the notInWords array effectively ignoring
    // its duplicate ABSENT marking
    let correctLetters = inCorrectPlaceLetters.map((l) => {
        return l.value;
    });

    notInWordLetters = notInWordLetters.filter((w) => {
        return correctLetters.indexOf(w.value) === -1;
    });

    const words = getWords();

    return words.filter((w) => {
      for (let i = 0; i < inCorrectPlaceLetters.length; i++) {
        let index = inCorrectPlaceLetters[i].id;
        if (w[index] !== inCorrectPlaceLetters[i].value) {
          return false;
        }
      }

      for (let i = 0; i < notInWordLetters.length; i++) {
        if (w.includes(notInWordLetters[i].value)) {
          return false;
        }
      }

      for (let i = 0; i < inWordLetters.length; i++) {
          let index = inWordLetters[i].id;
        if (!w.includes(inWordLetters[i].value)
            || w[index] === inWordLetters[i].value) {
          return false;
        }
      }

      return true;
    });
  }
}

export default Possibilities;
