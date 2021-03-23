import React from 'react'

const RacerTab = ({ user }) => {
    return (
        <div>
            <div class="uk-margin">
                <input class="uk-input" type="text" placeholder="Display Name" value = {user.racerProfile.racerName} />
            </div>
            <div class="uk-margin">
                <input class="uk-input" type="number" placeholder="Car Number" value = {user.racerProfile.carNumber}/>
            </div>
            {user.racerProfile.team}
        </div>
    )
}

export default RacerTab
