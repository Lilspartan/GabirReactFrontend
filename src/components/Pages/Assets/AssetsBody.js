import React from 'react'
import Header from "../../Header";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

const TeamsPage = () => {
    return (
        <>
            <Header
                title={`Gabir Motors | Teams`}
            />

            <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', height: '150vh' }}>
                <div>
                    <div uk-scrollspy="target: > div; cls: uk-animation-slide-top; delay: 100" className="uk-flex-center uk-child-width-1-2@s uk-grid-collapse uk-text-center uk-grid-small" uk-grid = "true" style = {{ height: '100vh'}}>
                        
                    </div>
                </div>
                <div className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .fade-p1; delay: 500; repeat: true">
                    <div>
                        {/* <h4 className="fade-p1">{`Gabir Motors • ${d.getFullYear()}`}</h4> */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default TeamsPage
