/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link, withRouter, RouteComponentProps  } from 'react-router-dom'
import RightTab from './RightTab'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RightTabLink from './RightTabLink'
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
import { FC } from 'react';

interface Props extends RouteComponentProps {
  title: string;
  desc?: string;
  auth?: any;
}

const Header:FC<Props> = (props) => {
  const { title = "Gabir Motors", desc = 'The world’s premiere, pretend Motorsports Company. Proud sponsor of Mike Racecar and the Penny Arcade iRacing league.' } = props;
  var loggedin = localStorage.getItem('jwtToken')
  if (loggedin) {
    //console.log(props)
    var { user } = props.auth;
    user = user._doc;
  }

  console.log("      _________________   ____  ____  ___       \n     /  ______________/  /   / /   / /   \\     \n    /  /      _______   /   / /   / /    /      \n   /  /      /____  /  /   / /   / /    /       \n  /  /___________/ /  /   / /   / /    /        \n  \\_______________/  /___/ /___/ /____/         \n");

  const LoggedInSidebar = () => {
    return (
      <>
        <li className="uk-parent">
          <a href="#" className = "uk-text-primary nav-text">{user?.name}</a>
          <ul className="uk-nav-sub">
            <li><Link to = "/dashboard" className = "nav-text-sub uk-text-primary uk-button-text uk-display-inline">Dashboard</Link></li>
          </ul>
        </li>
      </>
    )
  }

  const GuestInSidebar = () => {
    return (
      <li className = "uk-text-center"><Link to = "/login" className = "acumin nav-text uk-display-inline uk-button uk-button-text uk-text-success">Login</Link> | <Link to = "/signup" className = "acumin nav-text uk-display-inline uk-button uk-button-text uk-text-success">Sign Up</Link></li>
    )
  }

  type Sidebar = {
    isLoggedIn:any;
  }

  const SidebarUser = (props:Sidebar) => {
    if (props.isLoggedIn) {
      return <LoggedInSidebar />
    } else {
      return <GuestInSidebar />
    }
  }
  
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

        <ul uk-nav = "true" className="uk-nav-primary uk-nav-parent-icong uk-margin-auto-vertical" uk-scrollspy="cls: uk-animation-slide-left-medium; target: .icon,.nav-text,.uk-logo,.uk-text-uppercase; delay: 100;">
            <li className="uk-logo"><Link to="/"><img src = "../img/logo.png" alt = "GM logo" style = {{width: '14vw', height: 'auto', minWidth: '200px'}}/></Link></li>

            <RightTabLink id = "draw4link" target = "draw4" type = "success"></RightTabLink>
            <li className="uk-nav-divider"></li>

            <SidebarUser isLoggedIn = {loggedin} />
            
            <li className="uk-parent">
              <a href="#" className = "uk-text-primary nav-text">Stream Submissions</a>
              <ul className="uk-nav-sub">
                <li><Link className = "nav-text-sub uk-text-primary uk-button-text uk-display-inline" to = "/haikus">Haikus</Link></li>
                <li><Link className = "nav-text-sub uk-text-primary uk-button-text uk-display-inline" to = "/quotes">Quotes</Link></li>
              </ul>
            </li>
            
            <li className="uk-parent">
              <a href="#" className = "uk-text-primary nav-text">Helpful Resources</a>
              <ul className="uk-nav-sub">
                <li><Link className = "nav-text-sub uk-text-primary uk-button-text uk-display-inline" to = "/calendar">Calendar</Link></li>
                <li><Link className = "nav-text-sub uk-text-primary uk-button-text uk-display-inline" to = "/teams">Teams</Link></li>
                <li><Link className = "nav-text-sub uk-text-primary uk-button-text uk-display-inline" to = "/assets">Assets</Link></li>
                <li><Link className = "nav-text-sub uk-text-primary uk-button-text uk-display-inline" to = "/standings">Standings</Link></li>
                <li><Link className = "nav-text-sub uk-text-primary uk-button-text uk-display-inline" to = "/tutorial">Tutorials</Link></li>
              </ul>
            </li>
            
            <li className="uk-nav-divider"></li>
            <li>
              <a target = "_new" uk-tooltip = "PA League Discord" className = "icon uk-display-inline uk-button" href = "https://discord.gabirmotors.com/"><span className = "icon-button icon-button-discord" uk-icon = "icon:discord; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "PA Twitch" className = "icon uk-display-inline uk-button" href = "https://www.twitch.tv/pennyarcade"><span className = "icon-button icon-button-twitch" uk-icon = "icon:twitch; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "@GabirMotors" className = "icon uk-display-inline uk-button" href = "https://twitter.com/GabirMotors"><span className = "icon-button icon-button-twitter" uk-icon = "icon:twitter; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "@FleischwolfNews" className = "icon uk-display-inline uk-button" href = "https://twitter.com/FleischwolfNews"><span className = "icon-button icon-button-twitter" uk-icon = "icon:twitter; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "GM Merch" className = "icon uk-display-inline uk-button" href = "https://store.penny-arcade.com/collections/gabir-motors"><span className = "icon-button icon-button-store" uk-icon = "icon:cart; ratio: 1.4"></span></a>&nbsp;&nbsp;
            </li>
            <li>
              <p className = "uk-margin-top uk-text-uppercase uk-text-top">Made by<br /><span style = {{color:'white'}}>Gabe Krahulik</span><br/><a target = "_new" href="https://github.com/Lilspartan/"><span className = "icon-button icon-button-github" uk-icon = "github"></span></a> <a target = "_new" href="https://twitter.com/gabekrahulik"><span className = "icon-button icon-button-twitter" uk-icon = "twitter"></span></a></p>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = (state:any) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));