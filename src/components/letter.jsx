import React, { Component } from 'react';

class Letter extends Component {

    handleChange = (e) => {
        this.props.onInput(this.props.letter, e);
    }

    handleClick = (e) => {
        this.props.onClick(this.props.letter, e);
    }

    getClassesForStatus(letter) {
        let classes = "text-white col-small "
        if(letter.adjective === "NotInWord") {
            return classes + "NotInWord";
        } else if(letter.adjective === "InWord") {
            return classes + "InWord";
        } else {
            return classes + "InCorrectPlace";
        }
    };

    render() {
        return (
            <input type="text"
            value={this.props.letter.value}
            onInput={this.handleChange}
            onClick={this.handleClick}
            className={this.getClassesForStatus(this.props.letter)}/>
        );
    };
}

export default Letter;
