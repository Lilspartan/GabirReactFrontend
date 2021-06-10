import React from 'react'

const RightTab = (props:any) => {
    const info = props.children;

    return (
        <div id={props.id} uk-offcanvas="flip: true; overlay: true">
            <div className="uk-offcanvas-bar">
                <div uk-sticky = "true" uk-scrollspy="cls: uk-animation-slide-right; target: .what-is-page; delay: 250; repeat: true">
                    {/* eslint-disable-next-line */}
                    <a id = "info-button" uk-tooltip = "Link" className="what-is-page uk-margin-small-right uk-position-top-right" onClick = {function() {
                        props.location.push("#test")
                    }}><span className = "icon-button" uk-icon = "icon:link; ratio: 1.4" style = {{ color: 'white', margin: '10px' }}></span></a>
                </div>
                {info}

            </div>

        </div>
    )
}

export default RightTab
