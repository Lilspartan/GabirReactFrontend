import React from 'react'

const RacerTab = ({ user }) => {
    return (
        <div>
            {user.racerProfile.racerName}
            {user.racerProfile.carNumber}
            {user.racerProfile.team}
        </div>
    )
}

export default RacerTab
