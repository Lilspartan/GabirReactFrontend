import Haiku from './Haiku'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { BsList } from 'react-icons/bs'
import { FaDiscord, FaTwitter, FaTwitch } from 'react-icons/fa'

const Header = ({ title, desc, loggedin, user, onLogInClick }) => {
  const LoggedInSidebar = (props) => {
    return (
      <li className="uk-parent">
          <Link to = "#">{ props.user.name }</Link>
          <ul className="uk-nav-sub">
            <li>Dashboard</li>
            <li><button onClick = {() => { props.toggle() }}></button></li>
          </ul>
      </li>
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

  const SidebarUser = (props) => {
    if (props.isLoggedIn) {
      return <LoggedInSidebar toggle = {props.onLogInClick} user = {user} />
    } else {
      return <GuestInSidebar toggle = {props.onLogInClick} />
    }
  }

  return (
    <header>
      <title>{ title }</title>
      <meta
        name="description"
        content= {desc}
      />
      <div uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent uk-light; top: 200">
        <a className="uk-margin-small-right uk-position-top-left"uk-toggle="target: #offcanvas-slide"><BsList style = {{color: 'white', fontSize: '60px'}}/></a>
      </div>
      <div id="offcanvas-slide" uk-offcanvas="mode: slide;">
        <div className="uk-offcanvas-bar uk-flex uk-flex-column">

        <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
            <li className="uk-active"><Link to="/">Gabir Motors</Link></li>

            <SidebarUser isLoggedIn = {loggedin} onLogInClick = {onLogInClick} />
            
            <li className="uk-parent">
                <Link to = "#">Stream Submissions</Link>
                <ul className="uk-nav-sub">
                    <li><Link to = "/haikus">Haikus</Link></li>
                    <li><Link to = "/quotes">Quotes</Link></li>
                </ul>
            </li>
            
            <li className="uk-parent">
                <Link to = "#">Helpful Resources</Link>
                <ul className="uk-nav-sub">
                    <li><Link to = "/calendar">Calendar</Link></li>
                    <li><Link to = "/assets">Assets</Link></li>
                </ul>
            </li>

            <li className="uk-parent">
                <Link to = "#">How To</Link>
                <ul className="uk-nav-sub">
                    <li><Link to = "/info/blueflags">Blue Flags</Link></li>
                    <li><Link to = "/info/blackflags">Black Flags</Link></li>
                </ul>
            </li>

            <li className="uk-nav-divider"></li>
            <li><a className = "uk-display-inline uk-button uk-button-text" href = "https://discord.gabirmotors.ga/"><FaDiscord /></a> • <a className = "uk-display-inline uk-button uk-button-text" href = "https://twitter.com/GabirMotors"><FaTwitter /></a> • <a className = "uk-display-inline uk-button uk-button-text" href = "https://www.twitch.tv/pennyarcade"><FaTwitch /></a></li>
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