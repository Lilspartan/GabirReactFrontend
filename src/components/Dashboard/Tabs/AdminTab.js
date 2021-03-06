import React from 'react'

class AdminTab extends React.Component {
    onUpdateClick = () => {
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
    
    handleEditorChange = (e) => {
        console.log(
            'Content was updated:',
            e.target.getContent()
        );
    }
    
    render() {
        return (
            <div>
                {/* eslint-disable-next-line */}
                <a className = "uk-button uk-button-primary" onClick = {this.onUpdateClick }>Update Calendar</a>
            </div>
        )
    }
}

export default AdminTab
