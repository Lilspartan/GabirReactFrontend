import { useState, useEffect } from 'react'
import Race from './Race'

const Calendar = () => {
  
  const [calendar, setCalendar] = useState([
    {
      "id": "0",
      "date": "Fetching Calendar, please wait",
      "track": "",
      "tags": {
        "notes": null,
        "winner": null,
        "theme": null,
        "paid": null
      },
      "car": null
    }
  ])

  setTimeout(function() {
    if (calendar[0].id == 0) {
      setCalendar({
        "id": "0",
        "date": "Failed to Fetch Calendar",
        "track": "Refresh and try again",
        "tags": {
          "notes": null,
          "winner": null,
          "theme": null,
          "paid": null
        },
        "car": null
      })
    }
  }, 10000)

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
        <div className="uk-child-width-expand@s uk-text-center" uk-grid>
            {calendar.sort((a, b) => { return a.timestamp - b.timestamp }).map((race, index) => (
                <Race key={index} race={race} />
            ))}
        </div>
    </>
  )
}

export default Calendar