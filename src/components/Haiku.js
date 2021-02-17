const Haiku = ({ haiku }) => {
  return (
    <li>
      <a className = "uk-accordion-title" href = "#">{haiku.haikuLines[0]}...</a>
      <div className = "uk-accordion-content">
        <p>{haiku.haikuLines[1]}</p>
        <p>{haiku.haikuLines[2]}</p>
      </div>
    </li>
  )
}

export default Haiku