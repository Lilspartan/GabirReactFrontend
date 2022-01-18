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
import MainShowoff from "./Pages/Showoff";
import MainHaiku from './Pages/HaikuSubmit';
import MainQuote from './Pages/QuoteSubmit';
import MainTimeline from "./Pages/Timeline";
import MainTutorial from "./Pages/Tutorial";
import MainDOTD from './Pages/Driveroftheday';
import MainStandings from './Pages/Standings';
import MainConstructors from './Pages/Constructors';
import MainSpecMapping from './Pages/Tools/SpecMapping';
import MainColorTemplate from './Pages/Tools/ColorTemplate';
import MainColorTemplateDownload from './Pages/Tools/ColorTemplateDownload';
import MainToolbox from './Pages/Tools/Toolbox';
import MainMFT from './Pages/MFT';

import MainTest from './Pages/TestingTemplates';

import './index.scss'

var channelOrder = [
  {
      url: "https://www.twitch.tv/skiggity242",
      id: "71778837",
      name: "Skiggity242"
  },
  {
      url: "https://www.twitch.tv/pennyarcade",
      id: "7443503",
      name: "Penny Arcade"
  }
]

const getViewers = async (user) => {
  var res = await fetch(`https://api.twitch.tv/helix/streams?user_id=${user.id}`, {
      headers: new Headers({
          'Client-ID': 'v354nab7jsgctl2zww4ic69tc4l3hf',
          'Authorization': 'Bearer jkmoj86ctljekpx3xl7ix28iwmzyen'
      })
  })

  var data = await res.json();
  if (data.data.length) {
      console.log(`${user.url} is Online!`)
      window.location.href = user.url
  }
}

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
        <Route path='/timeline' exact component = {MainTimeline} />
        <Route path='/vote' component = {MainDOTD} />
        <Route path='/live' component = {() => {
          for (var i in channelOrder) {
              getViewers(channelOrder[i])
          }
          window.location.href = "https://www.twitch.tv/pennyarcade"
          return null;
        }} />
        <Route path ='/constructors' exact component = {MainConstructors} />
        <Route path ='/specmapping' exact component = {MainSpecMapping} />
        <Route path ='/colortemplate' exact component = {MainColorTemplate} />
        <Route path ='/colortemplate/download' exact component = {MainColorTemplateDownload} />
        <Route path ='/toolbox' exact component = {MainToolbox} />
        <Route path ='/mft' exact component = {MainMFT} />
        <Route path ='/test' exact component = {MainTest} />
        <Route path = "*" component = {fourBody} />
      </Switch>
    </Router>
  )
}

export default App
