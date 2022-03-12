import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
      <header className="navbar flex-row justify-content-between">
        <span className="navtext">&nbsp;&nbsp;</span>
        <span className="title nav-brand">Cheatle</span>
        <button
          type="button"
          className="btn help-button"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          ?
        </button>
      </header>
    </React.Fragment>);
  }
}

export default Header;
