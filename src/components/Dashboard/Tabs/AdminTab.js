import React from 'react'
import { Editor } from '@tinymce/tinymce-react'; 

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
                {/*<a className = "uk-button uk-button-primary" onClick = {this.onUpdateClick }>Update Calendar</a>*/}
                <Editor
                apiKey = "0jj3axsp6yhal94rsxhqe73vybc5jmeev7xr6iwn6f8wd0j5"
                    initialValue=""
                    init={{
                    height: 500,
                    menubar: false,
                    skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
                    content_css: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'),
                    plugins: [
                        'advlist autolink lists link image', 
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                        'undo redo | styleselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help '
                    }}
                    onChange={this.handleEditorChange}
                />
            </div>
        )
    }
}

export default AdminTab
