import React, {Component} from 'react';
import { getWords } from '../data/dictionary';

class Possibilities extends Component {
    render() {
        console.log(this.getCandidateWords());
        return (<ul>
            {this.getCandidateWords().map((w, i) => <li key={i}>{w}</li>)}
            </ul>
        );
    };

    getCandidateWords() {
        const { inCorrectPlaceLetters, inWordLetters, notInWordLetters } = this.props;

        const words = getWords();

        return words.filter(w => {
            for(let i = 0; i < inCorrectPlaceLetters.length; i++) {
                let index = inCorrectPlaceLetters[i].id;
                if(w[index] !== inCorrectPlaceLetters[i].value) {
                    return false;
                }
            }

            for(let i = 0; i < notInWordLetters.length; i++) {
                if(w.includes(notInWordLetters[i].value)) {
                    return false;
                }
            }

            for(let i = 0; i < inWordLetters.length; i++) {
                if(!w.includes(inWordLetters[i].value)) {
                    return false;
                }
            }

            return true;
        });
    }
}


export default Possibilities;
