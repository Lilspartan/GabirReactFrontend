/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import qs from 'qs';
import { Notification, NotificationArea as Area } from '../../Components'
import Blank from '../../Templates/Blank/index';

type CarImage = {
	path: string;
	name: string;
}

type Preset = {
	name: string;
	metal: number;
	rough: number;
}

const SpecMap = (props: any) => {
	// The inputs, either from the url or the ui
	const [color, setColor] = useState((qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#color`] !== undefined ? String(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#color`]) : "#000000"));
	const [metallic, setMetallic] = useState(Number(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`metal`]) || 0);
	const [roughness, setRoughness] = useState(Number(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`rough`]) || 0);
	const [car, setCar] = useState((qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`car`] !== undefined ? String(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`car`]) : "streetstock"));
	
	// controls the "link copied" pop up
	const [copied, setCopied] = useState(false);

	// If the user should continue to the tool on a smaller screen
	const [c, setC] = useState(false);

	// The link to copy
	const [link, setLink] = useState(`#color=${color}&metal=${metallic}&rough=${roughness}&car=${car}`);

	// this will be filled with the list of car images
	const [carsList, setCarsList] = useState<CarImage[]>([]);

	// eslint-disable-next-line
	const [presets, setPresets] = useState<Preset[]>([
		{name: "Flat",metal: 0,rough: 80},
		{name: "Matte",metal: 0,rough: 50},
		{name: "Satin",metal: 0,rough: 20},
		{name: "Gloss",metal: 0,rough: 0},
		{name: "Chrome",metal: 100,rough: 0},
		{name: "Metallic",metal: 90,rough: 40},
		{name: "Candy",metal: 50,rough: 10},
		{name: "Pearl",metal: 60,rough: 20},
		{name: "Velvet",metal: 80,rough: 100},
	]);

	function drawCar(hexRGB: string, metalPct: number, roughPct: number) {
		var rough = roughPct / 10;
		var metal = metalPct / 10;

		if (hexRGB.substring(0, 1) === "#") {
			hexRGB = hexRGB.substr(1);
		}
		var r = parseInt(hexRGB.substr(0, 2), 16) / 255;
		var g = parseInt(hexRGB.substr(2, 2), 16) / 255;
		var b = parseInt(hexRGB.substr(4, 2), 16) / 255;

		var black = document.getElementById("black");
		var red = document.getElementById("red");
		var green = document.getElementById("green");
		var blue = document.getElementById("blue");

		var ctx = (document.getElementById("canvas") as HTMLCanvasElement)?.getContext('2d');
		ctx?.clearRect(0, 0, (document.getElementById("canvas") as HTMLCanvasElement)?.width, (document.getElementById("canvas") as HTMLCanvasElement)?.height);

		if (ctx) {
			drawImage(ctx, black, metal, rough);
			drawImage(ctx, red, metal, rough, r, "lighten");
			drawImage(ctx, green, metal, rough, g, "lighten");
			drawImage(ctx, blue, metal, rough, b, "lighten");
		}
	}

	useEffect(() => {
		drawCar(color, metallic, roughness)
		setLink(`#color=${color}&metal=${metallic}&rough=${roughness}&car=${car}`);
	}, [color, metallic, roughness, car])

	useEffect(() => {
		const fetchCars = async () => {
			const res = await fetch("https://i.gabirmotors.com/carImages");
			const data = await res.json();
			var cars = [];

			for (var i = 0; i < data.children.length; i ++) {
				cars.push({
					path: data.children[i].name,
					name: data.children[i].children[0].name.replace(".txt", "")
				})
			}

			setCarsList(cars);
		}

		fetchCars();

		setTimeout(() => {
			drawCar(color, metallic, roughness)
		}, 3000)
	}, [])

	function drawImage(ctx: any, image: any, metal: number, rough: number, alpha = 1.0, mode = "copy") {
		ctx.save();
		ctx.globalAlpha = alpha;
		ctx.globalCompositeOperation = mode;

		var w = image.width / 11;
		var h = image.height / 11;

		var xOffset = w * rough;
		var yOffset = h * metal;

		ctx.drawImage(image, xOffset, yOffset, w, h, 0, 0, 600, 400);
		ctx.restore();
	}

	const changeColor = (e: any) => setColor(e.target.value)
	const changeMetal = (e: any) => setMetallic(e.target.value * 10)
	const changeRough = (e: any) => setRoughness(e.target.value * 10)
	const changePreset = (e: any) => {
		var values = e.target.value.split('/');
		setMetallic(values[0]);
		setRoughness(values[1]);
	}
	const changeCar = (e: any) => {
		setCar(e.target.value)
		setTimeout(() => {
			drawCar(color, metallic, roughness)
		}, 2000)
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

					<div className = {(c ? "uk-hidden" : "uk-hidden@m")}>
						<div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-container uk-position-center">
							<div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large" style={{ maxHeight: '95vh' }}>
								<span className="uk-text-danger uk-text-bold">This page is not designed for small screens</span><br /><br />
								<a href="#continue" onClick = {() => { setC(true) }} className="uk-button uk-button-danger">Continue Anyways</a>
							</div>
						</div>
					</div>


					<div className={`${(c ? "uk-visible" : "uk-visible@m")} uk-text-left uk-position-center`}>
						<div>
							<div className="uk-padding-small uk-animation-fade uk-margin uk-width-1-1 uk-margin-auto uk-card uk-card-secondary uk-card-body uk-flex uk-flex-wrap">
						
								<div className = "uk-width-1-1@s uk-width-1-2@l">
									<h2 className = "uk-display-inline">Select Your Car &nbsp;&nbsp;</h2>
									<div uk-form-custom="target: > * > span:first-child" className = "uk-margin-bottom uk-marign-left">
										<select onChange = {changeCar} value = {car}>
											{carsList.map(ca => (
												<option value = {ca.path}>{ ca.name }</option>
											))}
										</select>
										<button className="uk-button uk-button-default" type="button">
											<span></span>
											<span uk-icon="icon: chevron-down"></span>
										</button>
									</div>

									<div className="">
										<div className = "uk-width-1-1 uk-text-left uk-padding-remove">
											<label htmlFor="color">Choose a Color:</label> <input type="color" id="color" value={color} onChange={changeColor} />
											<span className="uk-margin-left uk-margin-bottom">
												<input className="uk-form-blank uk-text-primary uk-form-width-small uk-form-small color-input" type="text" placeholder="Color Hex" value = {color} onChange={changeColor} />
											</span>
											<br />
											<label htmlFor="metallic">Metallic</label> <span id="metallic-container"><input type="range" min="0" max="10" value={metallic / 10} id="metallic" onChange={changeMetal} /> {metallic}%</span><br />
											<label htmlFor="rough">Roughness</label> <span id="rough-container"><input type="range" min="0" max="10" value={roughness / 10} id="rough" onChange={changeRough} /> {roughness}%</span><br />
											<span>Spec Map Color: </span>
											<span className="uk-margin-left uk-margin-bottom">
												<input className="uk-form-blank uk-text-primary uk-form-width-small uk-form-small color-input" type="text" placeholder="Spec Map Hex" value = {`#${(Math.ceil(metallic * 2.55).toString(16).toUpperCase() === "0" ? "00" : Math.ceil(metallic * 2.55).toString(16).toUpperCase()) + (Math.ceil(roughness * 2.55).toString(16).toUpperCase() === "0" ? "00" : Math.ceil(roughness * 2.55).toString(16).toUpperCase()) + "00"}`} disabled />
											</span>
										</div>
										
										<div>
											<h2 className = "uk-display-inline">Or Use a Preset &nbsp;&nbsp;</h2>
											<div uk-form-custom="target: > * > span:first-child" className = "uk-margin-bottom uk-marign-left">
												<select onChange = {changePreset} className = "uk-width-1-1">
													<option value="0/0">Select One</option>
													{presets.map(p => (
														<option value = {`${p.metal}/${p.rough}`}>{ p.name }</option>
													))}
												</select>
												<button className="uk-button uk-button-default uk-width-1-1" type="button">
													<span></span>
													<span uk-icon="icon: chevron-down"></span>
												</button>
											</div>	
										</div>
									</div>

									<div className="uk-margin uk-width-1-1 uk-flex uk-flex-wrap">
										<div className = "uk-width-1-1">
											<a uk-tooltip = "Get a link to the configuration you've made. Save it or share it with others!" className="uk-button uk-button-default uk-align-right uk-width-1-1 uk-margin-remove-bottom" href={link} onClick={() => {
												navigator.clipboard.writeText("https://gabirmotors.com/specmapping" + link)
												setCopied(true);
												setTimeout(() => { setCopied(false) }, 5000)
											}}>Click to Share</a>
										</div>
									</div>

									<p className="uk-text-warning uk-text-left"><span className = "uk-text-bold"><span uk-icon="icon: warning"></span> Warning!</span> Some images may take a while to load</p>
									<p className="uk-text-success uk-text-left">Thank you <a href="https://www.tradingpaints.com/profile/666793/Zach-C-Miller" target = "_new" className = "uk-text-bold">Bracket (Zach M.)</a> for the code help and images!</p>

								</div>

								<div className = "uk-padding-small uk-width-1-1@s uk-width-1-2@l">				
									<img id="black" src = {`https://i.gabirmotors.com/siteimages/${car}/grid-black.jpg`} style={{ display: "none" }} alt="grid-black" />
									<img id="blue" src = {`https://i.gabirmotors.com/siteimages/${car}/grid-blue.jpg`} style={{ display: "none" }} alt="grid-blue" />
									<img id="red" src = {`https://i.gabirmotors.com/siteimages/${car}/grid-red.jpg`} style={{ display: "none" }} alt="grid-red" />
									<img id="green" src = {`https://i.gabirmotors.com/siteimages/${car}/grid-green.jpg`} style={{ display: "none" }} alt="grid-green" />
									<canvas className="tools-canvas uk-box-shadow-small uk-margin-auto" id="canvas" width="600" height="400"></canvas>
								</div>
							</div>
						</div>
					</div>
				</Blank>
			</>
	)
}

export default SpecMap;