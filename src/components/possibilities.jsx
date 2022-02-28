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
    const { inCorrectPlaceLetters, inWordLetters, notInWordLetters } =
      this.props;

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
        if (!w.includes(inWordLetters[i].value)) {
          return false;
        }
      }

      return true;
    });
  }
}

export default Possibilities;
