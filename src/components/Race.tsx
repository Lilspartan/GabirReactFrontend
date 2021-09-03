import { Race as RaceTypes, Driver } from '../interfaces';
import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

interface Props {
  race: RaceTypes;
}

const Race:FC<Props> = ({ race }) => {
  // The Driver Object of the winner, or null if no number is provided
  const [driver, setDriver] = useState<Driver | null>(null);

  // Get the current time, this is to determine which races are completed
  var time = Date.now();
  // Change to seconds instead of milliseconds
  time = Number(time.toString().slice(0, -3));

  // Add tags to each race, will be used for filtering in the future
  var classes = "uk-text-large tag-race";
  race.tags.tags.forEach((tag) => {
    classes += ` tag-${tag.trim()}`;
  });

  if (time < race.timestamp + 25200) classes += " tag-uncomplete";
  if (!race.tags.paid.car.length && !race.tags.paid.track) classes += " tag-free";

  useEffect(() => {
    // Check if a car number is provided, if so then fetch the driver object
    if (race.tags.winnerNumber !== null) {
      (async () => {
        var res = await fetch(`https://api.gabirmotors.com/driver/${race.tags.winnerNumber}`);
        var data = await res.json();
        setDriver(data[0]);
      })()
    } else {
      setDriver({
        "car_number": "N/A",
        "name": race.tags.winner ? race.tags.winner : "N/A",
      })
    }
  }, [race.tags.winner, race.tags.winnerNumber])

  const DateSlot = () => {
    return (
      <td className="uk-text-bold">
        <span className="uk-text-emphasis">{race.date}</span>{" "}
        {time > race.timestamp + 25200 ? (
          <i className="uk-text-muted">COMPLETED</i>
        ) : (
          ""
        )}
      </td>
    )
  }

  const TrackSlot = () => {
    return (
      <td className="uk-text-emphasis">
        {race.tags.paid.track ? <b style={{ color: "#35fc6a" }}>$</b> : ""}{" "}
        {race.track}
      </td>
    )
  }

  const CarSlot = () => {
    return (
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
    )
  } 

  const NoteSlot = () => {
    return (
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
    )
  }

  const WinnerSlot = () => {
    return (
      <td className="uk-text-success">
        {race.tags.winner != null ? (
          /* uk-tooltip = {`Team - Jabir Motors <br />#10`} */
          <div className="uk-inline">
            <button className="uk-button uk-button-text" type="button">
              <span className="uk-text-success">
                <span className="uk-hidden@m uk-text-uppercase uk-text-bolder"> Winner: {" "} </span> {" "} {race.tags.winner}
              </span> 
            </button>
            {race.tags.winnerNumber != null && (
              <div uk-dropdown = "pos: top-center">
                <Link to = {`/teams${driver?.team?.abbr !== "LWP" ? '/'+driver?.team?.abbr : ''}?from=calendar`}><img alt = {`${driver?.team?.name} logo`} className = "standings-logo" src = {`https://i.gabirmotors.com/assets/teams/${driver?.team?.abbr}/main.png`} /></Link> 
                <br /> 
                #{driver?.car_number} {driver?.name} {driver?.username ? `(${driver.username})` : ''}
              </div>
            )} 
          </div>
        ) : (
          <i className="uk-text-muted">N/A</i>
        )}
      </td>
    )
  }

  const ThemeSlot = () => {
    return (
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
    )
  }

  return (
    <tr className={classes}>
      <DateSlot />
      <TrackSlot />
      <CarSlot />
      <NoteSlot />
      <WinnerSlot />
      <ThemeSlot />
    </tr>
  );
};

export default Race;