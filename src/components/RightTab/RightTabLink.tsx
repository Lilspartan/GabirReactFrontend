import qs from 'qs';
import { withRouter } from 'react-router-dom';

const RightTabLink = (props:any) => {
    const { id, target, type }:any = props;
    setTimeout(function() {
        if (qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#${target}`] !== undefined) {
            (document.getElementById("menuopen") as HTMLInputElement)!.click();
            (document.getElementById(id) as HTMLInputElement)!.click();
        }
    }, 100)

    return (
        <a id = { id } href = { `#${target}` } uk-toggle = { `target: #${target}` } className = { `uk-text-${ type }` }>{ props.children }</a>
    )
}

export default withRouter(RightTabLink);
