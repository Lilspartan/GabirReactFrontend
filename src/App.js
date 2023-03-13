import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/*
  Main Pages Imports
*/

import MainMFT from './Pages/MFT';
import fourBody from './Pages/404';
import MainIndex from './Pages/Main';
import MainCal from './Pages/Calendar';
import MainAssets from './Pages/Assets';
import TeamPage from './Pages/TeamPage';
import MainTeams from './Pages/TeamsPage';
import MainSchedule from './Pages/Schedule';
import MainHaiku from './Pages/HaikuSubmit';
import MainQuote from './Pages/QuoteSubmit';
import MainTimeline from "./Pages/Timeline";
import MainTutorial from "./Pages/Tutorial";
import MainGabirdle from "./Pages/Gabirdle";
import MainDOTD from './Pages/Driveroftheday';
import MainStandings from './Pages/Standings';
import MainConstructors from './Pages/Constructors';
import MainSpecMapping from './Pages/Tools/SpecMapping';
import MainColorTemplate from './Pages/Tools/ColorTemplate';
import MainDownforceGuide from './Pages/Tools/DownforceGuide';
import MainChannelChooser from './Pages/channelchooser/ChannelChooser';
import MainColorTemplateDownload from './Pages/Tools/ColorTemplateDownload';

import MainTest from './Pages/TestingTemplates';

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
        <Route path='/tutorial' component = {MainTutorial} />
        <Route path='/timeline' exact component = {MainTimeline} />
        <Route path='/vote' component = {MainDOTD} />
        <Route path ='/constructors' exact component = {MainConstructors} />
        <Route path ='/specmapping' exact component = {MainSpecMapping} />
        <Route path ='/colortemplate' exact component = {MainColorTemplate} />
        <Route path ='/colortemplate/download' exact component = {MainColorTemplateDownload} />
        <Route path ='/mft' exact component = {MainMFT} />
        <Route path ='/test' exact component = {MainTest} />
        <Route path ='/downforce' exact component = {MainDownforceGuide} />
        <Route path ='/gabirdle' exact component = {MainGabirdle} />
        <Route path ='/schedule' exact component = {MainSchedule} />
        <Route path ='/channelchooser/:id' exact component = {MainChannelChooser} />
        <Route path = "*" component = {fourBody} />
      </Switch>
    </Router>
  )
}

export default App
