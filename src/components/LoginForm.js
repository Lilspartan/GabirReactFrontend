import { Link } from 'react-router-dom'
import React from 'react'

const LoginForm = ({ initError, onLogIn, onError }) => {
    
    const handleSubmit = async (event) => {
        try {
            const fetchUser = async() => {
                const body = {
                    name: event.target.name.value,
                    password: event.target.password.value
                }

                if (!body.name || ! body.password) {
                    return onError('Please Fill In All Fields')
                }

                const res = await fetch(`https://api.gabirmotors.ga/auth`, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },
                })
                
                const data = await res.json()

                //console.log(data)

                switch (data.message) {
                    case 'INCORRECT_USERNAME_OR_PASSWORD':
                        //console.log('i')
                        onError('Incorrect Username or Password')
                        event.target.name.value = data.data.name
                        return event.target.password.value = ''
                    case 'SUCCESSFUL_AUTHENTICATION':
                        var userD = data.user
                        return onLogIn({ ...userD, auth_token: data['auth_token'] }, true)
                }
            }
            fetchUser();
            
        } catch (e) {
            console.log(e)
            alert(e)
        }
        event.preventDefault();
    }
        
    return (
        <form onSubmit={handleSubmit}>
            <div className="uk-margin">
                <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input className="uk-input uk-form-large" name = "name" type="text"/>
                </div>
            </div>
            <div className="uk-margin">
                <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input className="uk-input uk-form-large" name = "password" type="password"/>	
                </div>
            </div>
            <div className="uk-margin">
                <button className="uk-button uk-button-primary uk-button-large uk-width-1-1">Login</button>
            </div>
            <div className="uk-text-small uk-text-center">
                <Link to = "/signup" className = "uk-button uk-button-text">Create an account</Link>
            </div>
        </form>
    )
}

export default LoginForm;