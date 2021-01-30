const Race = ({ race }) => {
    var time = Date.now();
    time = time.toString().slice(0, -3);
    return (
        <div>
            <div className={`uk-card uk-card-${time > race.timestamp + 25200 ? 'secondary' : 'secondary'} uk-card-body`}>
                <h3 className="uk-margin-small uk-card-title">{ race.date }</h3>
                <h5 className = "uk-margin-small uk-text-danger">{time > race.timestamp + 25200 ? '(COMPLETED)' : ''}</h5>
                <h4 className = "uk-margin-small">{`${race.track} ${race.car != null ? '- ' + race.car : ''}`}</h4>
                <h5 className = "uk-margin-small uk-text-warning">{race.tags.notes != null ? 'NOTES: ' + race.tags.notes : ''}</h5>
                <h5 className = "uk-margin-small uk-text-success">{race.tags.winner != null ? 'Winner: ' + race.tags.winner : ''}</h5>
                <h5 className = "uk-margin-small uk-text-primary">{race.tags.theme != null ? 'Theme: ' + race.tags.theme : ''}</h5>
            </div>
        </div>
    )
  }
  
  export default Race