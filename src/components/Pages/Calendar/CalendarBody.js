import { useState, useEffect } from 'react'
import Race from './Race'
import Header from '../../Header'
import { AiOutlineQuestionCircle } from "react-icons/ai";

const Calendar = () => {
  
  const [calendar, setCalendar] = useState([
    {
      "id": "0",
      "timestamp": 100000000000000000000,
      "date": "Fetching Calendar, please wait",
      "track": "",
      "tags": {
        "notes": null,
        "winner": null,
        "theme": null,
        "paid": {
          "track": false,
          "car": []
        },
        "tags": [
          "waiting"
        ]
      },
      "car": []
    }
  ])

  useEffect(() => {
    
    const getCal = async () => {
      const calendarFromServer = await fetchCal()
      setCalendar(calendarFromServer)
    }

    getCal();
  }, [])

  const fetchCal = async () => {
    const res = await fetch(`https://api.gabirmotors.ga/calendar`)
    const data = await res.json()
    
    return data
  }

  return (
    <>
      <Header title = "Gabir Motors | Calendar" />
      <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', minHeight: '100vh', height: 'auto' }}> 
        <table className = "uk-table uk-table-hover uk-table-divider uk-table-responsive uk-table-middle uk-table-large" style = {{ minHeight: '100vh', marginTop: '8vh'}}>
          <caption className = "uk-padding uk-position-top">
            <h3 className = "uk-text-center uk-margin-bottom">Gabir Motors Season 5 Calendar</h3>
          </caption>
          <thead>
            <tr>
              <th>Date</th>
              <th>Track</th>
              <th>Car</th>
              <th>Notes</th>
              <th>Winner</th>
              <th>Theme</th>
            </tr>
          </thead>
          <tbody className = "js-filter">
            {calendar.sort((a, b) => { return a.timestamp - b.timestamp }).map((race, index) => (
              <Race key={index} race={race} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Calendar