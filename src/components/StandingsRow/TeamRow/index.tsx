import { Link } from 'react-router-dom';
import { TeamStanding } from '../../../interfaces'

type RowProps = {
    standing: TeamStanding,
    colors: any
}

const Row = ({ standing, colors }: RowProps) => {
    var team:any = standing.name;
    team = team.replace(/[a-z]/g, '');
    team = team.replace(/\s/g, '');
    team = team.replace(/\./g, '');

    const teamColor = (team !== "LWP" ? colors[team] : '#333')
    const border = `5px solid ${teamColor}`
    
    return (    
        <tr className = "standings-row" id = {standing.name}>
            <td className = "standings-color-bar" style = {{ 
                borderLeft: border
            }}>
                { (
                    <Link to = {`/teams${team !== "LWP" ? '/'+team : '/LWP'}?from=standings`}><img alt = {`${team} logo`} className = "standings-logo" src = {`https://i.gabirmotors.com/assets/teams/${team}/main.png`} /></Link>
                ) }
                </td>
            <td className = "standings-name">{standing.name}</td>
            <td className = "standings-total-points">{standing.points}</td>
        </tr>
    )
}

export default Row
