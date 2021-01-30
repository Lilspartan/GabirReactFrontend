import Haiku from './Haiku'

const Haikus = ({ haikus }) => {
  return (
    <>
      {haikus.map((h, index) => (
        <Haiku key={index} haiku={h} />
      ))}
    </>
  )
}

export default Haikus