import Blank from '../Templates/Blank/index';

const GabirTV = () => {
	const getViewers = async (user: { id: string, url: string }) => {
		var res = await fetch(`https://api.twitch.tv/helix/streams?user_id=${user.id}`, {
			headers: new Headers({
				'Client-ID': 'v354nab7jsgctl2zww4ic69tc4l3hf',
				'Authorization': 'Bearer jkmoj86ctljekpx3xl7ix28iwmzyen'
			})
		})
		
		var data = await res.json();
		if (data.data.length) {
			console.log(`${user.url} is Online!`)
			window.location.href = user.url
		}
	}
	return (
		<>
			<Blank title="GabirTV" loading={false}>

				<h1 className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container uk-display-block">
					<img alt="Gabir Motors Logo" src="img/newgabirtext.png" style={{ height: 'auto', width: '30vw', minWidth: '300px', marginBottom: '60vh' }} />
				</h1>

				<h1 className="uk-position-center">
					test
				</h1>
			</Blank>
		</>
	)
}

export default GabirTV