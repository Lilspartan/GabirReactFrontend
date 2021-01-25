import { Link, Redirect  } from 'react-router-dom'

function Redi ({ path, evaluate }) {
    function Truthy({ path }) {
        return <Redirect to = {{pathname: path}} />
    }

    function Falsy() {
        return <></>
    }

    if (evaluate) {
      return <Truthy />
    } else {
      return <Falsy />
    }
}

export default Redi;
