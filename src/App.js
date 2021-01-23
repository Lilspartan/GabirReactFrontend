import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Haikus from './components/Haikus'
import Header from './components/Header'
import MainIndex from './components/MainBody'
import MainCal from './components/CalendarBody'
import MainLog from './components/LoginBody'
import MainSign from './components/SignupBody'
import './index.css'

const backend = "https://api.gabirmotors.ga"

const App = () => {
  const [haikus, setHaikus] = useState([])
  const [calendar, setCalendar] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

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
    setLoggedIn(logged);
    setUser(user)
  }

  return (
    <Router>
        <Route path='/' exact render={(props) => (
            <>
              <Header title = "Gabir Motors | Home" loggedin = {loggedIn} user = {user} onLogInClick = {toggleLogIn} />
              <MainIndex />
            </>
        )}/>
        {/* Login / Signup pages */}

        <Route path='/login' render={(props) => (
          <>
            <Header title = "Gabir Motors | Login" loggedin = {loggedIn} user = {user} onLogout = {toggleLogIn} />
            <MainLog onLogIn = {toggleLogIn} />
          </>
        )} />

        <Route path='/signup' render={(props) => (
          <>
            <Header title = "Gabir Motors | Signup" loggedin = {loggedIn} user = {user} onLogout = {toggleLogIn} />
            <MainSign />
          </>
        )} />

        <Route path='/calendar' exact render={(props) => (
          <>
            <Header title = "Gabir Motors | Calendar" loggedin = {loggedIn} user = {user} />
            <MainCal calendar = {calendar} />
          </>
        )} />
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
