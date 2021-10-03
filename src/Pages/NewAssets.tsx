/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom'
import Alert from '../components/Alert/index'
import { 
    GetFile,
    GetFolder
} from '../interfaces';

interface FileTypes {
    path:      string;
    name:      string;
    ext:       string;
    size:      number;
}

interface FolderTypes {
    name:      string;
    children:  (GetFile | GetFolder)[];
}

const Assets = () => {
    const [assets, setAssets] = useState({children: []});
    const [showSize, setShowSize] = useState(false);
    const [darkTheme, setDarkTheme] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
            const res = await fetch(`https://i.gabirmotors.com/assetsList`)
            const data = await res.json()
            
            console.log(data)
    
            return setAssets(data);
        }

        fetchAssets();
    }, [])

    const changeTheme = () => { 
        var doChange = window.confirm("Are you sure? The screen will be very bright");
        if (doChange) setDarkTheme(!darkTheme) 
    }

    const Image = ({ name, path, ext, size }:FileTypes) => {
        const imgExt = [".jpg", ".png"];
        let displayIcon = "file/";
        if (imgExt.includes(ext)) {
            displayIcon = "image";
        }
        var tag = path;
        var tags = tag.replace("public/assets/", "").substring(0,tag.replace("public/assets/", "").lastIndexOf('/')).split('/');
        var classes = "tag-all";
        tags.forEach(t => {
            classes += " tag-"+t
        })


        return (
            <div style = {{ marginTop: "20px", padding: "20px" }} className = {classes}>
                <div className="uk-flex uk-flex-center uk-flex-middle">
                    <a href = {`https://i.gabirmotors.com${path.replace('public', '')}`} target = "_new" uk-tooltip={`${name} | ${((size / 1000) / 1000).toFixed(2)}MB`}><img src={`https://i.gabirmotors.com${path.replace('public', '')}`} alt="" style = {{ maxHeight: "150px" }} uk-img = "true"/></a>
                </div>
            </div>
        )
    }

    const Folder = ({ name, children }:FolderTypes) => {
        return  (
            <>
                { children.map((child:GetFile | GetFolder) => {
                    if ("children" in child) {
                        return <Folder name = {child.name} children = {child?.children}/>
                    } else {
                        return <Image name = {child.name} path = {child.path} ext = {child.extension} size = {child.size} />  
                    }
                })}
            </>
        )
    }

    var bg = (darkTheme ? 'gabir_bg.jpg' : 'bg-inverted.png');

    // Stop looking through my code >:|

    return (
        <>
            <Header
                title={`Gabir Motors | Assets`}
            />

            <div uk-sticky = "true" uk-scrollspy="cls: uk-animation-slide-right; target: .toggle-theme; delay: 250; repeat: true">
                {/* eslint-disable-next-line */}
                <a uk-tooltip = "Toggle Theme" className="toggle-theme uk-margin-small-right uk-position-top-right uk-button uk-button-link" href = "#" onClick = {changeTheme} style = {{ color: `${darkTheme ? 'white' : 'black'}` }}>Change to { darkTheme ? 'Light Theme' : 'Dark Theme' }</a>
            </div>

            <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: `url(img/${bg})`, minHeight: '100vh', height: 'auto', paddingBottom: '5vh' }}>
                <Alert id = "newassets" title = "New Assets Page" text = "Welcome to the new Gabir Motors Assets Page! Here you will be able to find images you might want for any of your League based projects. Use the tags at the top to filter the images, and click on any of the images to open it" />
                <Alert id = "freetouse" type = "info" title = "Tip:" text = "All of the assets below are free for you to use on all of your PA League related projects!" />
                
                <div className="uk-width-2-3@m uk-text-center uk-margin-auto uk-container" uk-filter="target: .assets-filter; animation: fade">
                    <div style = {{ marginTop: "5vh" }}>
                        <ul className="uk-subnav uk-subnav-pill">
                            <li uk-filter-control=".tag-all"><a href="#">All</a></li>
                            <li>
                                <a href = "#">Teams</a>
                                <div uk-dropdown="mode: click; pos: bottom-justify">
                                    <ul className="uk-list uk-subnav uk-subnav-pill">
                                        <li uk-filter-control=".tag-teams"><a href="#">All Teams</a></li>
                                        <li uk-filter-control=".tag-GM"><a href="#">GM</a></li>
                                        <li uk-filter-control=".tag-ASS"><a href="#">ASS</a></li>
                                        <li uk-filter-control=".tag-JM"><a href="#">JM</a></li>
                                        <li uk-filter-control=".tag-SENDIT"><a href="#">SENDIT</a></li>
                                        <li uk-filter-control=".tag-HMA"><a href="#">HMA</a></li>
                                        <li uk-filter-control=".tag-LWP"><a href="#">LWP</a></li>
                                        <li uk-filter-control=".tag-FWC"><a href="#">FWC</a></li>
                                        <li uk-filter-control=".tag-CT"><a href="#">CT</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li uk-filter-control=".tag-endurance"><a href="#">Endurance Racing</a></li>
                            <li uk-filter-control=".tag-league"><a href="#">League</a></li>
                            <li uk-filter-control=".tag-characters"><a href="#">Characters</a></li>
                            <li uk-filter-control=".tag-inverted"><a href="#">Inverted</a></li>
                            <li uk-filter-control=".tag-other"><a href="#">Other</a></li>
                        </ul>
                    </div>
                    <div className = "uk-child-width-1-3@s uk-child-width-1-3@m assets-filter" uk-grid="masonry: true; 50">
                        { assets.children.map((child:GetFile | GetFolder) => {
                            if ("children" in child) {
                                return (
                                    <Folder name = {child.name} children = {child?.children}/>
                                )
                            } else {
                                return (
                                    <Image name = {child.name} path = {child.path} ext = {child.extension} size = {child.size} /> 
                                )  
                            }
                        })}
                    </div>
                </div>        
            </div>

        </>
    )
}

export default withRouter(Assets)
