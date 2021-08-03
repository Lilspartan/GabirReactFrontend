/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link, withRouter, RouteComponentProps  } from 'react-router-dom'
import RightTab from './RightTab'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RightTabLink from './RightTabLink'
import { FC, useState, useEffect } from 'react';

interface Props extends RouteComponentProps {
  title: string;
  desc?: string;
  auth?: any;
}

const Header:FC<Props> = (props) => {
  const { title = "Gabir Motors", desc = 'The world’s premiere, pretend Motorsports Company. Proud sponsor of Mike Racecar and the Penny Arcade iRacing league.' } = props;
  
  useEffect(() => {
    (async () => {
      var res = await fetch('https://streaming.gabirmotors.com/dodotd');
      var data = await res.json();

      if (res.status === 200) {
        setDriveroftheday(data.do);
      }
    })();
  })

  const [driveroftheday, setDriveroftheday] = useState(false)

  //console.log("      _________________   ____  ____  ___       \n     /  ______________/  /   / /   / /   \\     \n    /  /      _______   /   / /   / /    /      \n   /  /      /____  /  /   / /   / /    /       \n  /  /___________/ /  /   / /   / /    /        \n  \\_______________/  /___/ /___/ /____/         \n");
  
  return (
    <header>
      <title>{ title }</title>
      <meta
        name="description"
        content= {desc}
      />
      <div uk-sticky = "true">
        {/* eslint-disable-next-line */}
        <a id = "menuopen" className="uk-margin-small-right uk-position-top-left"uk-toggle="target: #offcanvas-slide" href = "#"><span uk-icon="icon: menu; ratio: 2" style = {{color: 'white'}}></span></a>
      </div>

      <RightTab id = "draw4"> 
        
      </RightTab>

      <div id="offcanvas-slide" uk-offcanvas="mode: slide;">
        <div className="uk-offcanvas-bar uk-flex uk-flex-column">

        <ul uk-nav = "true" className="uk-nav-primary uk-margin-auto-vertical" uk-scrollspy="cls: uk-animation-slide-left-medium; target: .nav-text,.uk-logo; delay: 50;">
            <li className="uk-logo"><Link to="/"><img src = "../img/logo.png" alt = "GM logo" style = {{width: '14vw', height: 'auto', minWidth: '200px'}}/></Link></li>

            <RightTabLink id = "draw4link" target = "draw4" type = "success"></RightTabLink>

            { driveroftheday && <Link to = "/vote" className = { `uk-text-success` }>Driver of the Day</Link> }
            <li className="uk-nav-divider"></li>
            
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/haikus">Haikus</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/quotes">Quotes</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/calendar">Calendar</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/teams">Teams</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/assets">Assets</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/standings">Standings</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/tutorial">Tutorials</Link></li>
            
            <li className="uk-nav-divider"></li>
            <li uk-scrollspy="cls: uk-animation-slide-top; target: .icon; delay: 100;">
              <a target = "_new" uk-tooltip = "PA League Discord" className = "icon uk-display-inline uk-button" href = "https://discord.gabirmotors.com/"><span className = "icon-button icon-button-discord" uk-icon = "icon:discord; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "PA Twitch" className = "icon uk-display-inline uk-button" href = "https://www.twitch.tv/pennyarcade"><span className = "icon-button icon-button-twitch" uk-icon = "icon:twitch; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "@GabirMotors" className = "icon uk-display-inline uk-button" href = "https://twitter.com/GabirMotors"><span className = "icon-button icon-button-twitter" uk-icon = "icon:twitter; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "@FleischwolfNews" className = "icon uk-display-inline uk-button" href = "https://twitter.com/FleischwolfNews"><span className = "icon-button icon-button-twitter" uk-icon = "icon:twitter; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "GM Merch" className = "icon uk-display-inline uk-button" href = "https://store.penny-arcade.com/collections/gabir-motors"><span className = "icon-button icon-button-store" uk-icon = "icon:cart; ratio: 1.4"></span></a>&nbsp;&nbsp;
            </li>
            <li uk-scrollspy="cls: uk-animation-slide-left-medium; target: .uk-text-uppercase; delay: 100;">
              <p className = "uk-margin-top uk-text-uppercase uk-text-top">Made by<br /><span style = {{color:'white'}}>Gabe Krahulik</span><br/><a target = "_new" href="https://github.com/Lilspartan/"><span className = "icon-button icon-button-github" uk-icon = "github"></span></a> <a target = "_new" href="https://twitter.com/gabekrahulik"><span className = "icon-button icon-button-twitter" uk-icon = "twitter"></span></a></p>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default withRouter(Header);