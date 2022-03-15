import React, { Component } from "react";
import { getWords } from "../data/dictionary";
import { getBestPos } from "../data/letterstats";

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
        <ul className="items noindent">
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
    const presentLetters = this.props.presentLetters.map((w) => {
        return {value: w.value, pos: getBestPos(w.value)};
    });
    return presentLetters.some((l) => {
        return candidate[l.pos] === l.value;
    });
  }

  getCandidateWords() {
    let { correctLetters, presentLetters, absentLetters } =
      this.props;

    // This part is going to seem weird but is necessary based on how
    // the NYT WORDLE game deals with when you guess a word with a duplicated
    // letter and get one of the positions right.  The game gives you a green
    // square for the correct letter and an ABSENT square for the duplicate.
    // Without this code, marking your solver guess to match this would result
    // in NO RESULTS.  Instead, if a letter is correct and in the correct place,
    // we filter it out of the notInWords array effectively ignoring
    // its duplicate ABSENT marking
    let correctLetterValues = correctLetters.map((l) => {
        return l.value;
    });

    absentLetters = absentLetters.filter((w) => {
        return correctLetterValues.indexOf(w.value) === -1;
    });

    const words = getWords();

    return words.filter((w) => {
      for (let i = 0; i < correctLetters.length; i++) {
        let index = correctLetters[i].id;
        if (w[index] !== correctLetters[i].value) {
          return false;
        }
      }

      for (let i = 0; i < absentLetters.length; i++) {
        if (w.includes(absentLetters[i].value)) {
          return false;
        }
      }

      for (let i = 0; i < presentLetters.length; i++) {
          let index = presentLetters[i].id;
        if (!w.includes(presentLetters[i].value)
            || w[index] === presentLetters[i].value) {
          return false;
        }
      }

      return true;
    });
  }
}

export default Possibilities;
