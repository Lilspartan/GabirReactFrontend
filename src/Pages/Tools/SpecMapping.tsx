/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Loading from "../../components/LoadingIcon/Loading";
import qs from 'qs';
import { Notification, Area } from '../../components/Notification/index'
import Alert from '../../components/Alert/index'

const SpecMap = (props: any) => {
	const [loading, setLoading] = useState(true);
	const [color, setColor] = useState((qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#color`] !== undefined ? String(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#color`]) : "#000000"));
	const [metallic, setMetallic] = useState(Number(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`metal`]) || 0);
	const [roughness, setRoughness] = useState(Number(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`rough`]) || 0);
	const [car, setCar] = useState((qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`car`] !== undefined ? String(qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`car`]) : "streetstock"));
	const [copied, setCopied] = useState(false);
	const [c, setC] = useState(false);
	const [link, setLink] = useState(`#color=${color}&metal=${metallic}&rough=${roughness}&car=${car}`);

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
		setTimeout(() => {
			setLoading(false);
			setTimeout(() => {
				drawCar(color, metallic, roughness)
			}, 1000)
		}, 2000)
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
	const changeCar = (e: any) => {
		setCar(e.target.value)
		setTimeout(() => {
			drawCar(color, metallic, roughness)
		}, 1000)
	}

	return (
		<>
			<Header title="Gabir Motors | Spec Mapping" />
			{loading && <Loading />}
			{
				!loading && (
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
						<div className="uk-height-large uk-background-cover uk-light uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', minHeight: '100vh', height: 'auto' }}>
							{/* <h1 className = "uk-margin-auto uk-text-center">Gabir Motors Spec Map Previsualization Tool</h1> */}

							<div className = {(c ? "uk-hidden" : "uk-hidden@m")}>
								<div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-container uk-position-center">
									<div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large" style={{ maxHeight: '95vh' }}>
										<span className="uk-text-danger uk-text-bold">This page is not designed for small screens</span><br /><br />
										<a href="#continue" onClick = {() => { setC(true) }} className="uk-button uk-button-danger">Continue Anyways</a>
									</div>
								</div>
							</div>


							<div className={`${(c ? "uk-visible" : "uk-visible@m")} uk-text-center uk-position-center`}>
								<div>
									<div className="uk-animation-fade uk-margin uk-width-1-1 uk-margin-auto uk-card uk-card-secondary uk-card-body uk-flex">
										<div className = "uk-padding-small">
											<div className="uk-margin">
												<div uk-form-custom="target: > * > span:first-child">
													<select onChange = {changeCar} value = {car}>
														<option value="streetstock">Street Stock</option>
														<option value="dallaraf3">Dallara F3</option>
													</select>
													<button className="uk-button uk-button-default" type="button">
														<span></span>
													</button>
												</div>
											</div>
											<label htmlFor="color">Choose a Color:</label> <input type="color" id="color" value={color} onChange={changeColor} /><br />
											<label htmlFor="metallic">Metallic</label> <input type="range" min="0" max="10" value={metallic / 10} id="metallic" onChange={changeMetal} /><br />
											<label htmlFor="rough">Roughness</label> <input type="range" min="0" max="10" value={roughness / 10} id="rough" onChange={changeRough} /><br />

											<hr />

											<p className="tools-number uk-text-left" id="color-value"><span className="uk-text-bold">Current Color: </span>{color}</p>
											<p className="tools-number uk-text-left" id="metal-value"><span className="uk-text-bold">Metallic: </span>{metallic}% ({Math.ceil(metallic * 2.55).toString(16).toUpperCase()})</p>
											<p className="tools-number uk-text-left" id="rough-value"><span className="uk-text-bold">Roughness: </span>{roughness}% ({Math.ceil(roughness * 2.55).toString(16).toUpperCase()})</p>

											<br />
											<a uk-tooltip = "Get a link to the configuration you've made. Save it or share it with others!" className="uk-button uk-button-default uk-align-right uk-width-1-1" href={link} onClick={() => {
												navigator.clipboard.writeText("https://gabirmotors.com/specmapping" + link)
												setCopied(true);
												setTimeout(() => { setCopied(false) }, 5000)
											}}>Click to Share</a>

											<p className="uk-text-warning uk-text-left"><span className = "uk-text-bold"><span uk-icon="icon: warning"></span> Warning!</span> Some images may take a while to load</p>

										</div>

										<div className = "uk-padding-small">
											<img id="black" src = {`https://i.gabirmotors.com/siteimages/${car}/grid-black.jpg`} style={{ display: "none" }} alt="grid-black" />
											<img id="blue" src = {`https://i.gabirmotors.com/siteimages/${car}/grid-blue.jpg`} style={{ display: "none" }} alt="grid-blue" />
											<img id="red" src = {`https://i.gabirmotors.com/siteimages/${car}/grid-red.jpg`} style={{ display: "none" }} alt="grid-red" />
											<img id="green" src = {`https://i.gabirmotors.com/siteimages/${car}/grid-green.jpg`} style={{ display: "none" }} alt="grid-green" />
											<canvas className="tools-canvas uk-box-shadow-small" id="canvas" width="600" height="400"></canvas>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)
			}
		</>
	)
}

export default SpecMap;