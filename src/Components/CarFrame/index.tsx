import { useEffect } from "react";

const DEFAULT_STEPS = [
    "00", '19', '33', '4c', '66', '7f', '99', 'b2', 'cc', 'e5', 'ff',
]

let updateInterval;

function clamp(value: number, min = 0, max = 1) {
    return Math.min(max, (Math.max(value, min)));
}

let colorHex = "000000";
/**
 * Renders an image of a car with the given color, metal, roughness, and clearcoat values.
 * 
 * The frame expects an array of images to be stored in a subdirectory, one image for each combination of metallic, roughness, and clearcoat values. (And four images each for color, black, red, green, and blue). The images should be accessible at {imgPath}/(black|red|green|blue)/######{imgExt}. 
 */
function CarFrame(props: {
    /**
     * The individual hex value steps for the source images, when constructing them from the given metal, roughness, and clearcoat values.
     * 
     * Default is ['00', '19', '33', '4c', '66', '7f', '99', 'b2', 'cc', 'e5', 'ff']
     */
    steps?: string[],
    /**
     * The base path for fetching the source images.
     */
    imgPath: string,
    /**
     * The extension used for images. Default is "webp"
     */
    imgExt?: string,
    /**
     * A hex value for the color of the car to render, with or without a leading '#'.
     */
    color: string,
    /**
     * The metallic specular value.
     * 
     * If a number, should be between 0.0 and 1.0, and will use `steps` to convert to a string value to load the base image. If a string, will be used directly to load the image.
     */
    metal: number | string,
     /**
     * The roughness specular value.
     * 
     * If a number, should be between 0.0 and 1.0, and will use `steps` to convert to a string value to load the base image. If a string, will be used directly to load the image.
     */
    roughness: number| string,
   /**
     * The clearcoat specular value.
     * 
     * If a number, should be between 0.0 and 1.0, and will use `steps` to convert to a string value to load the base image. If a string, will be used directly to load the image.
     */
    clearcoat: number| string,
    /**
     * The width of the canvas, in pixels. Default is 800
     */
    width?: number,
    /**
     * The height of the canvas, in pixels. Default is 450
     */
    height?: number,
    /**
     * A CSS ID prefix to use for identifying the `img` and `canvas` elements needed to draw the image. Default is "specmap".
     */
    id?: string,
}) {
    const steps = props.steps || DEFAULT_STEPS;
    const color = props.color.substring(0,1) === "#" ? props.color.substring(1) : props.color;
    const imgExt = props.imgExt || 'webp';
    const width = props.width || 800;
    const height = props.height || 450;
    const id = props.id || "specmap"

    function getFromRange<T>(value: number, steps: T[] ): T {
        return steps[clamp(Math.floor(clamp(value) * steps.length), 0, steps.length-1)];
    }

    // construct image path
    const redVal = typeof props.metal === "string" ? props.metal : getFromRange(props.metal, steps);
    const blueVal =  typeof props.clearcoat === "string" ? props.clearcoat : getFromRange(props.clearcoat, steps);
    const greenVal =  typeof props.roughness === "string" ? props.roughness : getFromRange(props.roughness, steps);

    colorHex = `${redVal}${greenVal}${blueVal}`;

    function drawImage(context: CanvasRenderingContext2D, image: HTMLImageElement, alpha: number = 1.0, mode: any = "copy") {
        context.save();
        context.globalAlpha = clamp(alpha);
        context.globalCompositeOperation = mode;
        context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
        context.restore();
    }

    function drawCar() {

        const hexRGB = color;

        var r = parseInt(hexRGB.substr(0, 2), 16) / 255;
        var g = parseInt(hexRGB.substr(2, 2), 16) / 255;
        var b = parseInt(hexRGB.substr(4, 2), 16) / 255;

        //console.log("drawCar: ", r,g, b);

        const canvas = document.getElementById(`${id}-canvas`) as HTMLCanvasElement;
        const black = document.getElementById(`${id}-black`) as HTMLImageElement;
        const red = document.getElementById(`${id}-red`) as HTMLImageElement;
        const green = document.getElementById(`${id}-green`) as HTMLImageElement;
        const blue = document.getElementById(`${id}-blue`) as HTMLImageElement;

        if (black.complete && red.complete && green.complete && blue.complete) {
            const ctx = canvas.getContext('2d')!;

            drawImage(ctx, black);
            drawImage(ctx, red, r, "lighten");
            drawImage(ctx, green, g, "lighten");
            drawImage(ctx, blue, b, "lighten");
        }
    }

    // redraw car if color changes
    // useEffect(() => {
    //     clearTimeout(updateTimeout);
    //     updateTimeout = setTimeout(() => {
    //         colorHex = `${redVal}${greenVal}${blueVal}`;
    //         drawCar();
    //     }, 1000)
    // }, [props.color, props.clearcoat, props.metal, props.roughness])

    useEffect(() => {
            drawCar();
    }, [props])

    const blackImgSrc = `${props.imgPath}/black/${colorHex}.${imgExt}`;
    const redImgSrc = `${props.imgPath}/red/${colorHex}.${imgExt}`;
    const greenImgSrc = `${props.imgPath}/green/${colorHex}.${imgExt}`;
    const blueImgSrc = `${props.imgPath}/blue/${colorHex}.${imgExt}`;

    return <div style={{width: `${width}px`, height: `${height}px`}}>
        <img src={blackImgSrc} id={`${id}-black`} style={{ display: "none" }} onLoad={drawCar} />
        <img src={redImgSrc} id={`${id}-red`} style={{ display: "none" }} onLoad={drawCar} />
        <img src={greenImgSrc} id={`${id}-green`} style={{ display: "none" }} onLoad={drawCar} />
        <img src={blueImgSrc} id={`${id}-blue`} style={{ display: "none" }} onLoad={drawCar} />
        <canvas id={`${id}-canvas`} width={width} height={height} className = "tools-canvas uk-box-shadow-small uk-margin-auto" />
    </div>
}

export default CarFrame;