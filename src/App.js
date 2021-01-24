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

const backend = "https://api.gabirmotors.ga"

const App = () => {
  const [haikus, setHaikus] = useState([])
  const [calendar, setCalendar] = useState([])
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') || '')
  const [user, setUser] = useState(sessionStorage.getItem('user') || {})

  useEffect(() => {
    const getHaikus = async () => {
      const haikusFromServer = await fetchHaikus()
      setHaikus(haikusFromServer)
    }
    
    const getCal = async () => {
      const calendarFromServer = await fetchCal()
      setCalendar(calendarFromServer)
    }

    getCal();
    getHaikus()
  }, [])

  // Fetch Tasks
  const fetchHaikus = async () => {
    const res = await fetch(`${backend}/haikus`)
    const data = await res.json()

    return data
  }

  // Fetch Calendar
  const fetchCal = async () => {
    const res = await fetch(`${backend}/calendar`)
    const data = await res.json()

    return data
  }

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
              <Header title = "Gabir Motors | Home" onLogInClick = {toggleLogIn} />
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
            <MainCal calendar = {calendar} />
          </>
        )} />
        <PrivateRoute authed = {loggedIn} path = "/dashboard" component = {Dashboard} />
        <Route path='/haikus' render ={(props) => (
          <>
            <Header title = "Gabir Motors | Haiku" loggedin = {loggedIn} user = {user} />
            <Haikus haikus = {haikus}/>
          </>
        )} />
    </Router>
  )
}

export default App
