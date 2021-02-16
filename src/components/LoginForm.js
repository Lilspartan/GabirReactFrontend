import React, { Component } from "react";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      errors: {}
    };
  }
onChange = e => {
    const { name, value } = e.target
        this.setState({ [name]: value });
  };
onSubmit = e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      password: this.state.password
    };
    console.log(userData);
  };
render() {
    const { errors } = this.state;
    return (
        <form noValidate onSubmit={this.onSubmit}>
            <div className="uk-margin">
                <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input 
                        onChange={this.onChange}
                        error={errors.name}
                        className="uk-input uk-form-large " 
                        name = "name" 
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
                <button className="uk-button uk-button-primary uk-button-large uk-width-1-1">Login</button>
            </div>
            <div className="uk-text-small uk-text-center">
                <Link to = "/signup" className = "uk-button uk-button-text">Create an account</Link>
            </div>
        </form>
    );
  }
}
export default Login;


