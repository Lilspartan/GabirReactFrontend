import { Link } from 'react-router-dom'
import { useState } from 'react'
import Red from './Redirect'

const LoginForm = ({ initError, onLogIn, onError }) => {
    const [usernameType, setUsernameType] = useState('')
    const [passwordType, setPasswordType] = useState('')

    const handleSubmit = async (event) => {
        try {
            const fetchUser = async() => {
                const body = {
                    name: event.target.name.value,
                    password: event.target.password.value
                }

                if (!body.name || !body.password) {
                    if (!body.name) setUsernameType('danger');
                    if (!body.password) setPasswordType('danger');
                    return onError('Please Fill In All Fields');
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

    var userClasses = `uk-input uk-form-large uk-form-${usernameType}`
    var passClasses = `uk-input uk-form-large uk-form-${passwordType}`

    return (
        <form onSubmit={handleSubmit}>
            <div className="uk-margin">
                <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input className={userClasses} name = "name" type="text"/>
                </div>
            </div>
            <div className="uk-margin">
                <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input className={passClasses} name = "password" type="password"/>	
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