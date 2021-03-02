import { withRouter } from 'react-router-dom'
import React from 'react'

class QuoteForm extends React.Component {
    constructor() {
        super();
        this.state = {
            quote: "",
            author: ""
        };
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value });
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.quote.length < 3) {
            return alert('That quote is too short!')
        }
        const newQuote = {
            quote: `${this.state.quote} - ${this.state.author}`
        };
        fetch(`https://api.gabirmotors.ga/quotes/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newQuote)
        })
            .then(res => {
                alert('Success!')
                this.props.history.push("/?from=quotesubmit&success=quotesubmit");
            })
            .catch(err => {
                alert('There was an error')
                console.log(err)
            });

        console.log(newQuote);
    };

    render() {
            return (
                <form noValidate onSubmit = {this.onSubmit} >
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon:"></span>
                            <input 
                                className="uk-input uk-form-large"
                                onChange={this.onChange}
                                value = {this.state.quote}
                                name = "quote" 
                                type="text"
                                placeholder = "Quote"
                            />
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon"></span>
                            <input 
                                className="uk-input uk-form-large"
                                onChange={this.onChange}
                                value = {this.state.author}
                                name = "author" 
                                type="text"
                                placeholder = "Quote Author"
                            />
                        </div>
                    </div>
                    <div className="uk-margin">
                        <button className="uk-button uk-button-primary uk-button-large uk-width-1-1">Submit Quote</button>
                    </div>
                </form>
            );
        }
}

export default withRouter(QuoteForm);
