import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai';

const InfoTab = (props) => {
    const info = props.children;

    return (
        <>
            <div uk-sticky = "true" uk-scrollspy="cls: uk-animation-slide-right; target: .what-is-page; delay: 250; repeat: true">
                {/* eslint-disable-next-line */}
                <a uk-tooltip = "What is this page?" className="what-is-page uk-margin-small-right uk-position-top-right"uk-toggle="target: #info" href = "#"><AiOutlineInfoCircle style ={{ color: 'white', fontSize: '30px', margin: '10px' }}/></a>
            </div>
            <div id="info" uk-offcanvas="flip: true; overlay: true;"> 
                <div class="uk-offcanvas-bar">
                    {info}
                </div>
            </div>
        </>
    )
}

export default InfoTab
