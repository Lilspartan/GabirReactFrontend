/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import TeamRow from '../components/StandingsRow/TeamRow'
import Loading from "../components/Loading";
import { Standing, Team, TeamStanding } from '../interfaces';

const StandingsBody = () => {
    const [colors, setColors] = useState({});
    const [loading, setLoading] = useState(true);
    const [constructorsStandings, setConstructorsStandings] = useState<TeamStanding[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchStandings = async () => {
            const res = await fetch('https://api.gabirmotors.com/standings');
            var data: Standing[] = await res.json();

            data = data.sort((a:Standing, b:Standing) => {return Number(a.pos)-Number(b.pos)})
            
            const res2 = await fetch('https://api.gabirmotors.com/team/all')
            var t: Team[] = await res2.json();
            setTeams(t);

            const setpoints = () => {
                var constructorsPoints: TeamStanding[] = []
                for (var i = 0; i < teams.length; i ++) {
                    var currentTeam:Standing[] = [];
                    for (var j in data) {
                        var te = data[j].team;
                        te = te.replace(/[a-z]/g, '');
                        te = te.replace(/\s/g, '');
                        te = te.replace(/\./g, '');
                        if (te === teams[i].abbr) {
                            currentTeam.push(data[j])
                            console.log(data[j])
                        }
                    }
                    constructorsPoints.push({
                        name: currentTeam[0].team,
                        points: Number(currentTeam[0].seasonPoints) + Number(currentTeam[1].seasonPoints)
                    });
                }
                return constructorsPoints.sort((a:TeamStanding, b:TeamStanding) => {return Number(b.points)-Number(a.points)});
            }
                
            setConstructorsStandings(setpoints())
            console.log(constructorsStandings)
        }

        const fetchColors = async() => {
            const res = await fetch('https://i.gabirmotors.com/assets/teams/colors.json');
            const data = await res.json();

            setColors(data)
        }
        fetchColors();

        fetchStandings();
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, [])

    return (
        <>
            <Header title = "Gabir Motors | Constructors" />
            {loading && <Loading />}
            {
                !loading && (
                    <>
                        <div className="uk-height-large uk-background-cover uk-light uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', minHeight: '100vh', height: 'auto' }}> 
                            <h1 className = "uk-text-center uk-margin-bottom uk-text-muted uk-animation-slide-bottom-small">Thank you to <a target = "_new" href = "https://twitter.com/severinmira">severinmira</a> for the data</h1>
                           
                            <table className = "uk-margin-remove uk-table uk-table-medium uk-table-hover" uk-scrollspy="cls: uk-animation-slide-bottom-small; target: .standings-row; delay: 50;">
                                <tbody>
                                    <tr className = "standings-row">
                                        <th></th>
                                        <th>Position</th>
                                        <th>Team Name</th>
                                        <th>Points</th>
                                    </tr>
                                    {constructorsStandings.map(s => (
                                        <TeamRow standing = {s} colors = {colors} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            }   
        </>
    )
}

export default StandingsBody;