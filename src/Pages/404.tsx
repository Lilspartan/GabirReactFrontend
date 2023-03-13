import Blank from '../Templates/Blank/index';

const fourBody = () => {
	var messages = [
		`Well... this is embarassing. No idea what happened there`,
		`This is not the page you are looking for`,
		`Are you sure you typed that in correctly?`,
		`They say you cut the course!`,
		`You went off the track!`
	]
	return (
		<>
			<Blank title="404" loading={false}>

				<h1 className="uk-animation-slide-top-small mx-auto">
					<img alt="Gabir Motors Logo" src="img/newgabirtext.png" style={{ height: 'auto', width: '30vw', minWidth: '300px', marginBottom: '60vh' }} />
				</h1>

				<h1 className="uk-position-center text-5xl">
					{messages[Math.floor(Math.random() * messages.length)]}
				</h1>
			</Blank>
		</>
	)
}

export default fourBody