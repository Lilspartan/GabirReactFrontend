/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import Blank from '../../Templates/Blank/index';
import { withRouter, useParams, Link } from 'react-router-dom'

import { categories, Role } from '../../utils/channelchooser';

import './tailwind.css'

const ChannelChooser = (props: any) => {
    const [userRoles, setRoles] = useState<string[]>([]);
    const [expired, setExpired] = useState(false);

    let { id } = useParams<{ id: string; }>();

    useEffect(() => {
        (async () => {
            const res = await fetch(`https://spottedlowsales.gabekrahulik.repl.co/roles/${id}`)
			const data = await res.json()

            console.log(data)

            if (data.reason === "INVALID_TOKEN") {
                return setExpired(true);
            }

			if (data.roles !== null) {
                setRoles(data.roles)
            }
        })()
    }, [ id ])

    const alreadyHasRole = (userId: string) => {
        let foundRole = userRoles.find((role) => {
            return role === userId;
        })

        return foundRole;
    }

    const toggleRole = (roleId: string) => {
        (async () => {
            const res = await fetch(`https://spottedlowsales.gabekrahulik.repl.co/toggle/role/${id}/${roleId}`)
			const data = await res.json()

            console.log(data)

            if (data.reason === "INVALID_TOKEN") {
                return setExpired(true);
            }

			if (data.roles !== null) {
                setRoles(data.roles)
            }
        })()
    }

	return (
		<>
			<Blank title="The Channel Chooser">
                {expired && (
                    <div className = "absolute top-0 left-0 w-screen h-screen z-30 grid place-items-center bg-black bg-opacity-70">
                        <div className = "bg-card p-8">
                            <h1>Session Expired</h1>
                            <p>Restart the Channel Chooser from Discord to continue.</p>
                        </div>
                    </div>
                )}

                <div className = "w-screen m-h-screen">
                    <div className = "mx-auto text-5xl">
                        <h1 className = "text-center">The Channel Chooser</h1>
                    </div>

                    <div className = "flex flex-col p-8">
                        { categories.map((category, i) => (
                            <div className = "">
                                <div className="relative flex py-5 items-center">
                                    <div className="flex-grow border-t border-gray-300 border-1"></div>
                                    <h2 className="flex-shrink mx-4 text-gray-400 text-4xl">{ category.name }</h2>
                                    <div className="flex-grow border-t border-gray-300 border-1"></div>
                                </div>
                                <div className = "flex flex-col m-8 gap-8">
                                    { category.roles.map((role) => {
                                        return (
                                            <a onClick = {() => { toggleRole(role.roleId) }} className = "shadow-sm hover:shadow-xl transition duration-200 hover:translate-y-2">
                                                <div key = {role.roleId} className = {`bg-card w-full transition duration-200 p-4 rounded-lg flex flex-row`}>
                                                    <div className = {`text-center text-2xl text-white font-bold`}>{ role.name }</div>

                                                    { role.description !== null && (
                                                        <div>{  }</div>
                                                    ) }
    
                                                    <div>
                                                        
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    }) }
                                </div>
                            </div>
                        )) }
                    </div>
                </div>
			</Blank>
		</>
	)
}

export default withRouter(ChannelChooser);