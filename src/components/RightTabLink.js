import React from 'react'
import qs from 'qs';
import { withRouter } from 'react-router-dom';

const RightTabLink = (props) => {
    const { id, target, type, children } = props;
    setTimeout(function() {
        if (qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#${target}`] !== undefined) {
            document.getElementById("menuopen").click();
            document.getElementById(id).click();
        }
    }, 100)

    return (
        <a id = { id } href = { `#${target}` } uk-toggle = { `target: #${target}` } className = { `uk-text-${ type }` }>{ props.children }</a>
    )
}

export default withRouter(RightTabLink);
