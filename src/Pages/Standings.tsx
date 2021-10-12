/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Row from '../components/StandingsRow/Row'
import Loading from "../components/Loading";
import { Standing } from '../interfaces';
import { Link } from 'react-router-dom';

const StandingsBody = () => {
    const [standings, setStandings] = useState<Standing[]>([]);
    const [colors, setColors] = useState({});
    const [moreData, setMoreData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showChampions, setShowChampions] = useState(false);

    useEffect(() => {
        const fetchStandings = async () => {
            const res = await fetch('https://api.gabirmotors.com/standings');
            var data = await res.json();

            data = data.sort((a:Standing, b:Standing) => {return Number(a.pos)-Number(b.pos)})

            setStandings(data)
            
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

    var weeks = [];
    for(var i = 0; i < standings[0]?.points.length; i ++) {
        weeks.push(`Week ${i + 1}`)
    }

    return (
        <>
            <Header title = "Gabir Motors | Standings" />
            {loading && <Loading />}
            {
                !loading && (
                    <>
                        <div className="uk-height-large uk-background-cover uk-light uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', minHeight: '100vh', height: 'auto' }}> 
                            <h1 className = "uk-text-center uk-margin-bottom uk-text-muted uk-animation-slide-bottom-small">Thank you to <a target = "_new" href = "https://twitter.com/severinmira">severinmira</a> for the data</h1>
                            <div>
                                <a className = "uk-animation-slide-top-medium uk-visible@m uk-button uk-button-default uk-align-center uk-width-1-2 uk-width-1-3@s" onClick = {() => { setMoreData(!moreData)}}>Show More Info</a>
                                <div className = "uk-align-center uk-width-1-2@s uk-width-1-1">
                                    <a className = "uk-animation-slide-left-medium uk-button uk-button-default uk-width-1-1 uk-width-1-2@m" onClick = {() => { setShowChampions(!showChampions)}}>{!showChampions ? "Show Champions Cup" : "Hide Champions Cup"}</a>
                                    <Link className = "uk-animation-slide-right-medium uk-button uk-button-default uk-width-1-1 uk-width-1-2@m" to = "/timeline">Timeline of Champions</Link>
                                </div>
                            </div>
                            <h4 className = "uk-animation-slide-left-medium uk-hidden@m uk-text-center uk-margin-bottom uk-text-muted uk-text-italic">More data available on larger screens</h4>
                            <table className = "uk-margin-remove uk-table uk-table-medium uk-table-hover" uk-scrollspy="cls: uk-animation-slide-bottom-small; target: .standings-row; delay: 50;">
                                <tbody>
                                    <tr className = "standings-row">
                                        <th>Name</th>
                                        <th>Season Points</th>
                                        <th className = "uk-visible@m">Wins</th>
                                        <th className = "uk-visible@m">Podiums</th>
                                        {moreData && weeks.map(w => (
                                            <th className = "uk-visible@m">{w}</th>
                                        ))}
                                    </tr>
                                    {standings.map(s => (
                                        <Row standing = {s} colors = {colors} moreData = {moreData} champions = {showChampions} />
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