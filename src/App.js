import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/*
  Main bodies imports
*/

import MainSign from './Pages/SignupBody';
import MainLog from './Pages/LoginBody';
import MainHaiku from './Pages/HaikusBody';
import MainQuote from './Pages/QuoteSubmit';
import MainCal from './Pages/Calendar';
import MainAssets from './Pages/Assets';
import MainTeams from './Pages/TeamsPage';
import TeamPage from './Pages/TeamPage';
import MainDash from './Pages/Dashboard';
import fourBody from './Pages/404';
import MainIndex from './components/MainBody';
import MainStandings from './Pages/Standings';
import MainShowoff from "./Pages/Showoff";
import MainTutorial from "./Pages/Tutorial";

import PrivateRoute from './components/PivateRoute';
import './index.scss'

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
        <Switch>
          <Route path='/' exact component = {MainIndex} />
          <Route path='/login' component = {MainLog} />
          <Route path='/signup' component = {MainSign} />
          <Route path='/calendar' exact component = {MainCal} />
          <Route path='/haikus' exact component = {MainHaiku} />
          <Route path='/quotes' exact component = {MainQuote} />
          <Route path='/teams' exact component = {MainTeams} />
          <Route path='/teams/:t' component = {TeamPage} />
          <Route path='/assets' component = {MainAssets} />
          <Route path='/standings' component = {MainStandings} />
          <Route path='/showoff' component = {MainShowoff} />
          <Route path='/tutorial' component = {MainTutorial} />
          <PrivateRoute exact path="/dashboard" component= {MainDash} />
          <Route path = "*" component = {fourBody} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
