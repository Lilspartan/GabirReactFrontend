import Header from "../Header";
import MainDash from "./DashBody";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Header as HeaderTypes } from '../../interfaces'

const Dashboard = (props:any) => {
  const onLogoutClick = (e:any) => {
    props.logoutUser();
  };

  var { user } = props.auth;
    user = user._doc;
    localStorage.setItem("uuid", user.uuid);

  return (
    <>
      <Header title={`Dashboard | ${user.name}`} />

      <MainDash userD={user} onLogout={onLogoutClick} />
    </>
  )
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state:any) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
