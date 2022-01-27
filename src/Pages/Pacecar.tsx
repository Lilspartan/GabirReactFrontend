import Blank from '../Templates/Blank/index';

const Pacecar = () => {
	return (
		<>
			<Blank title="Regulations: Pace Car" loading={false}>

                <article className="tutorial-article uk-align-center">
                    <h1>Gabir Motorsports Pace Car Regulations</h1>

                    <h2>Chapter 1: The Car</h2>
                    <p>
                        Official Gabir Motorsports Pace Cars are marked by the signature "Gabir Motors Pace Car" logo shown below, any other car claiming to be the pace car is lying.
                    </p>

                    <img src="https://i.gabirmotors.com/assets/other/pace_car.png" alt="" className = "uk-width-1-4" />

                    <h2>Chapter 2: The Consequences</h2>
                    <p>
                        Any driver found to have passed the Gabir Motorsports Pace Car or to have broken any of the following rules will be disqualified from the race and lose any points gained during the race.
                    </p>

                    <h2>Chapter 3: The Rules</h2>
                    <p>
                        Drivers <span className = "uk-text-danger uk-text-bold">MUST NEVER</span>:
                        <ol>
                            <li>Impersonate the Gabir Motorsports Pace Car</li>
                            <li>Exceed the speed limit posted on the Gabir Motorsports Pace Car</li>
                            <li>Make contact with the Gabir Motorsports Pace Car</li>
                            <li>Disrespect the driver in the Gabir Motorsports Pace Car</li>
                            <li>Have more fun than the Gabir Motorsports Pace Car driver</li>
                        </ol>
                        <br />
                        Drivers <span className = "uk-text-success uk-text-bold">MUST</span>:
                        <ol>
                            <li>Be cautious of the Gabir Motorsports Pace Car's position at all times</li>
                            <li>Report any cases of rule breaking seen on track</li>
                        </ol>
                    </p>
                </article>

			</Blank>
		</>
	)
}

export default Pacecar