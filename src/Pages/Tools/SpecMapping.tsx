/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import qs from 'qs';
import { Notification, NotificationArea as Area, CarFrame } from '../../Components'
import Blank from '../../Templates/Blank/index';

const CAR_IMG_PATH = "https://spec-mapping-images.gabekrahulik.repl.co";

var updateTimeout = setTimeout(() => { }, 999999);

type Preset = {
	name: string;
	metal: number;
	rough: number;
}

const SpecMap = (props: any) => {
	// The inputs, either from the url or the ui
	const [color, setColor] = useState((qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#color`] !== undefined ? String(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#color`]) : "#242fb3"));
	const [metal, setMetal] = useState(Number(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`metal`]) || 0);
	const [roughness, setRoughness] = useState(Number(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`rough`]) || 0);
	const [clearcoat, setClearcoat] = useState((qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`clearcoat`] !== undefined ? Number(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`clearcoat`]) : 0));

	// controls the "link copied" pop up
	const [copied, setCopied] = useState(false);

	// If the user should continue to the tool on a smaller screen
	const [c, setC] = useState(false);

	// The link to copy
	const [link, setLink] = useState(`#color=${color}&metal=${metal}&rough=${roughness}&clearcoat=${clearcoat}`);

	// eslint-disable-next-line
	const [presets, setPresets] = useState<Preset[]>([
		{ name: "Flat", metal: 0, rough: 80 },
		{ name: "Matte", metal: 0, rough: 50 },
		{ name: "Satin", metal: 0, rough: 20 },
		{ name: "Gloss", metal: 0, rough: 0 },
		{ name: "Chrome", metal: 100, rough: 0 },
		{ name: "Metallic", metal: 90, rough: 40 },
		{ name: "Candy", metal: 50, rough: 10 },
		{ name: "Pearl", metal: 60, rough: 20 },
		{ name: "Velvet", metal: 80, rough: 100 },
	]);

	const [toSetValues, setToSetValues] = useState({
		metal: 0,
		roughness: 0,
		clearcoat: 0,
		color: "#242fb3"
	})

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

				<div className={(c ? "uk-hidden" : "uk-hidden@m")}>
					<div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-container uk-position-center">
						<div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large" style={{ maxHeight: '95vh' }}>
							<span className="uk-text-danger uk-text-bold">This page is not designed for small screens</span><br /><br />
							<a href="#continue" onClick={() => { setC(true) }} className="uk-button uk-button-danger">Continue Anyways</a>
						</div>
					</div>
				</div>


				<div className={`${(c ? "uk-visible" : "uk-visible@m")} uk-text-left uk-position-center`}>
					<div>
						<div className="uk-padding-small uk-animation-fade uk-margin uk-width-1-1 uk-margin-auto uk-card uk-card-secondary uk-card-body uk-flex uk-flex-wrap">

							<div className="uk-width-1-1@s uk-width-1-3@l">
								<div className="">
									<div className="uk-width-1-1 uk-text-left uk-padding-remove">
										<label htmlFor="color">Choose a Color:</label> <input type="color" id="color" value={color} onChange={(e) => { setToSetValues({ ...toSetValues, color: e.target.value }) }} />
										<span className="uk-margin-left uk-margin-bottom">
											<input className="uk-form-blank uk-text-primary uk-form-width-small uk-form-small color-input" type="text" placeholder="Color Hex" value={color} onChange={(e) => { setToSetValues({ ...toSetValues, color: e.target.value }) }} />
										</span>
										<br />
										<label htmlFor="metallic">Metallic</label> <span id="metallic-container"><input type="range" min="0" max="100" value={toSetValues.metal} id="metallic" onChange={(e) => { setToSetValues({ ...toSetValues, metal: parseInt(e.target.value) }) }} /> {metal}%</span><br />
										<label htmlFor="rough">Roughness</label> <span id="rough-container"><input type="range" min="0" max="100" value={toSetValues.roughness} id="rough" onChange={(e) => { setToSetValues({ ...toSetValues, roughness: parseInt(e.target.value) }) }} /> {roughness}%</span><br />
										<label htmlFor="clearcoat">Clear coat</label> <span id="clearcoat-container"><input type="range" min="0" max="100" value={toSetValues.clearcoat} id="clearcoat" onChange={(e) => { setToSetValues({ ...toSetValues, clearcoat: parseInt(e.target.value) }) }} /> {clearcoat}%</span><br />
										<span>Spec Map Color: </span>
										<span className="uk-margin-left uk-margin-bottom">
											<input className="uk-form-blank uk-text-primary uk-form-width-small uk-form-small color-input" type="text" placeholder="Spec Map Hex" value={`#${(Math.ceil(metal * 2.55).toString(16).toUpperCase() === "0" ? "00" : Math.ceil(metal * 2.55).toString(16).toUpperCase()) + (Math.ceil(roughness * 2.55).toString(16).toUpperCase() === "0" ? "00" : Math.ceil(roughness * 2.55).toString(16).toUpperCase()) + (Math.ceil(clearcoat * 2.55).toString(16).toUpperCase() === "0" ? "00" : Math.ceil(clearcoat * 2.55).toString(16).toUpperCase())}`} disabled />
										</span>
									</div>
								</div>

								{/*<div className="uk-margin uk-width-1-1 uk-flex uk-flex-wrap">
									<div className="uk-width-1-1">
										<a uk-tooltip="Get a link to the configuration you've made. Save it or share it with others!" className="uk-button uk-button-default uk-align-right uk-width-1-1 uk-margin-remove-bottom" href={link} onClick={() => {
											navigator.clipboard.writeText("https://gabirmotors.com/specmapping" + link)
											setCopied(true);
											setTimeout(() => { setCopied(false) }, 5000)
										}}>Click to Share</a>
									</div>
								</div>*/}

								<p className="uk-text-warning uk-text-left"><span className="uk-text-bold"><span uk-icon="icon: warning"></span> Warning!</span> Some images may take a while to load</p>
								<p className="uk-text-success uk-text-left">Thank you <a href="https://www.tradingpaints.com/profile/666793/Zach-C-Miller" target="_new" className="uk-text-bold">Bracket (Zach M.)</a> for the code help and images!</p>

							</div>

							<div className="uk-padding-small uk-width-1-1@s uk-width-2-3@l">
								<CarFrame
                	clearcoat={clearcoat / 100}
	                metal={metal / 100}
	                roughness={roughness / 100}
	                color={color}
	                imgPath={CAR_IMG_PATH} />
							</div>
						</div>
					</div>
				</div>
			</Blank>
		</>
	)
}

export default SpecMap;