import React, { Component } from "react";
import "../helpmodal.scss";

class HelpModal extends Component {
  render() {
    return (
      <div className="modal-bg" onClick={ () => this.props.setModalOpen(false)}>
        <div className="centered">
            <div className="modal-box container-fluid">
                <div className="modal-header navbar flex-row justify-content-between">
                <h5 className="modal-title"> Cheatle </h5>
                <button className="modal-close">Close</button>
                </div>
                <div className="modal-content">
                <p>Solve <strong>WORDLE</strong> puzzles!</p>
                <p>Make a guess on <strong>WORDLE</strong></p>
                <p><strong>ENTER</strong> your guess into the top row </p>
                <p>Mark letters as <strong className="TextInWord"> PRESENT </strong> or
                 <strong className="TextInCorrectPlace"> CORRECT </strong> by clicking them</p>
                <p><strong> POSSIBILITIES </strong> appear below once enough info is present</p>
                <p><strong> REFINE </strong> possibilities by entering more guesses</p>
                <hr />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default HelpModal;
