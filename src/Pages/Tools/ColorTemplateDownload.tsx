/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import qs from 'qs';
import Blank from '../../Templates/Blank/index';

type Image = {
	name: string;
	path: string;
}

const ColorTemplateDownload = (props: any) => {
	// The inputs, either from the url or the ui
	const urlParams = qs.parse(props.location.hash, { ignoreQueryPrefix: true })
	const [color1, setColor1] = useState((urlParams[`#color1`] !== undefined ? String(urlParams[`#color1`]) : "#FF0000"));
	const [color2, setColor2] = useState((urlParams[`color2`] !== undefined ? String(urlParams[`color2`]) : "#00FF00"));
	const [color3, setColor3] = useState((urlParams[`color3`] !== undefined ? String(urlParams[`color3`]) : "#0000FF"));
	const [car, setCar] = useState((urlParams[`car`] !== undefined ? String(urlParams[`car`]) : "mx5"));
	const [template, setTemplate] = useState((urlParams[`template`] !== undefined ? String(urlParams[`template`]) : "001"));
	const [size, setSize] = useState(2048);

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
		
		if (!img) return false;

		img.crossOrigin = "anonymous";
		img.onload = function() {
			let c1 = parseColor(color1);
			let c2 = parseColor(color2);
			let c3 = parseColor(color3);
			
			let canvas = document.getElementById('canv') as HTMLCanvasElement;
			if (!canvas) return false;
			let ctx = canvas.getContext('2d');
			if (!ctx) return false;
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
            download();
            window.location.href = `/colortemplate#color1=${color1}&color2=${color2}&color3=${color3}&car=${car}&template=${template}`;
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
        setTimeout(() => {
            drawTemplateCustomBlend(`https://i.gabirmotors.com/templates/${car}/car_pattern_${template}.tga.PNG`, color1, color2, color3);
        }, 2500)
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<Blank title="Color Templates">
                <h1>Downloading Your livery... Please Wait</h1>
                <img id="template" style={{display: "none"}} width = {size + "px"} height = {size + "px"} alt = "Template for the chosen car"/>
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
                <canvas id="canv" width = {size + "px"} height = {size + "px"} style = {{ display: "none" }}/>
			</Blank>
		</>
	)
}

export default ColorTemplateDownload;