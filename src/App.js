import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Haikus from './components/Haikus'
import Header from './components/Header'
import Main from './components/MainBody'
import './index.css'

const backend = "https://api.gabirmotors.ga"

const App = () => {
  const [haikus, setHaikus] = useState([])

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

  return (
    <Router>
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              <Header title = "Gabir Motors | Home" />
              <Main />
            </>
          )}
        />
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
