import Haiku from './Haiku'

const Haikus = ({ haikus, setHaikus }) => {
  const onDeleteHaiku = (haiku) => {
    if (window.confirm(`Are you sure you want to delete this haiku? \n_______________________\n${haiku.haikuLines[0]}\n${haiku.haikuLines[1]}\n${haiku.haikuLines[2]}\n- ${haiku.name}`)) {
      fetch(`https://api.gabirmotors.ga/haikus/${haiku.url}/delete`).then(res => {
        setHaikus(haikus.filter((h) => h.url !== haiku.url))
        console.log("success")
      }).catch(e => {
        console.log(e)
      })
    } else {
      console.log("Ok then")
    }
  }

  return (
    <table className = "uk-table uk-table-divder uk-table-small">
      {haikus.map((h, index) => (
        <Haiku key={index} haiku={h} onDelete = {onDeleteHaiku} />
      ))}
    </table>
  )
}

export default Haikus