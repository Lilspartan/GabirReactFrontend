import React from 'react'

const AdminTab = () => {
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

    return (
        <div>
            <a className = "uk-button uk-button-primary" onClick = {onUpdateClick }>Update Calendar</a>
        </div>
    )
}

export default AdminTab
