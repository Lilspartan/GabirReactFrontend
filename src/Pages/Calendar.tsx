import { useState, useEffect } from 'react'
import Race from '../components/Race'
import { Race as RaceTypes } from '../interfaces';
import Blank from '../Templates/Blank/index';

const Calendar = () => {
	const [calendar, setCalendar] = useState<RaceTypes[]>([{"id": "0","timestamp": 100000000000000000000,"date": "Fetching Calendar, please wait","track": "","tags": {"notes": null,"winner": null,"winnerNumber": null,"theme": null,"paid": {"track": false,"car": []},"tags": ["waiting"]},"car": []}])

	useEffect(() => {

		const getCal = async () => {
			const calendarFromServer = await fetchCal()
			setCalendar(calendarFromServer)
		}

		getCal();
	}, [])

	const fetchCal = async () => {
		const res = await fetch(`https://api.gabirmotors.com/calendar`)
		const data = await res.json()

		return data
	}

	return (
		<>
			<Blank title="Calendar">
				<table uk-filter="target: .js-filter; animation: fade" uk-scrollspy="cls: uk-animation-slide-left-small; target: .tag-race; delay: 50;" className="uk-table uk-table-hover uk-table-divider uk-table-responsive uk-table-middle uk-table-large" style={{ minHeight: '100vh', marginTop: '8rem' }}>
					<caption className="uk-padding uk-position-top">
						<h3 className="uk-text-center uk-margin-bottom">Gabir Motors Season 8 Calendar</h3>
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
					<tbody className="js-filter">
						{calendar.sort((a, b) => { return a.timestamp - b.timestamp }).map((race, index) => (
							<Race key={index} race={race} />
						))}
					</tbody>
				</table>
			</Blank>
		</>
	)
}

export default Calendar;