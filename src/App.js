import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Haikus from './components/Haikus'
import Header from './components/Header'
import MainIndex from './components/MainBody'
import MainCal from './components/CalendarBody'
import MainLog from './components/LoginBody'
import MainSign from './components/SignupBody'
import MainDash from './components/Dashboard'
import PrivateRoute from './components/PivateRoute'
import './index.css'

import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
          <Route path='/' exact component = {MainIndex} />
          <Route path='/login' component = {MainLog} />
          <Route path='/signup' component = {MainSign} />
          <Route path='/calendar' exact component = {MainCal} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component= {MainDash} />
          </Switch>
      </Router>
    </Provider>
  )
}

export default App
