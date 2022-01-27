import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { LoadingPage, Header } from "../Components";

interface Thumbnail {
    name: string;
    abbr: string;
    logo: string;
    numOfDrivers: number;
}

const TeamsPage = () => {
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState<Thumbnail[]>([
        {
            "name": "Penny Arcade iRacing League",
            "abbr": "PAL",
            "logo": "https://cdn.shopify.com/s/files/1/0042/9942/files/brand-pa_256x.png?v=1603497096",
            "numOfDrivers": 0
        }
    ])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const fetchTeams = async () => {
            const res = await fetch('https://api.gabirmotors.com/team/thumb')
            var data:Thumbnail[] = await res.json();
            
            data.sort((a, b) => {return a.numOfDrivers - b.numOfDrivers})
            data.reverse();
            
            console.log(data)
            setTeams(data);
        }

        fetchTeams();
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, [])

    type TeamCardTypes = {
        team: Thumbnail;
    }

    const TeamCard = ({ team }:TeamCardTypes) => {
        return (
            <div>
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
            {loading && <LoadingPage />}

            {!loading && (
                <>
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
            )}
        </>
    )
}

export default TeamsPage
