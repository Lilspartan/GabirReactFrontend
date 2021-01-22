import Race from './Race'

const Calendar = ({ calendar }) => {
  return (
    <>
        <div className="uk-child-width-expand@s uk-text-center" uk-grid>
            {calendar.sort((a, b) => { return a.timestamp - b.timestamp }).map((race, index) => (
                <Race key={index} race={race} />
            ))}
        </div>
    </>
  )
}

export default Calendar