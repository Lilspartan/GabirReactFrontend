import Haiku from './Haiku'

const Haikus = ({ haikus }) => {
  return (
    <>
      <div className="uk-child-width-expand@s uk-text-center uk-grid-match" uk-grid>
        {haikus.map((h, index) => (
          <Haiku key={index} haiku={h} />
        ))}
      </div>
    </>
  )
}

export default Haikus