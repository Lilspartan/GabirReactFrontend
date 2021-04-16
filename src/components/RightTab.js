import React from 'react'

const RightTab = (props) => {
    const info = props.children;

    return (
        <div id={props.id} uk-offcanvas="flip: true; overlay: true">

            <div class="uk-offcanvas-bar">
                
                {info}

            </div>

        </div>
    )
}

export default RightTab
