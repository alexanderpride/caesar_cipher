import React from "react";
import ReactDOM from "react-dom";
import { debounce } from "lodash";

class Main extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            shift: 0
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleShiftChange = this.handleShiftChange.bind(this);

    }

    handleTextChange(text){
        this.setState({
            text: text
        });
    }

    handleShiftChange(shift){

        if (!isNaN(shift) && shift >= 0){
            this.setState({
                shift: shift
            });
        }
    }

    render() {
        return(

        <div>
            <Cipher
                text={this.state.text}
                shift={this.state.shift}

                onTextChange={this.handleTextChange}
                onShiftChange={this.handleShiftChange}
            />
            <Message
                text={shiftText(this.state.text, this.state.shift)}
            />
        </div>

        )
    }
}

class Cipher extends React.Component{

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleShiftChange = this.handleShiftChange.bind(this);

    }

    handleTextChange(e){

        this.props.onTextChange(e.target.value)

    }

    handleShiftChange(e){

        this.props.onShiftChange(e.target.value)

    }

    render() {

        let text = this.props.text;
        let shift = this.props.shift;

        return(
            <form>
                <textarea
                    placeholder="Enter message here, enter cipher in other box"
                    value={text}
                    onChange={this.handleTextChange}
                />

                <input
                    type="text"
                    value={shift}
                    onChange={this.handleShiftChange}
                />
            </form>
        )
    }
}

function shiftText(text, shift) {


    let newText = '';
    const _text = text.toLowerCase();
    const newShift = shift % 26;

    for(let letterIndex = 0; letterIndex < _text.length; letterIndex ++){

        const oldChar = _text.charCodeAt(letterIndex);

        if(oldChar === 32) {

            newText += " ";

        } else{

            let newChar = ((oldChar - 97 + newShift) % 26) + 97;
            let newLetter = String.fromCharCode(newChar);
            newText += newLetter;

        }

    }

    return newText

}

class Message extends React.Component{

    render() {

        let text = this.props.text;

        return(
            <p>{text}</p>
        )
    }

}



ReactDOM.render(
    <Main/>,
    document.getElementById('root')
)