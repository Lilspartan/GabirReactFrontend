import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
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

    /*  
        This is the only code I have properly commented and it makes me happy, if you see this I 
        want you to know that 
                                        - Gabe

        Steps:
        
        1. Check to see if vote is currently active
        2. Check if the user is logged in, if yes skip to step 4
        3. Display Twitch Sign In button
        4. Check if the user has already voted, if yes skip to step 6
        5. Display the driver that the user voted for
        6. Display the vote form

        Possible Display States:

        CHECKING - Getting the state
        NO_VOTING_REDIRECT - vote is not active, redirect to main page
        NOT_LOGGED_IN - Display the twitch log in button
        ALREADY_VOTED - Display the previous voted
        HAS_NOT_VOTED - Display the form
    */

    // List of drivers that can be voted for 
    const [drivers, setDrivers] = useState<Driver[]>([])

    // The driver the user has already voted for or undefined
    const [voted, setVoted] = useState<Driver>()

    // The twitch user with email to ensure no duplicate votes, and picture to display the user
    const [twitchUser, setTwitchUser] = useState<User>({ email: "", picture: "" });

    // Save the display state
    const [displayState, setDisplayState] = useState("CHECKING")

    // The driver the user has voted for
    const [chosenDriver, setChosenDriver] = useState<Driver>()

    // The users's token to get user info
    var token = (qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#access_token`])

    useEffect(() => {
        (async() => {
            // STEP 1: Check if the vote is active
            var checkResponse = await fetch('https://streaming.gabirmotors.com/dodotd');
            var d = await checkResponse.json();
    
            if (checkResponse.status === 200) {
                if (!d.do) {
                    // If the vote is not active, go to the main page
                    setDisplayState("NO_VOTING_REDIRECT")
                    props.history.push("/");
                } else {
                    // STEP 2: Check if the user is logged in
                    if (!token) {
                        // Not Logged In
                        setDisplayState("NOT_LOGGED_IN")
                    } else {
                        // Logged In
                        var userRes = await fetch('https://id.twitch.tv/oauth2/userinfo', {
                            headers: new Headers({
                                "Authorization": `Bearer ${token}`
                            })
                        })
                        var userData:User = await userRes.json()
                        if (userRes.status !== 200) {
                            // Invalid token
                            setDisplayState("NOT_LOGGED_IN")
                        }
                        await setTwitchUser(userData)
                    }
                }
            }

            var res = await fetch('https://streaming.gabirmotors.com/dotd');
            const data:Driver[] = await res.json()
            setDrivers(data)
        })()
    }, [token, props.history])

    useEffect(() => {
        // STEP 4: Check if the user has already voted
        if (token) {
            axios
            .post('https://streaming.gabirmotors.com/dotd/checkvoted', { email: twitchUser.email })
            .then(res => {
                if (res.data?.message === "ALREADY_VOTED") {
                    setVoted(res.data.data.driver)
                    setDisplayState("ALREADY_VOTED")
                } else {
                    setDisplayState("HAS_NOT_VOTED")
                }
            })
            .catch(e => {
                alert('There was an error, try again later!')
                console.log(e)
            })
        }
    }, [twitchUser, token])

    useEffect(() => {
        console.log(displayState)
    }, [displayState])

    const onChange = (e:any) => {
        setChosenDriver(drivers[e.target.value])
    }

    const onSubmit = () => {
        if (chosenDriver !== undefined && chosenDriver.id !== undefined) {
            axios
                .post('https://streaming.gabirmotors.com/dotd/vote', { id: chosenDriver.id, email: twitchUser.email })
                .then(res => {
                    if (res.data?.message === "ALREADY_VOTED") {
                        console.log(res.data)
                        setVoted(res.data.data.driver)
                    } else {
                        setDisplayState("ALREADY_VOTED");
                        setVoted(chosenDriver)
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
                        {displayState === "NOT_LOGGED_IN" && (
                            <>
                                <h1>Sign in to vote</h1>
                                <div className="uk-margin">
                                    <a href='https://id.twitch.tv/oauth2/authorize?client_id=6gfpjegdkmcmepffbvh4vfp8s9vd13&redirect_uri=https://gabirmotors.com/vote&response_type=token+id_token&scope=user:read:email+openid&claims={ "id_token": { "email": null, "email_verified": null }, "userinfo": { "picture": null, "email": null } }' className = "uk-button uk-button-primary" style = {{ backgroundColor: '#6441a5', color: 'white' }}>Sign in with <span uk-icon = "icon:twitch; ratio: 1.4"></span></a>
                                </div>
                            </>
                        )}
                        
                        {(displayState === "ALREADY_VOTED" || displayState === "HAS_NOT_VOTED") && (
                            <>
                                <Link to="/" className="uk-card-title uk-text-center">
                                    <img src = "img/logo.png" alt = "GM logo" style = {{width: '10vw', height: 'auto', minWidth: '200px', }}/>
                                </Link>
                                <h3 className = "acumin"><img src={twitchUser.picture} alt = {twitchUser.email} style = {{ width: '5vw'}}/></h3>
                            </> 
                        )}


                        {
                            (displayState === "HAS_NOT_VOTED") && (
                                <>
                                    <h1>Livery Parade Vote</h1>
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
                                        <a className = "uk-text-success" onClick = {onSubmit} href = "#submit">Submit Vote</a>
                                    </div>
                                </>
                            )
                        }

                        {
                            (displayState === "ALREADY_VOTED") && (
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