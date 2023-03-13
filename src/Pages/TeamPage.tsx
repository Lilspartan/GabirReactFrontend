import { useState, useEffect } from "react";
import { withRouter, useParams, Link } from 'react-router-dom'
import { Team, Driver } from '../interfaces';
import qs from 'qs';
import CenterCard from '../Templates/CenterCard/index';

type Params = {
	t: string;
}

const TeamPage = (props: any) => {
	const [goto, setGoto] = useState("teams")

	setTimeout(function() {
		if (qs.parse(props.location.search, { ignoreQueryPrefix: true })["from"] !== undefined) {
			setGoto(String(qs.parse(props.location.search, { ignoreQueryPrefix: true })["from"]))
		}
	}, 100)

	let { t } = useParams<Params>();

	const [team, setTeam] = useState<Team>({
		"drivers": [
			{
				"name": "Loading",
				"car_number": -1
			}
		],
		"_id": "",
		"abbr": "...",
		"name": "Loading Team...",
		"team_leader": "...",
		"logo": "https://cdn.shopify.com/s/files/1/0042/9942/files/brand-pa_256x.png?v=1603497096",
	});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const fetchTeam = async () => {
			const res = await fetch(`https://api.gabirmotors.com/team/${t}`)
			const data = await res.json()

			if (data?.message === "ERR_NO_TEAM") {
				return props.history.push('/?from=teams&error=noteam')
			}

			console.log(data)

			return setTeam(data);
		}

		fetchTeam();
	}, [t, props.history])

	return (
		<>
			<CenterCard title={team.name}>
				<div>
					<img src={team.logo} style={{ height: 'auto', width: '25vw', minWidth: '250px', paddingBottom: '1vh' }} alt={`${team.name} Logo`} />
				</div>
				<h2 className="uk-margin-remove text-5xl">{team.name}</h2>
				<h3 className="uk-margin-remove text-xl">Leader: <span className="">{team.team_leader}</span></h3>
				<div className="uk-overflow-auto show-scrollbar" style={{ maxHeight: '40vh' }}>
					<table className="uk-table uk-table-small uk-table-middle">
						<thead>
							<tr>
								<th>Name</th>
								<th>Number</th>
							</tr>
						</thead>
						<tbody>
							{team.drivers.map((driver: Driver) => (
								<>
									<tr>
										<td className="uk-text-left uk-text-emphasis">{driver.name} {driver?.username ? `(${driver.username})` : ''}</td>
										<td className="uk-text-left uk-text-emphasis">{driver.car_number !== -1 ? driver.car_number : "N/A"}</td>
									</tr>
								</>
							))}
						</tbody>
					</table>
				</div>
				<br />
				<br />
				<Link to={`/${goto}`} className="uk-button uk-button-text uk-text-success">Back to {goto}</Link>
			</CenterCard>
			<div className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .fade-p1; delay: 500; repeat: true">
				<div>
					{/* <h4 className="fade-p1">{`Gabir Motors • ${d.getFullYear()}`}</h4> */}
				</div>
			</div>
    </>
  )
}

export default withRouter(TeamPage);
