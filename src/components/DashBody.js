import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Haikus from './Haikus'

const DashBody = ({ }) => {
    var d = new Date();

    const [haikus, setHaikus] = useState([])

    useEffect(() => {
        const getHaikus = async () => {
          const haikusFromServer = await fetchHaikus()
          setHaikus(haikusFromServer)
        }

        getHaikus()
    }, [])

    var user = JSON.parse(sessionStorage.getItem('user'))
    var loggedin = sessionStorage.getItem('isLoggedIn')

    const fetchHaikus = async () => {
        const res = await fetch(`https://api.gabirmotors.ga/user/${user.uuid}/haikus`)
        const data = await res.json()

        return data
    }

    return (
        <>
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>
                <div className="uk-flex uk-flex-middle uk-width-1-1">
                    <Haikus haikus = {haikus} />
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