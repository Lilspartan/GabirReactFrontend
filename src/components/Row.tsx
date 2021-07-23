import { Link } from 'react-router-dom';
import { Standing } from '../interfaces'

type RowProps = {
    standing: Standing,
    colors: any,
    moreData: boolean,
    champions: boolean
}

const Row = ({ standing, colors, moreData, champions }: RowProps) => {
    var team:any = standing.team;
    team = team.replace(/[a-z]/g, '');
    team = team.replace(/\s/g, '');
    team = team.replace(/\./g, '');
    
    if (standing.pos.includes("C") && !champions) return <></>;
    if (!standing.pos.includes("C") && champions) return <></>;

    const teamColor = (team !== "LWP" ? colors[team] : '#333')
    const border = `5px solid ${teamColor}`
    
    return (    
        <tr className = "standings-row" id = {standing.name}>
            <td className = "standings-color-bar" style = {{ 
                borderLeft: border
            }}>
                { (
                    <Link to = {`/teams${team !== "LWP" ? '/'+team : ''}?from=standings`}><img alt = {`${team} logo`} className = "standings-logo" src = {`https://i.gabirmotors.com/assets/teams/${team}/main.png`} /></Link>
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
