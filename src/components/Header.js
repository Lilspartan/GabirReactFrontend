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
            <li className="uk-logo"><Link to="/"><img src = "img/logo.png" alt = "GM logo" style = {{width: '10vw', height: 'auto', minWidth: '200px'}}/></Link></li>

            <SidebarUser isLoggedIn = {loggedin} />
            
            <li class="uk-nav-header">Stream Submissions</li>
            <li><Link className = "uk-button uk-button-text uk-display-inline" to = "/haikus">Haikus</Link></li>
            <li><a className = "uk-button uk-button-text uk-display-inline" href = "https://gabirmotors.ga/quotes">Quotes</a></li>
            
            <li class="uk-nav-header">Helpful Resources</li>
            <li><Link className = "uk-button uk-button-text uk-display-inline" to = "/calendar">Calendar</Link></li>
            <li><a className = "uk-button uk-button-text uk-display-inline" href = "https://gabirmotors.ga/assets">Assets</a></li>

            <li class="uk-nav-header">How To</li>
            <li><a className = "uk-button uk-button-text uk-display-inline" href = "https://gabirmotors.ga/info/blueflags">Blue Flags</a></li>
            <li><a className = "uk-button uk-button-text uk-display-inline" href = "https://gabirmotors.ga/info/blackflags">Black Flags</a></li>

            <li className="uk-nav-divider"></li>

            <li class="uk-nav-header">Other Links</li>
            <li>
              <a uk-tooltip = "PA League Discord" className = "uk-display-inline uk-button uk-button-text" href = "https://discord.gabirmotors.ga/"><FaDiscord /></a>&nbsp;&nbsp;
              <a uk-tooltip = "Gabir Motors Twitter" className = "uk-display-inline uk-button uk-button-text" href = "https://twitter.com/GabirMotors"><FaTwitter /></a>&nbsp;&nbsp;
              <a uk-tooltip = "PA Twitch" className = "uk-display-inline uk-button uk-button-text" href = "https://www.twitch.tv/pennyarcade"><FaTwitch /></a>&nbsp;&nbsp;
              <a uk-tooltip = "Status Page" className = "uk-display-inline uk-button uk-button-text" href = "https://status.gabirmotors.ga/"><BsWifi /></a>
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