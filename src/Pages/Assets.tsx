import React from 'react'
import { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom'
import Alert from '../Components/Alert/index'
import { 
    GetFile,
    GetFolder
} from '../interfaces';
import Blank from '../Templates/Blank/index';

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

    useEffect(() => {
        const fetchAssets = async () => {
            const res = await fetch(`https://i.gabirmotors.com/assetsList`)
            const data = await res.json()
            
            console.log(data)
    
            return setAssets(data);
        }

        fetchAssets();
    }, [])

    const Image = ({ name, path, ext, size }:FileTypes) => {
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

    // Stop looking through my code >:|

    return (
        <>
            <Blank title="Assets" loading={false}>
                <div className="uk-width-2-3@m uk-text-center uk-margin-auto uk-container" uk-filter="target: .assets-filter; animation: fade">
                    <div style = {{ marginTop: "5vh" }}>
                        <ul className="uk-subnav uk-subnav-pill">
                            <li uk-filter-control=".tag-all"><a href="#All">All</a></li>
                            <li>
                                <a href = "#Teams">Teams</a>
                                <div uk-dropdown="mode: click; pos: bottom-justify">
                                    <ul className="uk-list uk-subnav uk-subnav-pill">
                                        <li uk-filter-control=".tag-teams"><a href="#ALL">All Teams</a></li>
                                        <li uk-filter-control=".tag-GM"><a href="#GM">GM</a></li>
                                        <li uk-filter-control=".tag-ASS"><a href="#ASS">ASS</a></li>
                                        <li uk-filter-control=".tag-JM"><a href="#JM">JM</a></li>
                                        <li uk-filter-control=".tag-SENDIT"><a href="#SENDIT">SENDIT</a></li>
                                        <li uk-filter-control=".tag-HMA"><a href="#HMA">HMA</a></li>
                                        <li uk-filter-control=".tag-LWP"><a href="#LWP">LWP</a></li>
                                        <li uk-filter-control=".tag-FWC"><a href="#FWC">FWC</a></li>
                                        <li uk-filter-control=".tag-CT"><a href="#CT">CT</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li uk-filter-control=".tag-endurance"><a href="#Endurance">Endurance Racing</a></li>
                            <li uk-filter-control=".tag-league"><a href="#League">League</a></li>
                            <li uk-filter-control=".tag-characters"><a href="#Characters">Characters</a></li>
                            <li uk-filter-control=".tag-inverted"><a href="#Inverted">Inverted</a></li>
                            <li uk-filter-control=".tag-other"><a href="#Other">Other</a></li>
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
            </Blank>
        </>
    )
}

export default withRouter(Assets)
