import React, { Component } from "react";
import { getWords } from "../data/dictionary";
import { getBestPos } from "../data/letterpos";

class Possibilities extends Component {
  render() {
    let candidates = this.getCandidateWords();
    if (candidates.length > 100) {
      return <p> Too many possibilities to list... </p>;
    } else if (candidates.length === 0 ) {
      return <p> There are no words that match your guesses! </p>;
    } else {
      return (
        <React.Fragment>
        <p> Possibilities... </p>
        <ul className="no-indent items">
          {candidates.map((w, i) => (
            <li className={"item" + (this.shouldHilightCandidate(w) ? " glow" : "") }
                key={i}>{w}</li>
          ))}
        </ul>
        </React.Fragment>
      );
    }
  }

  shouldHilightCandidate(candidate) {
    const presentLetters = this.props.inWordLetters.map((w) => {
        return {value: w.value, pos: getBestPos(w.value)};
    });
    return presentLetters.some((l) => {
        return candidate[l.pos] === l.value;
    });
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
