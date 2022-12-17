/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import qs from 'qs';
import { Notification, NotificationArea as Area, CarFrame } from '../../Components'
import Blank from '../../Templates/Blank/index';

const links = [
	{ name: "GR86", link: "https://spec-mapping-images.gabekrahulik.repl.co"},
	{ name: "Porsche 911", link: "https://carontrack.gabekrahulik.repl.co" },
]

var updateTimeout = setTimeout(() => { }, 999999);

type Preset = {
	name: string;
	metal: number;
	rough: number;
	clearcoat: number;
}

const toHex = (value: number) => { return value.toString(16).padStart(2,"0") }

const SpecMap = (props: any) => {
	// The inputs, either from the url or the ui
	const [color, setColor] = useState("#242fb3");
	const [metal, setMetal] = useState(0);
	const [roughness, setRoughness] = useState(0);
	const [clearcoat, setClearcoat] = useState(0);
	const [carImagesLink, setCarImagesLink] = useState(links[0]);

	// controls the "link copied" pop up
	const [copied, setCopied] = useState(false);

	// If the user should continue to the tool on a smaller screen
	const [continueWithSmallScreen, setContinueWithSmallScreen] = useState(false);

	// The link to copy
	const [link, setLink] = useState(`#color=${color}&metal=${metal}&rough=${roughness}&clearcoat=${clearcoat}`);

	// eslint-disable-next-line
	const [presets, setPresets] = useState<Preset[]>([
		{ name: "Flat", metal: 0, rough: 80, clearcoat: 0 },
		{ name: "Matte", metal: 0, rough: 50, clearcoat: 0 },
		{ name: "Satin", metal: 0, rough: 20, clearcoat: 0 },
		{ name: "Gloss", metal: 0, rough: 0, clearcoat: 0 },
		{ name: "Chrome", metal: 100, rough: 0, clearcoat: 0 },
		{ name: "Metallic", metal: 90, rough: 40, clearcoat: 0 },
		{ name: "Candy", metal: 50, rough: 10, clearcoat: 0 },
		{ name: "Pearl", metal: 60, rough: 20, clearcoat: 0 },
		{ name: "Velvet", metal: 80, rough: 100, clearcoat: 0 },
	]);

	const [toSetValues, setToSetValues] = useState({
		metal: 0,
		roughness: 0,
		clearcoat: 0,
		color: "#242fb3"
	})

	useEffect(() => {
		let parameters = qs.parse(props.location.hash, { ignoreQueryPrefix: true });
		
		if (parameters["#color"] !== undefined) {
			setColor(String(parameters["#color"]));
			setMetal(Number(parameters["metal"]));
			setRoughness(Number(parameters["rough"]));
			setClearcoat(Number(parameters["clearcoat"]));

			setToSetValues({
				color: String(parameters["#color"]),
				metal: Number(parameters["metal"]),
				roughness: Number(parameters["rough"]),
				clearcoat: Number(parameters["clearcoat"]),
			})
		}
	}, [])

	useEffect(() => {
		clearTimeout(updateTimeout);
		updateTimeout = setTimeout(() => {
			setMetal(toSetValues.metal);
			setRoughness(toSetValues.roughness);
			setClearcoat(toSetValues.clearcoat);
			setColor(toSetValues.color);
		}, 500)
		setLink(`#color=${color}&metal=${metal}&rough=${roughness}&clearcoat=${clearcoat}`);
	}, [toSetValues])

	const changePreset = (e: any) => {
		var values = e.target.value.split('/');
		setToSetValues({
			...toSetValues,
			metal: values[0],
			roughness: values[1],
			clearcoat: values[2],
		})

		setMetal(values[0]);
		setRoughness(values[1]);
		setClearcoat(values[2]);
	}

	return (
		<>
			<Area>
				{copied && (
					<>
						<Notification icon="link">
							Link Copied to Clipboard
						</Notification>
					</>
				)}
			</Area>
			<Blank title="Spec Mapping">
				{/* <h1 className = "uk-margin-auto uk-text-center">Gabir Motors Spec Map Previsualization Tool</h1> */}

				<div className={(continueWithSmallScreen ? "uk-hidden" : "uk-hidden@m")}>
					<div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-container uk-position-center">
						<div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large" style={{ maxHeight: '95vh' }}>
							<span className="uk-text-danger uk-text-bold">This page is not designed for small screens</span><br /><br />
							<a href="#continue" onClick={() => { setContinueWithSmallScreen(true) }} className="uk-button uk-button-danger">Continue Anyways</a>
						</div>
					</div>
				</div>


				<div className={`${(continueWithSmallScreen ? "uk-visible" : "uk-visible@m")} uk-text-left uk-position-center`}>
					<div>
						<div className="uk-padding-small uk-animation-fade uk-margin uk-width-1-1 uk-margin-auto uk-card uk-card-secondary uk-card-body uk-flex uk-flex-wrap">

							<div className="uk-width-1-1@s uk-width-1-3@l">
								<div className="">
								<div>
									<h2 className = "uk-display-inline">Choose a Car &nbsp;&nbsp;</h2>
										<div uk-form-custom="target: > * > span:first-child" className = "uk-margin-bottom uk-marign-left">
											<select onChange = {(e) => {
												setCarImagesLink(JSON.parse(e.target.value));
											}} className = "uk-width-1-1">
												{links.map(link => (
													<option value = {`${JSON.stringify(link)}`}>{ link.name }</option>
												))}
											</select>
											<button className="uk-button uk-button-default uk-width-1-1" type="button">
												<span></span>
												<span uk-icon="icon: chevron-down"></span>
											</button>
										</div>	
									</div>
									<div className="uk-width-1-1 uk-text-left uk-padding-remove">
										<label htmlFor="color">Choose a Color:</label> <input type="color" id="color" value={color} onChange={(e) => { setToSetValues({ ...toSetValues, color: e.target.value }) }} />
										<span className="uk-margin-left uk-margin-bottom">
											<input className="uk-form-blank uk-text-primary uk-form-width-small uk-form-small color-input" type="text" placeholder="Color Hex" value={toSetValues.color} onChange={(e) => { setToSetValues({ ...toSetValues, color: e.target.value }) }} />
										</span>
										<br />
										<label htmlFor="metallic">Metallic</label> <span id="metallic-container"><input type="range" min="0" max="100" value={toSetValues.metal} id="metallic" onChange={(e) => { setToSetValues({ ...toSetValues, metal: parseInt(e.target.value) }) }} /> {toSetValues.metal}%</span><br />
										<label htmlFor="rough">Roughness</label> <span id="rough-container"><input type="range" min="0" max="100" value={toSetValues.roughness} id="rough" onChange={(e) => { setToSetValues({ ...toSetValues, roughness: parseInt(e.target.value) }) }} /> {toSetValues.roughness}%</span><br />
										<label htmlFor="clearcoat">Clear coat</label> <span id="clearcoat-container"><input type="range" min="0" max="100" value={toSetValues.clearcoat} id="clearcoat" onChange={(e) => { setToSetValues({ ...toSetValues, clearcoat: parseInt(e.target.value) }) }} /> {toSetValues.clearcoat}%</span><br />
										<span>Spec Map Color: </span>
										<span className="uk-margin-left uk-margin-bottom">
											<input className="uk-form-blank uk-text-primary uk-form-width-small uk-form-small color-input" type="text" placeholder="Spec Map Hex" value={`#${toHex(Math.ceil(metal * 2.55)) + toHex(Math.ceil(roughness * 2.55)) + toHex(Math.ceil(clearcoat * 2.55))}`} disabled />
										</span>
									</div>
								</div>

								<div>
									<h2 className = "uk-display-inline">Or Use a Preset &nbsp;&nbsp;</h2>
									<div uk-form-custom="target: > * > span:first-child" className = "uk-margin-bottom uk-marign-left">
										<select onChange = {changePreset} className = "uk-width-1-1">
											<option value="0/0/0">Select One</option>
											{presets.map(p => (
												<option value = {`${p.metal}/${p.rough}/${p.clearcoat}`}>{ p.name }</option>
											))}
										</select>
										<button className="uk-button uk-button-default uk-width-1-1" type="button">
											<span></span>
											<span uk-icon="icon: chevron-down"></span>
										</button>
									</div>	
								</div>

								<div className="uk-margin uk-width-1-1 uk-flex uk-flex-wrap">
									<div className="uk-width-1-1">
										<a uk-tooltip="Get a link to the configuration you've made. Save it or share it with others!" className="uk-button uk-button-default uk-align-right uk-width-1-1 uk-margin-remove-bottom" href={link} onClick={() => {
											navigator.clipboard.writeText("https://gabirmotors.com/specmapping" + link)
											setCopied(true);
											setTimeout(() => { setCopied(false) }, 5000)
										}}>Click to Share</a>
									</div>
								</div>

								<p className="uk-text-warning uk-text-left"><span className="uk-text-bold"><span uk-icon="icon: warning"></span> Warning!</span> Some images may take a while to load</p>
								<p className="uk-text-success uk-text-left">Thank you <a href="https://www.tradingpaints.com/profile/666793/Zach-C-Miller" target="_new" className="uk-text-bold">Bracket (Zach M.)</a> for the code help and images!</p>

							</div>

							<div className="uk-padding-small uk-width-1-1@s uk-width-2-3@l">
								<CarFrame
									clearcoat={clearcoat / 100}
									metal={metal / 100}
									roughness={roughness / 100}
									color={color}
									imgPath={carImagesLink.link} />
							</div>
						</div>
					</div>
				</div>
			</Blank>
		</>
	)
}

export default SpecMap;