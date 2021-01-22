import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Haikus from './components/Haikus'
import Header from './components/Header'
import MainIndex from './components/MainBody'
import MainCal from './components/CalendarBody'
import './index.css'

const backend = "https://api.gabirmotors.ga"

const App = () => {
  const [haikus, setHaikus] = useState([])
  const [calendar, setCalendar] = useState([])

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

  return (
    <Router>
        <Route path='/' exact render={(props) => (
            <>
              <Header title = "Gabir Motors | Home" />
              <MainIndex />
            </>
          )}
        />
        <Route path='/calendar' exact render={(props) => (
          <>
            <Header title = "Gabir Motors | Calendar" />
            <MainCal calendar = {calendar} />
          </>
        )} />
        <Route path='/haikus' render ={(props) => (
          <>
            <Header title = "Gabir Motors | Haiku" />
            <Haikus haikus = {haikus}/>
          </>
        )} />
    </Router>
  )
}

export default App
