/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Loading from "../../components/LoadingIcon/Loading";
import { Standing } from '../../interfaces';

const SpecMap = () => {
	const [loading, setLoading] = useState(true);
	const [color, setColor] = useState("#000000");
	const [metallic, setMetallic] = useState(0);
	const [roughness, setRoughness] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000)
	}, [])

	useEffect(() => {
		drawCar(color, metallic, roughness)
	}, [color, metallic, roughness])

	function drawImage(ctx: any, image: any, metal: number, rough: number, alpha = 1.0, mode = "copy") {
		ctx.save();
		ctx.globalAlpha = alpha;
		ctx.globalCompositeOperation = mode;

		var w = image.width / 11;
		var h = image.height / 11;

		console.log(w, h)

		var xOffset = w * rough;
		var yOffset = h * metal;

		ctx.drawImage(image, xOffset, yOffset, w, h, 100, 100, w, h);
		ctx.restore();
	}

	function drawCar(hexRGB: string, metalPct: number, roughPct: number) {
		var rough = roughPct / 10;
		var metal = metalPct / 10;

		if (hexRGB.substring(0, 1) == "#") {
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

	const changeColor = (e: any) => setColor(e.target.value)
	const changeMetal = (e: any) => setMetallic(e.target.value * 10)
	const changeRough = (e: any) => setRoughness(e.target.value * 10)

	return (
		<>
			<Header title="Gabir Motors | Spec Mapping" />
			{loading && <Loading />}
			{
				!loading && (
					<>
						<div className="uk-height-large uk-background-cover uk-light uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', minHeight: '100vh', height: 'auto' }}>
							<div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-container uk-position-center">
								<div className="uk-animation-slide-top-medium uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large" style={{ maxHeight: '95vh' }}>
									<h2>Pick a Color to Get Started</h2>
									<label htmlFor="color">Choose a Color:</label> <input type="color" id="color" value={color} onChange={changeColor} /><br />
									<label htmlFor="metallic">Metallic</label> <input type="range" min="0" max="10" value={metallic / 10} id="metallic" onChange={changeMetal} /><br />
									<label htmlFor="rough">Roughness</label> <input type="range" min="0" max="10" value={roughness / 10} id="rough" onChange={changeRough} /><br />
									<img id="black" src="https://i.gabirmotors.com/siteimages/grid-black.jpg" style={{ display: "none" }} />
									<img id="blue" src="https://i.gabirmotors.com/siteimages/grid-blue.jpg" style={{ display: "none" }} />
									<img id="red" src="https://i.gabirmotors.com/siteimages/grid-red.jpg" style={{ display: "none" }} />
									<img id="green" src="https://i.gabirmotors.com/siteimages/grid-green.jpg" style={{ display: "none" }} />
									<canvas id="canvas" width="600" height="400"> </canvas>

									<p id="color-value">Current Color: {color}</p>
									<p id="metal-value">Metallic: {Math.ceil(metallic * 2.55).toString(16).toUpperCase()}</p>
									<p id="rough-value">Roughness: {Math.ceil(roughness * 2.55).toString(16).toUpperCase()}</p>
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