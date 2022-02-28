import React, { Component } from 'react';
import Letter from './letter';

class LetterRow extends Component {

    handleChange = (letter, e) => {
        this.props.onChange(this.props.letterRow, letter, e)
    };

    handleClick = (letter, e) => {
        this.props.onClick(this.props.letterRow, letter, e);
    }


    render() {
        return (
            <form>
            {this.props.letterRow.letters.map(l => (
                <Letter key={l.id}
                        letter={l}
                        value={l.value}
                        onInput={this.handleChange}
                        onClick={this.handleClick}
                />
            ))}
            </form>
        );
    };
}

export default LetterRow;
