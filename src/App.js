import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Haikus from './components/Haikus'
import Header from './components/Header'
import MainIndex from './components/MainBody'
import MainCal from './components/CalendarBody'
import MainLog from './components/LoginBody'
import MainSign from './components/SignupBody'
import MainDash from './components/Dashboard'
import PrivateRoute from './components/AuthRoute'
import './index.css'
import Dashboard from './components/Dashboard'
import Temp from './components/temp'

const backend = "https://api.gabirmotors.ga"

const App = () => {
  const [haikus, setHaikus] = useState([])
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') || '')
  const [user, setUser] = useState(sessionStorage.getItem('user') || {})

  useEffect(() => {
    const getHaikus = async () => {
      const haikusFromServer = await fetchHaikus()
      setHaikus(haikusFromServer)
    }

    getHaikus()
  }, [])

  // Fetch Tasks
  const fetchHaikus = async () => {
    const res = await fetch(`${backend}/haikus`)
    const data = await res.json()

    return data
  }

  // Fetch Calendar

  const toggleLogIn = async (user, logged) => {
    sessionStorage.setItem('isLoggedIn', logged);
    sessionStorage.setItem('user', JSON.stringify(user));
    setLoggedIn(sessionStorage.getItem('isLoggedIn'));
    setUser(sessionStorage.getItem('user'))
  }

  return (
    <Router>
        <Route path='/' exact render={(props) => (
            <>
              <Header title = "Gabir Motors | Home" onLogout = {toggleLogIn} />
              <MainIndex />
            </>
        )}/>
        {/* Login / Signup pages */}

        <Route path='/login' render={(props) => (
          <>
            <Header title = "Gabir Motors | Login" onLogout = {toggleLogIn} />
            <MainLog onLogIn = {toggleLogIn} />
          </>
        )} />
        <Route path='/signup' render={(props) => (
          <>
            <Header title = "Gabir Motors | Signup" onLogout = {toggleLogIn} />
            <MainSign />
          </>
        )} />
        <Route path='/calendar' exact render={(props) => (
          <>
            <Header title = "Gabir Motors | Calendar" loggedin = {loggedIn} user = {user} />
            <MainCal />
          </>
        )} />
        <PrivateRoute authed = {loggedIn} path = "/dashboard" component = {Dashboard} exact = {true} onLogout = {toggleLogIn} />
        <Route path='/haikus' render ={(props) => (
          <>
            <Header title = "Gabir Motors | Haiku" loggedin = {loggedIn} user = {user} />
            <Haikus haikus = {haikus}/>
          </>
        )} />
        <Route path = '/test' render = {(props) => (
          <>
            <Header title = "Gabir Motors | Calendar" loggedin = {loggedIn} user = {user} />
            <Temp />
          </>
        )} />
    </Router>
  )
}

export default App
