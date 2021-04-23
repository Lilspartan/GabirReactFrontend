import { useState, useEffect } from 'react'
import Race from './Race'
import Header from '../../Header'
import { logoutUser } from "../../../actions/authActions";
import { connect } from "react-redux";

const Calendar = (props) => {
  
  var { user } = props.auth;
  user = user._doc;
  //console.log(user)

  const [isEdit, setEdit] = useState(true);
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
      <div uk-filter="target: .js-filter; animation: fade" className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', minHeight: '100vh', height: 'auto' }}> 
        <div className = "uk-position-top-center" style = {{ zIndex: '10000' }}>
        {/*
        <ul class="uk-subnav uk-subnav-pill">
          <li uk-filter-control=".tag-race" className = "uk-active"><a href="#">All</a></li>
          <li uk-filter-control=".tag-road"><a href="#">Road</a></li>
          <li uk-filter-control=".tag-oval"><a href="#">Oval</a></li>
          <li uk-filter-control=".tag-dirt"><a href="#">Dirt</a></li>
          <li uk-filter-control=".tag-uncomplete"><a href="#">Uncompleted</a></li>
          <li uk-filter-control=".tag-free"><a href="#">Free</a></li>
        </ul>
        */}
        </div>
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
              <Race key={index} race={race} isEdit = {isEdit} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Calendar);