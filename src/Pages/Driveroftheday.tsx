import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from "axios";

type Props = {
    initError: any;
    formData: any;
    onLogIn: any;
}

type Driver = {
    Username:  string;
    CarNumber: string
    UserID:    number;
    votes:     number;
    id:        string;
}

const Driveroftheday = ({ initError, formData, onLogIn }: Props) => {
    const [error, setError] = useState('')
    const [drivers, setDrivers] = useState<Driver[]>([])
    const [dotd_voted, setvoted] = useState<Driver>(JSON.parse(localStorage.dotd_voted_last || "{}"));

    if (localStorage.getItem('dotd_voted_last_time')) {
        if (Date.now() - Number(localStorage.getItem('dotd_voted_last_time')) >= 3000) {
            localStorage.removeItem('dotd_voted_last_time');
            localStorage.removeItem('dotd_voted_last');
        }
    }

    const [chosenDriver, setChosenDriver] = useState<Driver>()

    useEffect(() => {
        (async() => {
            var res = await fetch('https://streaming.gabirmotors.com/dotd');
            const data:Driver[] = await res.json()
            setDrivers(data)
        })()
    }, [])

    const onChange = (e:any) => {
        console.log(e)
        if (!localStorage.getItem('dotd_voted_last')) {
            setChosenDriver(drivers[e.target.value])
        }
    }

    const onSubmit = () => {
        if (chosenDriver !== undefined && chosenDriver.id !== undefined) {
            if (!localStorage.getItem('dotd_voted_last')) {
                axios
                    .post('https://streaming.gabirmotors.com/dotd/vote', { id: chosenDriver.id })
                    .then(res => {
                        localStorage.setItem('dotd_voted_last', JSON.stringify(chosenDriver));
                        localStorage.setItem('dotd_voted_last_time', String(Date.now()));
                        window.location.reload();
                    })
                    .catch(e => {
                        alert('There was an error, try again later!')
                        console.log(e)
                    })
            }
        }
    }

    return (
        <>
            <Header title = "Gabir Motors | Driver of the Day" />
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>

                <div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container">
                    <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large">
                        <Link to="/" className="uk-card-title uk-text-center">
                            <img src = "img/logo.png" alt = "GM logo" style = {{width: '10vw', height: 'auto', minWidth: '200px', }}/>
                        </Link>
                        {
                            !localStorage.getItem('dotd_voted_last') && (
                                <>
                                    <h1>Driver of the Day Vote</h1>
                                    <div className="uk-margin">
                                        <div uk-form-custom="target: > * > span:first-child">
                                            <select onChange = {onChange}>
                                                <option value="">Please select...</option>
                                                
                                                {drivers.map((d, i) => (
                                                    <>
                                                        <option key = {i} value={i}>#{d.CarNumber} {d.Username}</option>
                                                    </>
                                                ))}
                                            </select>
                                            <button className="uk-button uk-button-default" type="button">
                                                <span></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className = "uk-margin">
                                        <a className = "uk-text-success" onClick = {onSubmit}>Submit Vote</a>
                                    </div>
                                </>
                            )
                        }

                        {
                            localStorage.getItem('dotd_voted_last') && (
                                <>
                                    <h2>You Have Already Voted For:</h2>
                                    <h3>#{dotd_voted.CarNumber} {dotd_voted.Username}</h3>
                                </> 
                            )
                        }
                        
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Driveroftheday