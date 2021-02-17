import Haiku from './Haiku'

const Haikus = ({ haikus }) => {
  return (
    <ul uk-accordion>
      {haikus.map((h, index) => (
        <Haiku key={index} haiku={h} />
      ))}
    </ul>
  )
}

export default Haikus