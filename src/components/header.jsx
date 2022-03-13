import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
      <header className="navbar flex-row justify-content-between">
        <button
          type="button"
          className="btn help-button"
          onClick={this.props.onClick}
        >
          ?
        </button>
        <span className="title nav-brand">Cheatle</span>
        <button
          type="button"
          className="btn help-button"
          onClick={this.props.onClick}
        >
          ?
        </button>
      </header>
    </React.Fragment>);
  }
}

export default Header;
