import { BsCheck } from 'react-icons/bs'

const Race = ({ race }) => {
    var time = Date.now();
    time = time.toString().slice(0, -3);
    return (
        <tr>
            <td className = "uk-text-bold"><span className = "uk-text-emphasis">{ race.date }</span> {time > race.timestamp + 25200 ? <BsCheck style = {{ color: 'green', fontSize: '24px' }} /> : ''}</td>
            <td className = "uk-text-emphasis">{ race.track }</td>
            <td>{ race.car != null ? <span className = "uk-text-emphasis">{ race.car }</span> : <i className = "uk-text-muted">N/A</i> }</td>
            <td className = "uk-text-emphasis">{race.tags.notes != null ? <span className = "uk-text-emphasis"><span className = "uk-hidden@m uk-text-uppercase uk-text-bolder">Notes:</span> { race.tags.notes }</span> : <i className = "uk-text-muted">No notes for this race</i>}</td>
            <td className = "uk-text-success">{race.tags.winner != null ? <span className = "uk-text-success"><span className = "uk-hidden@m uk-text-uppercase uk-text-bolder">Winner: </span> { race.tags.winner }</span> : <i className = "uk-text-muted">N/A</i>}</td>
            <td>{race.tags.theme != null ? <span className = "uk-text-warning"><span className = "uk-hidden@m uk-text-uppercase uk-text-bolder">Theme: </span> { race.tags.theme }</span> : <i className = "uk-text-muted">N/A</i>}</td>
        </tr>
    )
  }
  
  export default Race