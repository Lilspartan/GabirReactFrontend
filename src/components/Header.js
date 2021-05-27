import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import RightTab from './RightTab'
import RightTabLink from './RightTabLink'
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";

const Header = (props) => {
  const { title, desc } = props;
  var loggedin = localStorage.getItem('jwtToken')
  if (loggedin) {
    //console.log(props)
    var { user } = props.auth;
    user = user._doc;
  }

  const LoggedInSidebar = ({ toggle }) => {
    return (
      <>
        <li className="uk-parent">
            <li className="uk-nav-header">{user?.name}</li>
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
        <a id = "menuopen" className="uk-margin-small-right uk-position-top-left"uk-toggle="target: #offcanvas-slide" href = "#"><span uk-icon="icon: menu; ratio: 2" style = {{color: 'white'}}></span></a>
      </div>

      <RightTab id = "anniversary">
        <img src = "https://i.gabirmotors.ga/assets/Other%20Images/League/LeagueHORIZONTAL.png" alt = "Northern Harbor Logo"/>
        <h3>The PA League Turns 1!</h3>
        <p>
          Tonight, May 27th, is the Penny Arcade iRacing League's 1-year anniversary. The league has been such an awesome experience for everyone involved, and will hopefully continue to be a fun place to hang out and race with others.
        </p>
        <p>
          A big thank you to the Admins,<br />
          <ul style = {{ listStyleType: 'square'}}>
            <li><a href = "https://twitter.com/beastgp" target = "_new">beastGP (Geoff M)</a></li>
            <li><a href = "https://twitter.com/Draxond" target = "_new">Draxond (Chris O)</a></li>
            <li><a href = "https://twitter.com/brainling" target = "_new">Brainling (Matt H)</a></li>
            <li><a href = "https://www.twitch.tv/skiggity242" target = "_new">Skiggity (Scott L.)</a></li>
          </ul>
          for putting together our races, and keeping the league fun.<br /><br />
          Thank you everyone for joining us in the League, and keeping it a friendly environment for people of all skill levels, I hope the next year is even better than the last.<br /><br />
          For tonight's stream we have some 1 year iRacing codes to give away, so make sure to join us for a chance at one of those, and we'll (hopefully) have stream racer before the stream starts.<br />
          <br />
          Keep on racing <span uk-icon = "heart"></span>
        </p>
      </RightTab>

      <div id="offcanvas-slide" uk-offcanvas="mode: slide;">
        <div className="uk-offcanvas-bar uk-flex uk-flex-column">

        <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
            <li className="uk-logo"><Link to="/"><img src = "../img/logo.png" alt = "GM logo" style = {{width: '14vw', height: 'auto', minWidth: '200px'}}/></Link></li>

            <RightTabLink id = "annbtn" target = "anniversary" type = "success">1-Year Anniversary</RightTabLink>
            <li className="uk-nav-divider"></li>

            <SidebarUser isLoggedIn = {loggedin} />
            
            <li className="uk-nav-header">Stream Submissions</li>
            <li className = "nav-link"><Link className = "uk-button uk-button-text uk-display-inline" to = "/haikus">Haikus</Link></li>
            <li className = "nav-link"><Link className = "uk-button uk-button-text uk-display-inline" to = "/quotes">Quotes</Link></li>
            
            <li className="uk-nav-header">Helpful Resources</li>
            <li className = "nav-link"><Link className = "uk-button uk-button-text uk-display-inline" to = "/calendar">Calendar</Link></li>
            <li className = "nav-link"><Link className = "uk-button uk-button-text uk-display-inline" to = "/teams">Teams</Link></li>
            <li className = "nav-link"><Link className = "uk-button uk-button-text uk-display-inline" to = "/assets">Assets</Link></li>

            {/*
            <li class="uk-nav-header">How To</li>
            <li><a className = "uk-button uk-button-text uk-display-inline" href = "https://gabirmotors.ga/info/blueflags">Blue Flags</a></li>
            <li><a className = "uk-button uk-button-text uk-display-inline" href = "https://gabirmotors.ga/info/blackflags">Black Flags</a></li>
            */}
            <li className="uk-nav-divider"></li>
            <li>
              <a target = "_new" uk-tooltip = "PA League Discord" className = "uk-display-inline uk-button" href = "https://discord.gabirmotors.ga/"><span className = "icon-button icon-button-discord" uk-icon = "icon:discord; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "PA Twitch" className = "uk-display-inline uk-button" href = "https://www.twitch.tv/pennyarcade"><span className = "icon-button icon-button-twitch" uk-icon = "icon:twitch; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "@GabirMotors" className = "uk-display-inline uk-button" href = "https://twitter.com/GabirMotors"><span className = "icon-button icon-button-twitter" uk-icon = "icon:twitter; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "@FleischwolfNews" className = "uk-display-inline uk-button" href = "https://twitter.com/FleischwolfNews"><span className = "icon-button icon-button-twitter" uk-icon = "icon:twitter; ratio: 1.4"></span></a>&nbsp;&nbsp;
            </li>
            <li>
              <p className = "uk-padding-small uk-text-uppercase uk-text-top">Made by<br /><span style = {{color:'white'}}>Gabe Krahulik</span><br/><a target = "_new" href="https://github.com/Lilspartan/"><span className = "icon-button icon-button-github" uk-icon = "github"></span></a> <a target = "_new" href="https://twitter.com/gabekrahulik"><span className = "icon-button icon-button-twitter" uk-icon = "twitter"></span></a></p>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withRouter(connect(mapStateToProps, { logoutUser })(Header));