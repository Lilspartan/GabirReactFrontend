import React from 'react'
import Header from "../../Header";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

const TeamsPage = () => {
    const [teams, setTeams] = useState([
        {
            "name": "",
            "logo": "",
            "numOfDrivers": 0
        }
    ])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const res = await fetch('https://api.gabirmotors.ga/team/thumb')
        const data = await res.json();
        setTeams(data);
    }, [])

    const TeamCard = (team) => {
        team = team.team
        return (
            <div style = {{  }}>
                <div className="scroll-in-1 uk-tile uk-padding-large team-logo">
                    <div>
                        <Link to = {`/teams/${team.abbr}`}>
                            <img 
                                src = {team.logo} 
                                alt = {`${team.name} logo`}
                                style = {{
                                    width: 'auto',
                                    height: '10vh'
                                }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header
                title={`Gabir Motors | Teams`}
            />

            <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', height: '150vh' }}>
                <div>
                    <div uk-scrollspy="target: > div; cls: uk-animation-slide-top; delay: 100" className="uk-flex-center uk-child-width-1-2@s uk-grid-collapse uk-text-center uk-grid-small" uk-grid = "true" style = {{ height: '100vh'}}>
                        {teams.map((team, i) => (
                            <>
                                <TeamCard key = {i} team = {team} />
                            </>
                        ))}
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

export default TeamsPage
