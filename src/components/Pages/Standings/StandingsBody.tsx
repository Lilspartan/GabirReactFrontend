/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import Header from '../../Header'
import Row from './Row'
import Loading from "../../Loading";
import { Standing } from '../../../interfaces'

const StandingsBody = () => {
    const [standings, setStandings] = useState<Standing[]>([]);
    const [colors, setColors] = useState({});
    const [moreData, setMoreData] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStandings = async () => {
            const res = await fetch('https://api.gabirmotors.com/standings');
            var data = await res.json();

            data = data.sort((a:Standing, b:Standing) => {return a.pos-b.pos})

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
            {loading && (
                <div className = "uk-background-cover"
                style={{
                backgroundImage: "url(img/gabir_bg.jpg)",
                height: "100vh",
                }}>
                <div className = "uk-position-center">
                    <Loading size = "300px" />
                </div>
                </div>
            )}
            {
                !loading && (
                    <>
                        <div className="uk-height-large uk-background-cover uk-light uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', minHeight: '100vh', height: 'auto' }}> 
                            <h1 className = "uk-text-center uk-margin-bottom uk-text-muted">Thank you to <a target = "_new" href = "https://twitter.com/severinmira">severinmira#2039</a> for the data</h1>
                            <a className = "uk-visible@m uk-button uk-button-default uk-align-center uk-width-1-2 uk-width-1-3@s" onClick = {() => { setMoreData(!moreData)}}>Show More Info</a>
                            <h4 className = "uk-hidden@m uk-text-center uk-margin-bottom uk-text-muted uk-text-italic">More data available on larger screens</h4>
                            <table className = "standings-table uk-table uk-table-medium uk-table-hover" style = {{ minHeight: '100vh' }}>
                                <tr>
                                    <th></th>
                                    <th>Position</th>
                                    <th>Name</th>
                                    <th>Season Points</th>
                                    <th className = "uk-visible@m">Wins</th>
                                    <th className = "uk-visible@m">Podiums</th>
                                    {moreData && weeks.map(w => (
                                        <th className = "uk-visible@m">{w}</th>
                                    ))}
                                </tr>
                                {standings.map(s => (
                                    <Row standing = {s} colors = {colors} moreData = {moreData} />
                                ))}   
                            </table>
                        </div>
                    </>
                )
            }   
        </>
    )
}

export default StandingsBody;