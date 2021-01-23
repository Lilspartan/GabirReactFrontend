import { Link } from 'react-router-dom'
import React from 'react'

class SignupForm extends React.Component {
        render() {
            return (
                <form method = "POST" action = "https://api.gabirmotors.ga/auth">
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: user"></span>
                            <input className="uk-input uk-form-large" name = "name" type="text"/>
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: mail"></span>
                            <input className="uk-input uk-form-large" name = "email" type="text"/>
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                            <input className="uk-input uk-form-large" name = "password" type="password"/>	
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                            <input className="uk-input uk-form-large" name = "passwordRepeat" type="password"/>	
                        </div>
                    </div>
                    <div className="uk-margin">
                        <button className="uk-button uk-button-primary uk-button-large uk-width-1-1">Login</button>
                    </div>
                    <div className="uk-text-small uk-text-center">
                        <Link to = "/login" className = "uk-button uk-button-text">already have an account?</Link>
                    </div>
                </form>
            );
        }
}

export default SignupForm;