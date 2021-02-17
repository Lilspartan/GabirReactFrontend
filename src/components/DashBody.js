import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Haikus from './Haikus'

const DashBody = ({ user }) => {
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

    return (
        <>
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>
                <div className="uk-section uk-section-secondary uk-position-center uk-padding-large">

                    <div>
                        <div uk-grid>
                            <div className="uk-width-auto@m">
                                <ul className="uk-tab-top" uk-tab="connect: #component-tab-bottom; animation: uk-animation-fade">
                                    <li><a href="#">Haikus</a></li>
                                    <li><a href="#">Item</a></li>
                                    <li><a href="#">Item</a></li>
                                </ul>
                            </div>
                            <div className="uk-width-expand@m">
                                <ul id="component-tab-bottom" className="uk-switcher">
                                    <li>
                                        <Haikus haikus = {haikus} setHaikus = {setHaikus} />
                                    </li>
                                    <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                                    <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, sed do eiusmod.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .fade-p1; delay: 500; repeat: true">
                    <div>
                        <h4 className="fade-p1">{`Gabir Motors • ${d.getFullYear()}`}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBody