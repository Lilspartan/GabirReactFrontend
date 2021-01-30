const Haiku = ({ haiku }) => {
  return (
    <div className="uk-card uk-card-secondary uk-card-body uk-margin-top">
      
      <p>{haiku.haikuLines[0]}</p>
      <p>{haiku.haikuLines[1]}</p>
      <p>{haiku.haikuLines[2]}</p>
      <br />
      <p>- {haiku.name}</p>
    </div>
  )
}

export default Haiku