import { LoadingPage, Header } from "../Components";
import { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

type Props = {
    text: string, team?: string
}

const Timeline = (props:any) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, [])

    const TimelineEvent = ({text,team}: Props) => {
        return (
            <>
                <div id={`text`} className="uk-text-center text-shadow">
                    <h2 className="fade-p2 timeline-name">{text}</h2>
                    {team !== undefined && (
                        <a href = {`/teams/${team}?from=timeline`}>
                            <img className="fade-p2 timeline-img" src={`https://i.gabirmotors.com/assets/teams/${team}/main.png`} alt={team} />
                        </a>
                    )}
                </div>
            </>
        )
    }

    const SeasonMarker = (props:any) => {
        return <><h1 className="uk-text-center text-shadow fade-p2 timeline-season">Season {props.children}</h1><hr className = "uk-divider-small uk-text-center" /></>
    }

    return (
        <>
            <Header title="Gabir Motors | Champions Timeline" />
            {loading && <LoadingPage />}

            {!loading && (
                <>
                    <div
                        className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed text-shadow"
                        style={{ backgroundImage: "url(img/gabir_bg.jpg)", height: "auto" }}
                    >
                        <div className = "uk-child-width-1-1" uk-grid = "true" id = "timeline" uk-scrollspy="cls: uk-animation-slide-left-small; target: .fade-p2; delay: 100;">
                            <h1 className = "uk-text-center">Penny Arcade Racing League Timeline of Champions</h1>
                            <hr className = "uk-divider-small uk-text-center" />
                            <SeasonMarker>1<br /><h2><i>May 28, 2020 - July 20, 2020</i></h2></SeasonMarker>
                            <TimelineEvent text = "Gargos the Mighty (Chris Raftis) - 283 Points" team = "HMA" />

                            <SeasonMarker>2<br /><h2><i>July 30, 2020 - Sep 10, 2020</i></h2></SeasonMarker>
                            <TimelineEvent text = "Nate D (Nate DeSelms) - 259 Points" team = "SENDIT" />

                            <SeasonMarker>3<br /><h2><i>Sep 24, 2020 - Nov 19, 2020</i></h2></SeasonMarker>
                            <TimelineEvent text = "Skiggity (Scott Lear) - N/A" team = "GM" />

                            <SeasonMarker>4<br /><h2><i>Dec 3, 2020 - Feb 18, 2021</i></h2></SeasonMarker>
                            <TimelineEvent text = "Gabir Motors Champion Cup Begins" />
                            <TimelineEvent text = "Skiggity (Scott Lear) - 283 Points" team = "GM" />

                            <SeasonMarker>5<br /><h2><i>Mar 4, 2021 - May 13, 2021</i></h2></SeasonMarker>
                            <TimelineEvent text = "Ocell (Christopher Owens) - 182 Points" team = "HMA" />

                            <SeasonMarker>6<br /><h2><i>May 20, 2021 - July 15, 2021</i></h2></SeasonMarker>
                            <TimelineEvent text = "PA League 1 Year Anniversary" />
                            <TimelineEvent text = "Red Stapler (Michael Carpenter2) - 222 Points" team = "LWP" />

                            <SeasonMarker>7<br /><h2><i>July 29, 2021 - Sep 30, 2021</i></h2></SeasonMarker>
                            <TimelineEvent text = "	Christopher Decker - 249 Points" team = "HMA" />

                            <SeasonMarker>8<br /><h2><i>October 14, 2021 - December 16, 2021</i></h2></SeasonMarker>
                            <TimelineEvent text = "Christopher Strickland - 194 Points" team = "HMA" />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default withRouter(Timeline);
