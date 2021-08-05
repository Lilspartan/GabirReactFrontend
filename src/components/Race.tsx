import { Race as RaceTypes, Driver } from '../interfaces';
import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

interface Props {
  race: RaceTypes;
}

const Race:FC<Props> = ({ race }) => {
  const [driver, setDriver] = useState<Driver | null>(null);

  var time = Date.now();
  time = Number(time.toString().slice(0, -3));

  var classes = "uk-text-large tag-race";
  race.tags.tags.forEach((tag) => {
    classes += ` tag-${tag.trim()}`;
  });

  if (time < race.timestamp + 25200) classes += " tag-uncomplete";
  if (!race.tags.paid.car.length && !race.tags.paid.track) classes += " tag-free";

  useEffect(() => {
    if (race.tags.winnerNumber !== null) {
      (async () => {
        var res = await fetch(`https://api.gabirmotors.com/driver/${race.tags.winnerNumber}`);
        var data = await res.json();
        setDriver(data[0]);
      })()
    }
  }, [])

  return (
    <tr className={classes}>
      <td className="uk-text-bold">
        <span className="uk-text-emphasis">{race.date}</span>{" "}
        {time > race.timestamp + 25200 ? (
          <i className="uk-text-muted">COMPLETED</i>
        ) : (
          ""
        )}
      </td>
      <td className="uk-text-emphasis">
        {race.tags.paid.track ? <b style={{ color: "#35fc6a" }}>$</b> : ""}{" "}
        {race.track}
      </td>
      <td>
        {race.car.length ? (
          <span className="uk-text-emphasis">
            {race.car.map((car, i) =>
              race.tags.paid.car.length &&
              race.tags.paid.car.includes(String(i + 1)) ? (
                <>
                  {" "}
                  <b style={{ color: "#35fc6a" }}>$</b>{" "}
                  <span>
                    {race.car[i] + (i < race.car.length - 1 ? "," : "")}
                  </span>{" "}
                </>
              ) : (
                "" + race.car[i] + (i < race.car.length - 1 ? "," : "")
              )
            )}
          </span>
        ) : (
          <i className="uk-text-muted">N/A</i>
        )}
      </td>
      <td className="uk-text-emphasis">
        {race.tags.notes != null ? (
          <span className="uk-text-emphasis">
            <span className="uk-hidden@m uk-text-uppercase uk-text-bolder">
              Notes:
            </span>{" "}
            {race.tags.notes}
          </span>
        ) : (
          <i className="uk-text-muted">No notes for this race</i>
        )}
      </td>
      <td className="uk-text-success">
        {race.tags.winner != null ? (
          /* uk-tooltip = {`Team - Jabir Motors <br />#10`} */
          <div className="uk-inline">
            <button className="uk-button uk-button-text" type="button">
              <span className="uk-text-success">
                <span className="uk-hidden@m uk-text-uppercase uk-text-bolder"> Winner: {" "} </span> {" "} {race.tags.winner}
              </span> 
            </button>
            <div uk-dropdown = "pos: left-left; animation: uk-animation-slide-left-medium; duration: 100">
              <Link to = {`/teams${driver?.team?.abbr !== "LWP" ? '/'+driver?.team?.abbr : ''}?from=calendar`}><img alt = {`${driver?.team?.name} logo`} className = "standings-logo" src = {`https://i.gabirmotors.com/assets/teams/${driver?.team?.abbr}/main.png`} /></Link> 
              <br /> 
              #{driver?.car_number} {driver?.name} {driver?.username ? `(${driver.username})` : ''}
            </div>
          </div>
        ) : (
          <i className="uk-text-muted">N/A</i>
        )}
      </td>
      <td>
        {race.tags.theme != null ? (
          <span className="uk-text-warning">
            <span className="uk-hidden@m uk-text-uppercase uk-text-bolder">
              Theme:{" "}
            </span>{" "}
            {race.tags.theme}
          </span>
        ) : (
          <i className="uk-text-muted">N/A</i>
        )}
      </td>
    </tr>
  );
};

export default Race;
