/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import qs from 'qs';
import { Notification, Area } from '../../components/Notification/index'
import Blank from '../../Templates/Blank/index';
import Modal from 'react-modal';

type Car = {
	name: string;
	id: string;
	images: Image[];
}

type Image = {
	name: string;
	path: string;
}

const ColorTemplate = (props: any) => {
	// The inputs, either from the url or the ui
	const urlParams = qs.parse(props.location.hash, { ignoreQueryPrefix: true })
	const [color1, setColor1] = useState((urlParams[`#color1`] !== undefined ? String(urlParams[`#color1`]) : "#FF0000"));
	const [color2, setColor2] = useState((urlParams[`color2`] !== undefined ? String(urlParams[`color2`]) : "#00FF00"));
	const [color3, setColor3] = useState((urlParams[`color3`] !== undefined ? String(urlParams[`color3`]) : "#0000FF"));
	const [car, setCar] = useState((urlParams[`car`] !== undefined ? String(urlParams[`car`]) : "mazdamx52016"));
	const [template, setTemplate] = useState((urlParams[`template`] !== undefined ? String(urlParams[`template`]) : "001"));
	
	// controls the "link copied" pop up
	const [copied, setCopied] = useState(false);

	// If the user should continue to the tool on a smaller screen
	const [c, setC] = useState(false);

	// The link to copy
	const [link, setLink] = useState(`#color1=${color1}&color2=${color2}&color3=${color3}&car=${car}&template=${template}`);

	// this will be filled with the list of car images
	const [carsList, setCarsList] = useState<Car[]>([]);

	// Size of the canvas
	const [size, setSize] = useState(600);

	// Array of available templates
	const [templates, setTemplates] = useState<Image[]>([]);

 	const [modalIsOpen, setIsOpen] = useState(false);

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			backgroundColor: "#222222",
			width: "50vw",
			maxWidth: "780px",
			border: "0px",
			borderRadius: "0px",
		},
		overlay: {
			backgroundColor: "rgba(0,0,0,0.5)"
		}
	};

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function parseColor(colorHex: string) {
		if(colorHex.substring(0,1) === "#") {
			colorHex = colorHex.substring(1);
		}
		
		let r = parseInt(colorHex.substr(0,2),16);
		let g = parseInt(colorHex.substr(2,2), 16);
		let b = parseInt(colorHex.substr(4,2), 16);
		
		return {
			r: r/255,
			g: g/255,
			b: b/255
		};
	}

	function drawTemplateCustomBlend(templateUrl: string, color1: string, color2: string, color3: string) {
		let img = document.getElementById('template') as HTMLImageElement;
		
		if (!img) return;

		img.crossOrigin = "anonymous";
		img.onload = function() {
			let c1 = parseColor(color1);
			let c2 = parseColor(color2);
			let c3 = parseColor(color3);
			
			let canvas = document.getElementById('canv') as HTMLCanvasElement;
			if (!canvas) return;
			let ctx = canvas.getContext('2d');
			if (!ctx) return;
			ctx.save();

			// draw the image onto the canvas first
			ctx.drawImage(img, 0, 0, size, size);
			
			// for each pixel, multiply our colors by the red/green/blue content of the pixel appropriately, then clamp it to 0/255
			let imageData = ctx.getImageData(0,0,size,size);
			for(let x=0; x<size; ++x)	{
				for(let y=0; y<size; ++y) {
					let pixelIndex = y * (size*4) + x*4;
					
					let pR = imageData.data[pixelIndex];
					let pG = imageData.data[pixelIndex+1];
					let pB = imageData.data[pixelIndex+2];
					let pA = imageData.data[pixelIndex+3];
	
					let r = pR * c1.r + pG * c2.r + pB * c3.r;
					let g = pR * c1.g + pG * c2.g + pB * c3.g;
					let b = pR * c1.b + pG * c2.b + pB * c3.b;
	
					let max = Math.max(r,g,b);
					if(max > 255) {
						r = r * (255/max);
						g = g * (255/max);
						b = b * (255/max);
					}
					
					imageData.data[pixelIndex] = r|0;
					imageData.data[pixelIndex+1] = g|0;
					imageData.data[pixelIndex+2] = b|0;
				}
			}
			
			ctx.putImageData(imageData,0,0);
			ctx.restore();
		};	
		if(templateUrl) {
			img.src = templateUrl;
		}
	}

	function download(){
		var canvas = document.getElementById("canv") as HTMLCanvasElement;
		var url = canvas?.toDataURL("image/png");
		var link = document.createElement('a');
		link.download = car + '_template.png';
		link.href = url;
		link.click();
	  }

	useEffect(() => {
		const fetchCars = async () => {
			const res = await fetch("https://i.gabirmotors.com/templates");
			const data = await res.json();
			var cars = [];

			for (var i = 0; i < data.children.length; i ++) {
				console.log(data.children[i])
				cars.push({
					name: data.children[i].children[0].name.replace(".txt", ""),
					id: data.children[i].name,
					images: data.children[i].children.splice(1).map((i:any) => { return { name: i.name.replace(/\D/g,''), path: i.path } })
				})
			}

			setCarsList(cars);
		}

		fetchCars();
		setTimeout(() => {
			drawTemplateCustomBlend(`https://i.gabirmotors.com/templates/${car}/car_pattern_${template}.tga.PNG`, color1, color2, color3);
			for (var i = 0; i < carsList.length; i ++) {
				if (carsList[i].id === car) {
					setTemplates(carsList[i].images);
				}
			}
		}, 3000)
	}, [])

	useEffect(() => {
		drawTemplateCustomBlend(`https://i.gabirmotors.com/templates/${car}/car_pattern_${template}.tga.PNG`, color1, color2, color3);
		setLink(`#color1=${color1}&color2=${color2}&color3=${color3}&car=${car}&template=${template}`);
	}, [car, color1, color2, color3, template])

	useEffect(() => {
		for (var i = 0; i < carsList.length; i ++) {
			if (carsList[i].id === car) {
				setTemplates(carsList[i].images);
			}
		}
	}, [car, carsList])

	const changeCar = (e: any) => { setCar(e.target.value); }
	const changeColor1 = (e: any) => { setColor1(e.target.value); }
	const changeColor2 = (e: any) => { setColor2(e.target.value); }
	const changeColor3 = (e: any) => { setColor3(e.target.value); }
	const changeTemplateThumbnail = (e: any) => { setTemplate(e);}

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
			<Blank title="Color Templates">
				{/* <h1 className = "uk-margin-auto uk-text-center">Gabir Motors Spec Map Previsualization Tool</h1> */}

				<div className = {(c ? "uk-hidden" : "uk-hidden@m")}>
					<div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-container uk-position-center">
						<div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large" style={{ maxHeight: '95vh' }}>
							<span className="uk-text-danger uk-text-bold">This page is not designed for small screens</span><br /><br />
							<a href="#continue" onClick = {() => { setC(true) }} className="uk-button uk-button-danger">Continue Anyways</a>
						</div>
					</div>
				</div>

				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Example Modal"
				>
					<h1 style = {{ fontSize: '3em', color: "white" }}>Select a Template</h1>
					<div uk-grid = "true" className = "uk-width-1-1">
						{templates.map(i => {
							return (
								<div key = {i.name}>
									<a href = "#" onClick = {() => { 
										changeTemplateThumbnail(i.name)
									}}>
										<img src={`https://i.gabirmotors.com/templates/${car}/car_pattern_${i.name}.tga.PNG`} alt="" className = "template-image" style = {{ width: '6vw', border: `${template === i.name ? "3px solid white" : "0px"}` }} />
									</a>
								</div>
							)
						})}
					</div>
					<a href="#" onClick = {closeModal} className = "uk-button uk-button-danger uk-float-right">Close</a>
				</Modal>

				<div className={`${(c ? "uk-visible" : "uk-visible@m")} uk-text-left uk-position-center`}>
					<div>
						<div className="uk-padding-small uk-animation-fade uk-margin uk-width-1-1 uk-margin-auto uk-card uk-card-secondary uk-card-body uk-flex uk-flex-wrap">
					
							<div className = "uk-width-1-1@s uk-width-1-2@l">
								<h2 className = "uk-display-inline">Select Your Car &nbsp;&nbsp;</h2>
								<div uk-form-custom="target: > * > span:first-child" className = "uk-margin-bottom uk-marign-left">
									<select onChange = {changeCar} value = {car}>
										{carsList.map(i => (
											<option value = {i.id}>{ i.name }</option>
										))}
									</select>
									<button className="uk-button uk-button-default" type="button">
										<span></span>
										<span className = "uk-margin-small-left" uk-icon="icon: chevron-down"></span>
									</button>
								</div>
								
								<br />
								
								<div className="uk-margin-small-top" />
								<button onClick={openModal} className="uk-button uk-button-default" type="button">
									<span>Select a Template</span>
								</button>

								<br />
								<div className="uk-margin-small-top" />
								<h2 className = "uk-display-inline uk-margin-medium-top">Choose Your Colors &nbsp;&nbsp;</h2>
								
								<br/>
								
								<div>
									<div className = "uk-width-1-1 uk-flex">
										<div>
											<input type="color" id="color" value={color1} onChange={changeColor1} />
											<span className="uk-margin-bottom">
												<input className="uk-form-blank uk-text-primary uk-form-width-small uk-form-small color-input" type="text" placeholder="Color Hex" value = {color1} onChange={changeColor1} />
											</span>
										</div>

										<div>
											<input type="color" id="color" value={color2} onChange={changeColor2} />
											<span className="uk-margin-bottom">
												<input className="uk-form-blank uk-text-primary uk-form-width-small uk-form-small color-input" type="text" placeholder="Color Hex" value = {color2} onChange={changeColor2} />
											</span>
										</div>

										<div>
											<input type="color" id="color" value={color3} onChange={changeColor3} />
											<span className="uk-margin-bottom">
												<input className="uk-form-blank uk-text-primary uk-form-width-small uk-form-small color-input" type="text" placeholder="Color Hex" value = {color3} onChange={changeColor3} />
											</span>
										</div>
									</div>
								</div>
								
								<hr />

								<div className="uk-margin uk-width-1-1 uk-flex uk-flex-wrap">
									<div className = "uk-width-1-2">
										<a uk-tooltip = "Get a link to the configuration you've made. Save it or share it with others!" className="uk-button uk-button-default uk-align-right uk-width-1-1 uk-margin-remove-bottom" href={link} onClick={() => {
											navigator.clipboard.writeText("https://gabirmotors.com/colortemplate" + link)
											setCopied(true);
											setTimeout(() => { setCopied(false) }, 5000)
										}}>Click to Share</a>
									</div>

									<div className = "uk-width-1-2 ">
										<a uk-tooltip = "Download your new livery!" className="uk-button uk-button-default uk-align-right uk-width-1-1 uk-margin-remove-bottom" href={`/colortemplate/download` + link}>Download</a>
									</div>
								</div>

								<p className="uk-text-warning uk-text-left"><span className = "uk-text-bold"><span uk-icon="icon: warning"></span> Warning!</span> Some images may take a while to load</p>
								<p className="uk-text-success uk-text-left">Thank you <a href="https://www.tradingpaints.com/profile/666793/Zach-C-Miller" target = "_new" className = "uk-text-bold">Bracket (Zach M.)</a> for the code help and images!</p>

							</div>

							<div className = "uk-padding-small uk-width-1-1@s uk-width-1-2@l">				
								<img id="template" style={{display: "none"}} width = {size + "px"} height = {size + "px"}/>
								<svg width="0" height="0">
								<filter id="cmatrix">
									<feColorMatrix id="cmatrix_params"
									in="SourceGraphic"
									type="matrix" 
									values="0 1 0 0 0
											0 0 1 0 0
											1 0 0 0 0
											0 0 0 1 0" />
								</filter>
								</svg>
								<canvas id="canv" width = {size + "px"} height = {size + "px"} />
							</div>
						</div>
					</div>
				</div>
			</Blank>
		</>
	)
}

export default ColorTemplate;