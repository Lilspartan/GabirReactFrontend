const Haiku = ({ haiku }) => {
  return (
    <pre>
      <h3>
        {haiku.haikuLines.join("\n")}
      </h3>
      <p>- {haiku.name}</p>
      <br />
    </pre>
  )
}

export default Haiku