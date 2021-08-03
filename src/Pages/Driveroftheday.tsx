import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoadingIcon from '../components/LoadingIcon'
import axios from "axios";
import { withRouter } from 'react-router-dom';
import qs from 'qs';

type Driver = {
    Username:  string;
    CarNumber: string
    UserID:    number;
    votes:     number;
    id:        string;
}

type User = {
    email: string,
    picture: string
}

const Driveroftheday = (props: any) => {
    const [drivers, setDrivers] = useState<Driver[]>([])
    const [sending, setSending] = useState(false)
    const [alreadyVoted, setAlreadyVoted] = useState(false);
    const [voted, setVoted] = useState<Driver>()
    const [twitchUser, setTwitchUser] = useState<User>({
        email: "",
        picture: ""
    });

    var token = (qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#access_token`])

    const [chosenDriver, setChosenDriver] = useState<Driver>()

    useEffect(() => {
        (async() => {
            var res = await fetch('https://streaming.gabirmotors.com/dodotd');
            var d = await res.json();
    
            if (res.status === 200) {
                if (!d.do) {
                    props.history.push("/");
                } else {
                    if (!token) {
                        props.history.push("/auth");
                    } else {
                        var res = await fetch('https://id.twitch.tv/oauth2/userinfo', {
                            headers: new Headers({
                                "Authorization": `Bearer ${token}`
                            })
                        })
                        var userData:User = await res.json()
                        if (res.status !== 200) {
                            props.history.push("/auth");
                        }
                        await setTwitchUser(userData)
                    }
                }
            }

            var res = await fetch('https://streaming.gabirmotors.com/dotd');
            const data:Driver[] = await res.json()
            setDrivers(data)
        })()
    }, [])

    useEffect(() => {
        axios
        .post('https://streaming.gabirmotors.com/dotd/checkvoted', { email: twitchUser.email })
        .then(res => {
            console.log(res.data)
            if (res.data?.message == "ALREADY_VOTED") {
                console.log(res.data)
                setVoted(res.data.data.driver)
                setAlreadyVoted(true);
            }
            
            //window.location.reload();
        })
        .catch(e => {
            alert('There was an error, try again later!')
            console.log(e)
        })
    }, [twitchUser])

    const onChange = (e:any) => {
        setChosenDriver(drivers[e.target.value])
    }

    const onSubmit = () => {
        if (chosenDriver !== undefined && chosenDriver.id !== undefined) {
            axios
                .post('https://streaming.gabirmotors.com/dotd/vote', { id: chosenDriver.id, email: twitchUser.email })
                .then(res => {
                    if (res.data?.message == "ALREADY_VOTED") {
                        console.log(res.data)
                        setVoted(res.data.data.driver)
                        setAlreadyVoted(true);
                    } else {
                        setSending(true)
                        setVoted(chosenDriver)
                        setAlreadyVoted(true);
                        setTimeout(() => {
                            setSending(false);
                        }, 2000)
                    }
                    
                    //window.location.reload();
                })
                .catch(e => {
                    alert('There was an error, try again later!')
                    console.log(e)
                })
        }
    }

    return (
        <>
            <Header title = "Gabir Motors | Driver of the Day" />
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>

                <div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container">
                    <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large">
                        {!sending && (
                            <>
                                <Link to="/" className="uk-card-title uk-text-center">
                                    <img src = "img/logo.png" alt = "GM logo" style = {{width: '10vw', height: 'auto', minWidth: '200px', }}/>
                                </Link>
                                <h3 className = "acumin"><img src={twitchUser.picture} style = {{ width: '5vw'}}/></h3>
                            </> 
                        )}

                        {sending && (
                            <LoadingIcon />
                        )}

                        {
                            (!alreadyVoted && !sending) && (
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
                            (alreadyVoted && !sending) && (
                                <>
                                    <h2>You Have Already Voted For:</h2>
                                    <h3>#{voted?.CarNumber} {voted?.Username}</h3>
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

export default withRouter(Driveroftheday);