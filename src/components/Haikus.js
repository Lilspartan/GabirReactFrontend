import Haiku from './Haiku'

const Haikus = ({ haikus }) => {
  return (
    <>
      {haikus.map((haiku, index) => (
        <Haiku key={index} haiku={haiku} />
      ))}
    </>
  )
}

export default Haikus