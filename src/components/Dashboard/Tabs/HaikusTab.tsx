import Haiku from '../Haiku'
import { Haiku as HaikuTypes } from '../../../interfaces';

type HaikuTabProps = {
  haikus: HaikuTypes[];
  setHaikus: Function;
}

const HaikusTab = ({ haikus, setHaikus }: HaikuTabProps) => {
  const onDeleteHaiku = (haiku: HaikuTypes) => {
    if (window.confirm(`Are you sure you want to delete this haiku? \n_______________________\n${haiku.haikuLines[0]}\n${haiku.haikuLines[1]}\n${haiku.haikuLines[2]}\n- ${haiku.name}`)) {
      fetch(`https://api.gabirmotors.com/haikus/${haiku.url}/delete`).then(res => {
        setHaikus(haikus.filter((h) => h.url !== haiku.url))
        console.log("success")
      }).catch(e => {
        console.log(e)
      })
    } else {
      console.log("Not Deleting")
    }
  }

  return (
    <table className = "uk-table uk-table-small">
      <tbody>
        {haikus.map((h, index) => (
          <Haiku key={index} haiku={h} onDelete = {onDeleteHaiku} />
        ))}
      </tbody>
    </table>
  )
}

export default HaikusTab