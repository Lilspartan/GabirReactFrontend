import React from 'react'
import { User } from '../../../interfaces';

type TabProps = {
    user: User
}

const RacerTab = ({ user }:TabProps) => {
    return (
        <div>
            <div className="uk-margin">
                <input className="uk-input" type="text" placeholder="Display Name" value = {user.racerProfile.name} />
            </div>
            <div className="uk-margin">
                <input className="uk-input" type="number" placeholder="Car Number" value = {user.racerProfile.car_number}/>
            </div>
            {user.racerProfile.team?.name}
        </div>
    )
}

export default RacerTab
