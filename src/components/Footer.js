import React from 'react'

const Footer = () => {
    var d = new Date();
    return (
        <div className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m" uk-grid uk-scrollspy="cls: uk-animation-slide-bottom; target: .fade-p1; delay: 500; repeat: true">
            <div>
                <h4 className="fade-p1" uk-parallax="blur: 7;">{`Gabir Motors • ${d.getFullYear()}`}</h4>
            </div>
        </div>
    )
}

export default Footer
