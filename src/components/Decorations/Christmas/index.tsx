import { useEffect } from 'react'
import '../style.scss'

const Christmas = () => {
    const makeLeaf = () => {
		var x = Math.floor(Math.random() * (window.innerWidth - 100));
		var leaf = Math.floor(Math.random() * 3) + 1;
		var animTime = Math.random() * 25
		var z = Math.round(Math.random());
		if (animTime < 15) animTime = 15;
		var isBig = Math.random() * 11

		var span = document.createElement('span');
		span.className = "snowflake layer-" + String(Math.floor(Math.random() * 3))
		var img = document.createElement('img');
		img.src = `https://i.gabirmotors.com/assets/other/christmas/flake${leaf}.png`;
		img.style.left = x + "px";
		img.style.animationDuration = animTime + "s"
		img.style.setProperty("--z", String(z))
		img.style.setProperty("--rotate1", String(Math.floor(Math.random() *61) - 30) + "deg");
		img.style.setProperty("--rotate2", String(Math.floor(Math.random() *61) - 30) + "deg");
		img.style.setProperty("--rotate3", String(Math.floor(Math.random() *61) - 30) + "deg");
		img.style.setProperty("--wobble1", String(Math.floor(Math.random() *61) - 30) + "px");
		img.style.setProperty("--wobble2", String(Math.floor(Math.random() *61) - 30) + "px");
		img.style.setProperty("--wobble3", String(Math.floor(Math.random() *61) - 30) + "px");
        
        if (isBig > 8) img.style.setProperty("--size", String(Math.random() * (200 - 140) + 140) + "px")
        else img.style.setProperty("--size", String(90) + "px")
        
        if (isBig > 8) img.style.setProperty("--blur", String(Math.random() * (6 - 4) + 4) + "px")
        else img.style.setProperty("--blur", String(3) + "px")
		span.appendChild(img)
		var leaves = document.getElementById("snowflakes")
		leaves?.appendChild(span);

        var snowflakes = document.getElementById("snowflakes")
		snowflakes?.appendChild(span);
		var innerSnowflakes = snowflakes?.getElementsByClassName("snowflake")

        setTimeout(function () {
            if (innerSnowflakes) innerSnowflakes[0].remove();
        }, animTime * 2000);

		setTimeout(makeLeaf, Math.random() * (500 - 2000) + 2000)
	}

	useEffect(() => {
		makeLeaf();
	}, [])

    return (
        <>
            <div id = "snowflakes">
            
		    </div>  
        </>
    )
}

export default Christmas
