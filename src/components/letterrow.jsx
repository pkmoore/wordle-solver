import React, { Component } from 'react';
import Letter from './letter';

class LetterRow extends Component {
    state = {
        letters: [
            {id: 0, value: '', adjective: "NotInWord"},
            {id: 1, value: '', adjective: "NotInWord"},
            {id: 2, value: '', adjective: "NotInWord"},
            {id: 3, value: '', adjective: "NotInWord"},
            {id: 4, value: '', adjective: "NotInWord"},
        ]
    };

    cycleAdjective(letter) {
        const letters = [...this.state.letters];
        const index = letters.indexOf(letter);
        letters[index] = {...letter};
        if(letters[index].adjective === "NotInWord") {
            letters[index].adjective = "InWord";
        } else if(letters[index].adjective === "InWord") {
            letters[index].adjective = "InCorrectPlace";
        } else {
            ///must be "InCorrectPlace"
            letters[index].adjective = "NotInWord";
        }
        this.setState({ letters });
    }

    handleChange = (letter, e) => {
        const letters = [...this.state.letters];
        const index = letters.indexOf(letter);
        letters[index] = { ...letter };
        const data = e.nativeEvent.data;
        if(data) {
            letters[index].value = e.nativeEvent.data.toUpperCase();
        }

        this.setState({ letters });
    };

    handleClick = (letter, e) => {
        // e.detail === 2 means a double click
        if(e.detail === 2) {
            this.cycleAdjective(letter);
        }
    }


    render() {
        return (
            <form>
            {this.state.letters.map(l => (
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
