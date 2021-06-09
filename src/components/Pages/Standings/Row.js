import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ReactComment from '../../ReactComment';

const Row = ({ standing, colors, moreData }) => {
    var team = standing.team;
    team = team.replace(/[a-z]/g, '');
    team = team.replace(/\s/g, '');
    team = team.replace(/\./g, '');

    const teamColor = (team !== "LWP" ? colors[team] : '#333')
    const border = `5px solid ${teamColor}`
    
    return (    
        <tr className = "standings-row">
            <td className = "standings-color-bar" style = {{ 
                borderLeft: border
            }}>
                { (
                    <Link to = {`/teams${team !== "LWP" ? '/'+team : ''}?from=standings`}><img className = "standings-logo" src = {`https://i.gabirmotors.ga/assets/teams/${team}/main.png`} /></Link>
                ) }
                </td>
            <td className = "standings-pos">{standing.pos}</td>
            <td className = "standings-name">{standing.name}</td>
            <td className = "standings-total-points">{standing.seasonPoints}</td>
            <td className = "uk-visible@m">{standing.wins !== 0 && standing.wins}</td>
            <td className = "uk-visible@m">{standing.podiums !== 0 && standing.podiums}</td>
            {
                moreData &&
                standing.points.map(point => (
                    <td className = "standings-point-value uk-visible@m">{point !== '-' ? point : ''}</td>
                ))
            }
        </tr>
    )
}

export default Row
