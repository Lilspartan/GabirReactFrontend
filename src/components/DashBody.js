import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Haikus from './Haikus';
import RacerTab from './RacerTab';
import AdminTab from './AdminTab';
import Alert from './Alert';

const DashBody = ({ user, onLogout }) => {
    var d = new Date();

    const [haikus, setHaikus] = useState([
        {
            "__createdtime__": 1611090302995,
            "__updatedtime__": 1611090302995,
            "haikuLines": [
                "Loading your haikus",
                "hopefully you'll see yours soon",
                "hopefully right now"
            ],
            "name": "Loading...",
            "url": "0",
            "uuid": ""
        }
    ])

    useEffect(() => {
        const getHaikus = async () => {
          const haikusFromServer = await fetchHaikus()
          setHaikus(haikusFromServer)
        }

        getHaikus()
    }, [])

    const fetchHaikus = async () => {
        const res = await fetch(`https://api.gabirmotors.ga/user/${user.uuid}/haikus`)
        const data = await res.json()

        return data
    }

    const Racer = () => {
        if (user.roles.includes("racer")) {
            return <li><a href="#">Racer</a></li>
        } else {
            return <li><a href="#"></a></li>
        }
    }

    const Admin = () => {
        if (user.roles.includes("admin")) {
            return <li><a href="#">Admin</a></li>
        } else {
            return <li><a href="#"></a></li>
        }
    }

    const Tabs = () => {
        return (
            <ul className="uk-tab-top" uk-tab="connect: #component-tab-bottom; animation: uk-animation-fade">
                <li><a href="#">User</a></li>
                <li><a href="#">Haikus</a></li>
                <Racer />
                <Admin />
            </ul>
        )
    }

    const ShowRacer = () => {
        if (user.roles.includes("racer")) {
            return <RacerTab user = {user} />
        } else {
            return <li></li>
        }
    }

    const ShowAdmin = () => {
        if (user.roles.includes("admin")) {
            return <AdminTab />
        } else {
            return <li></li>
        }
    }

    return (
        <>
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>
                
                <div className="uk-section uk-section-secondary uk-position-center uk-padding-large">
                
                    <div>
                        <div uk-grid>
                            <div className="uk-width-auto@m">
                                <Tabs /> 
                            </div>
                            <div className="uk-width-expand@m">
                                <ul id="component-tab-bottom" className="uk-switcher">
                                    <li>
                                        <h3 className = "uk-text-center">Hello, {user.name}</h3>
                                        <div>
                                            <h4 className = "uk-text-center">Notifications:</h4>
                                            {
                                                user.alerts.map((alert, i) => (
                                                    <>
                                                        <hr></hr>
                                                        <div class="uk-card uk-card-body uk-card-small" key = {i}>
                                                            <h3 class="uk-card-title">{alert.title}</h3> <span className = "uk-text-muted">Nov. 3</span>
                                                            <p>{alert.bodytext}</p>
                                                        </div>
                                                    </>
                                                ))
                                            }
                                            <a className = "uk-button uk-button-danger uk-align-center" onClick = {() => {
                                                onLogout()
                                            }}>Logout</a>
                                        </div>
                                    </li>
                                    <li>
                                        <Haikus haikus = {haikus} setHaikus = {setHaikus} />
                                    </li>
                                    <li>
                                        <ShowRacer />
                                    </li>
                                    <li>
                                        <ShowAdmin />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div style = {{zIndex: "-99"}} className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .fade-p1; delay: 500; repeat: true">
                    <div>
                        <h4 className="fade-p1">{`Gabir Motors • ${d.getFullYear()}`}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBody