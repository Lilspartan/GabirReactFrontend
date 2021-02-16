import { Link } from 'react-router-dom'
import React from 'react'

class SignupForm extends React.Component {
    constructor() {
        super();
        this.state = {
          name: "h",
          email: "",
          password: "",
          password2: "",
          errors: {}
        };
      }
    onChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value });
      };
    onSubmit = e => {
        e.preventDefault();
    const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        };
    console.log(newUser);
      };
    render() {
        const { errors } = this.state;
            return (
                <form noValidate onSubmit = {this.onSubmit} >
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: user"></span>
                            <input 
                                className="uk-input uk-form-large"
                                onChange={this.onChange}
                                error={errors.name} 
                                value = {this.state.name}
                                name = "name" 
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: mail"></span>
                            <input 
                                className="uk-input uk-form-large" 
                                onChange={this.onChange}
                                error={errors.email} 
                                name = "email" 
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                            <input 
                                className="uk-input uk-form-large"  
                                onChange={this.onChange}
                                error={errors.password} 
                                name = "password" 
                                type="password"
                                />	
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                            <input 
                                className="uk-input uk-form-large"  
                                onChange={this.onChange}
                                error={errors.password2} 
                                name = "password2" 
                                type="password"
                            />	
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