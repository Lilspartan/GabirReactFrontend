import Header from './Header'
import MainDash from './DashBody'
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };
  render() {
    var { user } = this.props.auth;
    user = user._doc
  return (
        <>
            <Header title = {`Dashboard | ${user.name}`} onLogout = {this.onLogoutClick} />
            <a className = "uk-button uk-button-danger uk-position-large uk-position-top-center" onClick = {this.onLogoutClick} style={{ top: '10vh' }}>Logout</a>
            <MainDash user = {user} />
        </>
      );
    }
  }
  Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Dashboard);