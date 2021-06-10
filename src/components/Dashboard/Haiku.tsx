import { BsPencil, BsTrash } from 'react-icons/bs';
import { Haiku as HaikuTypes} from '../../interfaces';

type Props = {
  haiku: HaikuTypes;
  onDelete: Function;
}

const Haiku = ({ haiku, onDelete }:Props) => {
  /* eslint-disable-next-line */
  const id = Math.floor(Math.random() * 100000);
    
  return (
    <tr>
      <td>{haiku.haikuLines[0]}...</td>
      <td>
        <BsPencil 
          className = " uk-text-disabled" 
          style = {{ cursor: 'pointer' }} 
          uk-tooltip="Edit haiku (Currently Disabled)"
        />
      </td>
      <td>
        <BsTrash 
          className = "uk-text-danger" 
          style = {{ cursor: 'pointer' }} 
          uk-tooltip = "Delete Haiku"
          onClick = {() => {
            onDelete(haiku);
          }} 
        />
      </td>
    </tr>
  )
}

export default Haiku