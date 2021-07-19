import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
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
    this.props.loginUser(userData);
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
                        className={classnames("uk-input uk-form-large", {
                          invalid: errors.name || errors.namenotfound
                        })}
                        name = "name" 
                        type="text"
                    />
                    <span className="uk-text-danger">
                      {errors.name}
                      {errors.namenotfound}
                    </span>
                </div>
            </div>
            <div className="uk-margin">
                <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input 
                        className={classnames("uk-input uk-form-large", {
                          invalid: errors.password || errors.passwordincorrect
                        })}
                        onChange={this.onChange}
                        error={errors.password}
                        name = "password" 
                        type="password"
                    />	
                    <span className="uk-text-danger">
                      {errors.password}
                      {errors.passwordincorrect}
                    </span>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));


