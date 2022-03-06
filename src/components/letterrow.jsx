import React, { Component } from "react";
import Letter from "./letter";

class LetterRow extends Component {
  handleChange = (letter, e) => {
    this.props.onChange(this.props.letterRow, letter, e);
  };

  handleClick = (letter, e) => {
    this.props.onClick(this.props.letterRow, letter, e);
  };

  handleBlur = (letter, e) => {
    this.props.onBlur(this.props.letterRow, letter, e);
  };

  handleKeyDown = (letter, e) => {
    this.props.onKeyDown(this.props.letterRow, letter, e);
  };

  render() {
    return (
      <form>
        {this.props.letterRow.letters.map((l) => (
          <Letter
            key={l.id}
            letter={l}
            value={l.value}
            onInput={this.handleChange}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          />
        ))}
      </form>
    );
  }
}

export default LetterRow;
