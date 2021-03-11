import qs from 'qs';
import { Link, withRouter } from "react-router-dom";

const Race = (props) => {
  const race = props.race
  var time = Date.now();
  time = time.toString().slice(0, -3);

  var classes = "uk-text-large";
  race.tags.tags.forEach((tag) => {
    classes += ` tag-${tag.trim()}`;
  });

  if (qs.parse(props.location.hash, { ignoreQueryPrefix: true })?.highlight == race.timestamp) {
    classes += " highlight-cal-row"
  }

  return (
    <tr className={classes}>
      <td className="uk-text-bold">
        <span className="uk-text-emphasis" id = {race.timestamp}>{race.date}</span>{" "}
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
          <span className="uk-text-success">
            <span className="uk-hidden@m uk-text-uppercase uk-text-bolder"> Winner: {" "} </span> {" "} {race.tags.winner}
          </span> 
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

export default withRouter(Race);
