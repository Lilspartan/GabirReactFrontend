import React from 'react'
import { User } from '../../../interfaces';

type TabProps = {
    user: User
}

const RacerTab = ({ user }:TabProps) => {
    return (
        <div>
            <div>
                <img src={`https://cdn.discordapp.com/avatars/378319931005206530/${user.profile?.accounts?.discord.avatar}.png?size=128`} alt="" style = {{ width: '5em', borderRadius: '50%' }} />
                <span>{user.profile.accounts && user.profile.accounts.discord.username}#{user.profile?.accounts?.discord?.tag}</span>
            </div>
        </div>
    )
}

export default RacerTab
