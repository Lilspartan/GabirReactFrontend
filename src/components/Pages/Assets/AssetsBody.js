import React from 'react'
import Header from "../../Header";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Footer from '../../Footer'

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
                <Footer />
            </div>

        </>
    )
}

export default TeamsPage
