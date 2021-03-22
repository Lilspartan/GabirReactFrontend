import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import { useState } from 'react'
import Header from '../../Header'
import Footer from '../../Footer'

const MainBody = ({ initError, formData, onLogIn }) => {
    const [error, setError] = useState('')

    return (
        <>
            <Header title = "Gabir Motors | Login" />
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>

                <div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container">
                    <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large">
                        <Link to="/" className="uk-card-title uk-text-center">
                            <img src = "img/logo.png" alt = "GM logo" style = {{width: '10vw', height: 'auto', minWidth: '200px'}}/>
                        </Link>
                        <h5 className = "uk-text-danger">{ error }</h5>
                        <LoginForm onLogIn = {onLogIn} onError = {setError}/>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default MainBody