/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Header from "../../Header";
import { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom'
import InfoTab from '../../InfoTab'

const TeamsPage = () => {
    const [assets, setAssets] = useState({children: []});
    const [showSize, setShowSize] = useState(false);

    useEffect(async () => {
        const res = await fetch(`https://i.gabirmotors.ga/assetsList`)
        const data = await res.json()
        
        console.log(data)

        return setAssets(data);
    }, [])

    const File = ({ name, size, path, fileSize, ext }) => {
        const imgExt = [".jpg", ".png"];
        const txtExt = [".txt", ".json", ".md"];
        const webExt = [".html"];
        const pdfExt = [".pdf"];
        let displayIcon = "file";
        if (imgExt.includes(ext)) {
            displayIcon = "image";
        } else if (txtExt.includes(ext)) {
            displayIcon = "file-text"
        } else if (webExt.includes(ext)) {
            displayIcon = "desktop"
        } else if (pdfExt.includes(ext)) {
            displayIcon = "file-pdf"
        }  
        return (
            <div uk-lightbox = "true">
                <li className = "uk-active">
                    <a data-caption= {`${name} | ${((fileSize / 1000) / 1000).toFixed(2)}MB`} className = "uk-text-left uk-link" href={`https://i.gabirmotors.ga${path.replace("public", "")}`} target = "_blank" style = {{ paddingLeft: `${size * 20}px`, fontSize: '24px' }}><span uk-icon={displayIcon}></span> {name} {showSize && <span className = "uk-text-muted">| {((fileSize / 1000) / 1000).toFixed(2)}MB</span>}</a>
                </li>
            </div>
        )
    }

    const Folder = ({ name, children, size }) => {
        return (
            <li className="uk-parent uk-active">
                <a className = "uk-text-left" href="#" style = {{ paddingLeft: `${size * 20}px` }}><span uk-icon="folder"></span> {name}</a>
                <ul className="uk-nav-primary uk-nav-parent-icon" uk-nav = "true">
                        { children.map((child, i) => (
                            <>
                                {child?.children ? <Folder name = {child.name} children = {child.children} size = {Number(size) + 1}/> : <File name = {child.name} size = {Number(size) + 1} path = {child.path} ext = {child.extension} fileSize = {child.size} />}
                            </>
                        ))}
                </ul>
            </li>
        )
    }

    return (
        <>
            <Header
                title={`Gabir Motors | Assets`}
            />
            
            <InfoTab>
                <h2>PA League Assets</h2>
                
            </InfoTab>

            <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh' }}>
                
                <div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-container uk-position-center">
                    <div className="uk-animation-slide-top-medium uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large">
                        <a href = "#" onClick = {() => { setShowSize(!showSize) }} className = "uk-button uk-button-text">Toggle File Sizes</a>
                        <ul className="uk-nav-primary uk-nav-parent-icon assets-nav" uk-nav = "true">
                            { assets.children.map((child, i) => (
                                <>
                                    {child?.children ? <Folder name = {child.name} children = {child.children} size = {0}/> : <File name = {child.name} size = {0} path = {child.path} ext = {child.extension} fileSize = {child.size} />}
                                </>
                            ))}
                        </ul>
                    </div>
                </div>        
            </div>

        </>
    )
}

export default withRouter(TeamsPage)