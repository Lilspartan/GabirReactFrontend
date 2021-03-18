import PropTypes from 'prop-types'
import { a } from 'react-router-dom'
import { BsList } from 'react-icons/bs'
import { FaDiscord, FaTwitter, FaTwitch } from 'react-icons/fa'
import { BsWifi } from "react-icons/bs";
import { Link } from 'react-router-dom'

const Header = ({ title, desc }) => {
  var loggedin = localStorage.getItem('jwtToken')

  const LoggedInSidebar = ({ toggle }) => {
    return (
      <>
        <li className="uk-parent">
            <Link to = "/dashboard" className = "uk-button uk-button-text uk-display-inline uk-padding-small">Dashboard</Link>
        </li>
        <li className="uk-nav-divider"></li>
      </>
    )
  }

  const GuestInSidebar = (props) => {
    return (
      <li className="uk-parent">
          <ul className="uk-nav-sub">
            <li><Link to = "/login" className = "uk-display-inline uk-button uk-button-text uk-text-success">Login</Link> | <Link to = "/signup" className = "uk-display-inline uk-button uk-button-text uk-text-success">Sign Up</Link></li>
          </ul>
      </li>
    )
  }

  const SidebarUser = ({ isLoggedIn}) => {
    if (isLoggedIn) {
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
        <a className="uk-margin-small-right uk-position-top-left"uk-toggle="target: #offcanvas-slide" href = "#"><BsList style = {{color: 'white', fontSize: '60px'}}/></a>
      </div>
      <div id="offcanvas-slide" uk-offcanvas="mode: slide;">
        <div className="uk-offcanvas-bar uk-flex uk-flex-column">

        <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
            <li className="uk-logo"><Link to="/"><img src = "../img/logo.png" alt = "GM logo" style = {{width: '10vw', height: 'auto', minWidth: '200px'}}/></Link></li>

            <SidebarUser isLoggedIn = {loggedin} />
            
            <li className="uk-nav-header">Stream Submissions</li>
            <li className = "nav-link"><Link className = "uk-button uk-button-text uk-display-inline" to = "/haikus">Haikus</Link></li>
            <li className = "nav-link"><Link className = "uk-button uk-button-text uk-display-inline" to = "/quotes">Quotes</Link></li>
            
            <li className="uk-nav-header">Helpful Resources</li>
            <li className = "nav-link"><Link className = "uk-button uk-button-text uk-display-inline" to = "/calendar">Calendar</Link></li>
            <li className = "nav-link"><Link className = "uk-button uk-button-text uk-display-inline" to = "/teams">Teams</Link></li>
            {/*
            <li><a className = "uk-button uk-button-text uk-display-inline uk-disabled" href = "/">Assets</a></li>

            <li class="uk-nav-header">How To</li>
            <li><a className = "uk-button uk-button-text uk-display-inline" href = "https://gabirmotors.ga/info/blueflags">Blue Flags</a></li>
            <li><a className = "uk-button uk-button-text uk-display-inline" href = "https://gabirmotors.ga/info/blackflags">Black Flags</a></li>
            */}
            <li className="uk-nav-header">More coming soon!</li>
            <li className="uk-nav-divider"></li>

            <li className="uk-nav-header">Other Links</li>
            <li>
              <a target = "_new" uk-tooltip = "PA League Discord" className = "uk-display-inline uk-button" href = "https://discord.gabirmotors.ga/"><FaDiscord className = "icon-button icon-button-discord"/></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "PA Twitch" className = "uk-display-inline uk-button" href = "https://www.twitch.tv/pennyarcade"><FaTwitch className = "icon-button icon-button-twitch"/></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "Status Page" className = "uk-display-inline uk-button" href = "https://status.gabirmotors.ga/"><BsWifi className = "icon-button icon-button-status"/></a><br />
              <a target = "_new" uk-tooltip = "@GabirMotors" className = "uk-display-inline uk-button" href = "https://twitter.com/GabirMotors"><FaTwitter className = "icon-button icon-button-twitter"/></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "@FleischwolfNews" className = "uk-display-inline uk-button" href = "https://twitter.com/FleischwolfNews"><FaTwitter className = "icon-button icon-button-twitter"/></a>&nbsp;&nbsp;
            </li>
            <li className="uk-nav-divider"></li>
            <li>
              <p className = "uk-padding-small">Made by Gabe Krahulik</p>
            </li>
        </ul>

    </div>
        </div>
    </header>
  )
}

Header.defaults = {
  title: 'Gabir Motors',
  desc: 'The world’s premiere, pretend Motorsports Company. Proud sponsor of Mike Racecar and the Penny Arcade iRacing league.'
}

Header.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string
}

export default Header