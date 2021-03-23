import Header from "../Header";
import MainDash from "./DashBody";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Dashboard = (props) => {
  const onLogoutClick = (e) => {
    props.logoutUser();
  };

  var { user } = props.auth;
    user = user._doc;
    localStorage.setItem("uuid", user.uuid);

  return (
    <>
      <Header
        title={`Dashboard | ${user.name}`}
        onLogout={onLogoutClick}
      />

      <MainDash userD={user} onLogout={onLogoutClick} />
    </>
  )
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
