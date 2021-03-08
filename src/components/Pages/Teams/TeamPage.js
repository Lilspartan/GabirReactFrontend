import { useState, useEffect } from "react";
import { withRouter, useParams, Link } from 'react-router-dom'
import Header from "../../Header";

const TeamPage = (props) => {

    let { t } = useParams();

    const [team, setTeam] = useState({
        "drivers": [
          {
            "name": "",
            "username": "",
            "car_number": -1
          }
        ],
        "_id": "",
        "abbr": "",
        "name": "",
        "team_leader": "",
        "logo": ""
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const res = await fetch(`https://api.gabirmotors.ga/team/${t}`)
        const data = await res.json()
        
        if (data?.message === "ERR_NO_TEAM") {
            return props.history.push('/?from=teams&error=noteam')
        }

        console.log(data)

        return setTeam(data);
    }, [ t, props.history ])

    return (
        <>
            <Header
                title={`Team | ${team.name}`}
            />

            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(../img/gabir_bg.jpg)', height: '100vh'}}>
                <div>
                    <div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-container uk-position-center">
                        <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large">
                            <div>
                                <img src = {team.logo} style = {{ height: 'auto', width: '25vw', minWidth: '250px', paddingBottom: '1vh'}} alt = {`${team.name} Logo`}/>
                            </div>
                            <h2 className = "uk-margin-remove">{team.name}</h2>
                            <h3 className = "uk-margin-remove">Leader: <span className = "">{team.team_leader}</span></h3>
                            <h3 className = "uk-margin-remove">Drivers:</h3>
                            <table className = "uk-table uk-table-small uk-table-middle">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {team.drivers.map((driver, i) => (
                                        <>
                                            <tr>
                                                <td className = "uk-text-left uk-text-emphasis">{driver.name} {driver?.username ? `(${driver.username})` : ''}</td>
                                                <td className = "uk-text-left uk-text-emphasis">{driver.car_number !== -1 ? driver.car_number : "N/A"}</td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            <Link to = "/teams" className = "uk-button uk-button-text uk-text-success">Back to teams</Link>
                        </div>
                    </div>
                </div>
                <div className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .fade-p1; delay: 500; repeat: true">
                    <div>
                        {/* <h4 className="fade-p1">{`Gabir Motors • ${d.getFullYear()}`}</h4> */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default withRouter(TeamPage);
