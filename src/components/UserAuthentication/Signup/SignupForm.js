import { Link, withRouter } from 'react-router-dom'
import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
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
        
        this.props.registerUser(newUser, this.props.history); 
    };

    render() {
        const { errors } = this.state;
            return (
                <form noValidate onSubmit = {this.onSubmit} >
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: user"></span>
                            <input 
                                className={classnames("uk-input uk-form-large", {
                                    invalid: errors.name
                                })}
                                onChange={this.onChange}
                                error={errors.name} 
                                value = {this.state.name}
                                name = "name" 
                                type="text"
                            />
                            <span className="uk-text-danger">{errors.name}</span>
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: mail"></span>
                            <input 
                                className={classnames("uk-input uk-form-large", {
                                    invalid: errors.email
                                })} 
                                onChange={this.onChange}
                                error={errors.email} 
                                name = "email" 
                                type="text"
                            />
                            <span className="uk-text-danger">{errors.email}</span>
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                            <input 
                                className={classnames("uk-input uk-form-large", {
                                    invalid: errors.password
                                })} 
                                onChange={this.onChange}
                                error={errors.password} 
                                name = "password" 
                                type="password"
                                />	
                                <span className="uk-text-danger">{errors.password}</span>
                        </div>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                            <input 
                                className={classnames("uk-input uk-form-large", {
                                    invalid: errors.password2
                                })}
                                onChange={this.onChange}
                                error={errors.password2} 
                                name = "password2" 
                                type="password"
                            />	
                            <span className="uk-text-danger">{errors.password2}</span>
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
