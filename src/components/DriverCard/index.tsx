import { Driver } from '../../interfaces';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss'
import { SocialMediaLink } from '../../interfaces'

type Props = {
    number: number;
    name: string;
    children: any;
    links?: SocialMediaLink[];
}

export default function DriverCard(props: Props) {
    const { number, name, links } = props;

    // The Driver Object of the winner
    const [driver, setDriver] = useState<Driver | null>(null);

    useEffect(() => {
        // Check if a car number is provided, if so then fetch the driver object
        if (number !== null) {
          (async () => {
            var res = await fetch(`https://api.gabirmotors.com/driver/${number}`);
            var data = await res.json();
            setDriver(data[0]);
          })()
        } else {
          setDriver({
            "car_number": "N/A",
            "name": name ? name : "N/A",
          })
        }
      }, [number, name])

    return (
        <div className="uk-inline">
            <button className="uk-button uk-button-text" type="button">
              { props.children }
            </button>
            {number != null && (
              <div uk-dropdown = "pos: top-center" className = "driver-card">
                    {driver?.team && <Link to = {`/teams${driver?.team?.abbr !== "LWP" ? '/'+driver?.team?.abbr : ''}?from=calendar`}><img alt = {`${driver?.team?.name} logo`} className = "standings-logo" src = {`https://i.gabirmotors.com/assets/teams/${driver?.team?.abbr}/main.png`} /></Link> } <br /> #{driver?.car_number} {driver?.name} {driver?.username ? `(${driver.username})` : ''}
              </div>
            )} 
          </div>
    )
}