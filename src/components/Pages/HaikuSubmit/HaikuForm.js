import { Link } from 'react-router-dom'
import React from 'react'
import axios from "axios";

class HaikuForm extends React.Component {
    constructor() {
        super();
        this.state = {
            Line1: "",
            Line2: "",
            Line3: "",
            name: "",
            uuid: localStorage.getItem("uuid") || null
        };
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newHaiku = {
            haikuLines: [
                this.state.Line1,
                this.state.Line2,
                this.state.Line3
            ],
            name: this.state.name,
            uuid: this.state.uuid
        };

        axios
            .post("https://api.gabirmotors.ga/haikus/new", newHaiku)
            .then(res => {
                alert('Success!')
            })
            .catch(err => {
                alert('There was an error')
                console.log(err)
            });

        console.log(newHaiku);
    };

    render() {
        const { errors } = this.state;
            return (
                <form noValidate onSubmit = {this.onSubmit} >
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon:"></span>
                            <input 
                                className="uk-input uk-form-large"
                                onChange={this.onChange}
                                value = {this.state.Line1}
                                name = "Line1" 
                                type="text"
                                placeholder = "Line 1"
                            />
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon:"></span>
                            <input 
                                className="uk-input uk-form-large"
                                onChange={this.onChange}
                                value = {this.state.Line2}
                                name = "Line2" 
                                type="text"
                                placeholder = "Line 2"
                            />
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon:"></span>
                            <input 
                                className="uk-input uk-form-large"
                                onChange={this.onChange}
                                value = {this.state.Line3}
                                name = "Line3" 
                                type="text"
                                placeholder = "Line 3"
                            />
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon"></span>
                            <input 
                                className="uk-input uk-form-large"
                                onChange={this.onChange}
                                value = {this.state.name}
                                name = "name" 
                                type="text"
                                placeholder = "Name"
                            />
                        </div>
                    </div>
                    <div className="uk-margin">
                        <button className="uk-button uk-button-primary uk-button-large uk-width-1-1">Submit Haiku</button>
                    </div>
                </form>
            );
        }
}

export default HaikuForm
