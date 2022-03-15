import React, { Component } from "react";

class Letter extends Component {
  handleChange = (e) => {
    this.props.onInput(this.props.letter, e);
  };

  handleClick = (e) => {
    this.props.onClick(this.props.letter, e);
  };

  getClassesForStatus(letter) {
    let classes = "text-white col-small letter ";
    if (letter.adjective === "Absent") {
      return classes + "absent";
    } else if (letter.adjective === "Present") {
      return classes + "present";
    } else {
      return classes + "correct";
    }
  }

  handleBlur = (e) => {
    this.props.onBlur(this.props.letter, e);
  };

  handleKeyDown = (e) => {
    this.props.onKeyDown(this.props.letter, e);
  };

  render() {
    return (
      <input
        type="text"
        id={this.props.letter.id}
        value={this.props.letter.value}
        ref={this.props.letter.ref}
        onInput={this.handleChange}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        className={this.getClassesForStatus(this.props.letter)}
      />
    );
  }
}

export default Letter;
