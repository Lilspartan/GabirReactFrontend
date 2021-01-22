import Haiku from './Haiku'
import PropTypes from 'prop-types'
import { a } from 'react-router-dom'
import { BsList } from 'react-icons/bs'
import { FaDiscord, FaTwitter, FaTwitch } from 'react-icons/fa'

const Header = ({ title, desc, loggedin, user, onLogInClick }) => {
  const LoggedInSidebar = (props) => {
    return (
      <li className="uk-parent">
          <a href = "#">{ props.user.name }</a>
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
            <li><a href = "https://gabirmotors.ga/login" className = "uk-display-inline uk-button uk-button-text uk-text-success">Login</a> | <a href = "https://gabirmotors.ga/signup" className = "uk-display-inline uk-button uk-button-text uk-text-success">Sign Up</a></li>
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
            <li className="uk-active"><a href="/">Gabir Motors</a></li>

            <SidebarUser isLoggedIn = {loggedin} onLogInClick = {onLogInClick} />
            
            <li className="uk-parent">
                <a href = "#">Stream Submissions</a>
                <ul className="uk-nav-sub">
                    <li><a href = "https://gabirmotors.ga/haikus">Haikus</a></li>
                    <li><a href = "https://gabirmotors.ga/quotes">Quotes</a></li>
                </ul>
            </li>
            
            <li className="uk-parent">
                <a href = "#">Helpful Resources</a>
                <ul className="uk-nav-sub">
                    <li><a href = "https://gabirmotors.ga/calendar">Calendar</a></li>
                    <li><a href = "https://gabirmotors.ga/assets">Assets</a></li>
                </ul>
            </li>

            <li className="uk-parent">
                <a href = "#">How href</a>
                <ul className="uk-nav-sub">
                    <li><a href = "https://gabirmotors.ga/info/blueflags">Blue Flags</a></li>
                    <li><a href = "https://gabirmotors.ga/info/blackflags">Black Flags</a></li>
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