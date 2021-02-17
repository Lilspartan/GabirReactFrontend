import { BsPencil, BsTrash } from 'react-icons/bs';

const Haiku = ({ haiku, onDelete }) => {
  const id = Math.floor(Math.random() * 100000);
  const toggleId = `#${id}`;
    
  return (
    <tr>
      <td>{haiku.haikuLines[0]}...</td>
      <td><BsPencil className = "uk-text-success" /></td>
      <td>
        <BsTrash 
          className = "uk-text-danger" 
          style = {{ cursor: 'pointer' }} 
          onClick = {() => {
            onDelete(haiku);
          }} 
        />
      </td>
    </tr>
  )
}

export default Haiku