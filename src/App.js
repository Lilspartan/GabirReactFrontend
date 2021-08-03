import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/*
  Main Pages Imports
*/

import fourBody from './Pages/404';
import MainIndex from './Pages/Main';
import MainCal from './Pages/Calendar';
import MainAssets from './Pages/Assets';
import TeamPage from './Pages/TeamPage';
import MainTeams from './Pages/TeamsPage';
import MainHaiku from './Pages/HaikuSubmit';
import MainQuote from './Pages/QuoteSubmit';
import MainShowoff from "./Pages/Showoff";
import MainTimeline from "./Pages/Timeline";
import MainTutorial from "./Pages/Tutorial";
import MainDOTD from './Pages/Driveroftheday';
import MainStandings from './Pages/Standings';

import MainTwitch from './Pages/testTwitch';

import './index.scss'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component = {MainIndex} />
        <Route path='/calendar' exact component = {MainCal} />
        <Route path='/haikus' exact component = {MainHaiku} />
        <Route path='/quotes' exact component = {MainQuote} />
        <Route path='/teams' exact component = {MainTeams} />
        <Route path='/teams/:t' component = {TeamPage} />
        <Route path='/assets' component = {MainAssets} />
        <Route path='/standings' component = {MainStandings} />
        <Route path='/showoff' component = {MainShowoff} />
        <Route path='/tutorial' component = {MainTutorial} />
        <Route path='/timeline' component = {MainTimeline} />
        <Route path='/auth' component = {MainTwitch} />
        <Route path='/vote' component = {MainDOTD} />
        <Route path = "*" component = {fourBody} />
      </Switch>
    </Router>
  )
}

export default App
