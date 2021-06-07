/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useRef, useState } from "react";
import axios from 'axios';

const AdminTab = () => {
    const [unchecked, setUnchecked] = useState([]);

    const onUpdateClick = () => {
        fetch(`https://api.gabirmotors.ga/update/calendar`).then(res => {
            if (res.status === 200) {
                alert("Success!");
            } else {
                alert("Error! Try again later");
            }
            
        }).catch(e => {
            alert("An error has occurred");
            console.log(e)
        })
    }
    
    const onGetUnchecked = () => {
        axios.get(`https://i.gabirmotors.ga/manifest/unchecked`).then(res => {
            if (res.status === 200) {
                console.log(res)
                setUnchecked(res.data)
            } else {
                alert("Error! Try again later");
            }
            
        }).catch(e => {
            alert("An error has occurred");
            console.log(e)
        })
    }
    
    const onCheckImage = (image) => {
        console.log("Checking...");
        console.log(image)
        axios.post(`https://i.gabirmotors.ga/check`, {
            toCheck: image
        }).then(res => {
            if (res.status === 200 && res.data.message === "SUCCESS") {
                console.log("Checked!");
                setUnchecked(unchecked.filter(i => i !== image))
            } else {
                alert("Error! Try again later");
            }
            
        }).catch(e => {
            alert("An error has occurred");
            console.log(e)
        })
    } 

    const onBadImage = (image) => {
        console.log("Checking...");
        console.log(image)
        axios.post(`https://i.gabirmotors.ga/bad`, {
            toCheck: image
        }).then(res => {
            if (res.status === 200 && res.data.message === "SUCCESS") {
                console.log("Deleted!");
                setUnchecked(unchecked.filter(i => i !== image))
            } else {
                alert("Error! Try again later");
            }
            
        }).catch(e => {
            alert("An error has occurred");
            console.log(e)
        })
    } 
    
    return (
        <div>
            <a className = "uk-button uk-button-primary" onClick = {onUpdateClick }>Update Calendar</a>
            <br />
            <a className = "uk-button uk-button-primary" onClick = {onGetUnchecked}>Get Unchecked Images</a>
            {
                unchecked.length && (
                    <div className = "uk-display-block">
                        <img src = {unchecked[0].path} style = {{ width: '20vw', height: 'auto'}}/><br />
                        <span>DESC: {unchecked[0].data.description}</span><br />
                        <span>ON: {unchecked[0].data.readableDate}</span><br />
                        <span>BY: {unchecked[0].user.name}</span><br />
                        <div class="uk-button-group">
                            <button class="uk-button uk-button-default" onClick = {() => {onCheckImage(unchecked[0])}}>GOOD</button>
                            <button class="uk-button uk-button-danger" onClick = {() => {onBadImage(unchecked[0])}}>BAD</button>
                        </div>
                    </div>
                )
            }
            {
                !unchecked.length && (
                    <i className = "uk-text-muted">All caught up!</i>
                )
            }
        </div>
    )
}

export default AdminTab
