import React from 'react'
import Header from "../../Header";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import InfoTab from '../../InfoTab';

const TeamsPage = () => {
    const [teams, setTeams] = useState([
        {
            "name": "Penny Arcade iRacing League",
            "abbr": "PAL",
            "logo": "https://cdn.shopify.com/s/files/1/0042/9942/files/brand-pa_256x.png?v=1603497096",
            "numOfDrivers": 0
        }
    ])
    
    // eslint-disable-next-line no-unused-vars
    const [sortBy, setSort] = useState({
        "drivers": true,
        "name_a_z": false,
        "name_z_a": false
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const res = await fetch('https://api.gabirmotors.ga/team/thumb')
        var data = await res.json();
        if (sortBy.drivers) {
            data.sort((a, b) => {return a.numOfDrivers - b.numOfDrivers})
            data.reverse();
        } else if (sortBy.name_a_z) {
            data.sort(function(a, b){
                if(a.abbr < b.abbr) { return -1; }
                if(a.abbr > b.abbr) { return 1; }
                return 0;
            })
        } else if (sortBy.name_z_a) {
            data.sort(function(a, b){
                if(a.abbr < b.abbr) { return -1; }
                if(a.abbr > b.abbr) { return 1; }
                return 0;
            })
            data.reverse();
        }
        
        console.log(data)
        setTeams(data);
    }, [])

    const TeamCard = (team) => {
        team = team.team
        return (
            <div style = {{  }}>
                <div className="scroll-in-1 uk-tile uk-padding-large team-logo" data-drivers = {team.numOfDrivers} data-name = {team.name}>
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
            
            <InfoTab>
                <h2>PA League Teams</h2>
                <p>
                    The PA League consists of <strong>{teams.length}</strong> teams, each of them with their own drivers. This page exists to help navigate the complicated world of the teams.
                </p>
                <p>
                    On the left you can see the <strong>{teams.length}</strong> teams sorted by number of drivers, click on any of the logos to get more info about each team.
                </p>
            </InfoTab>
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
