import React from 'react'
import { useEffect, useState } from 'react';
import { Image } from '../../../../interfaces';
import qs from 'qs';

const MainShowoff = (props: any) => {
    const [images, setImages] = useState([]);

    let time = 3000;

    console.log(qs.parse(props.location.hash));
    
    if (qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#t`] !== undefined) {
        time = Number((qs.parse(props.location.hash, { ignoreQueryPrefix: true })[`#t`]));
    }

    useEffect(() => {
        const fetchImages = async () => {
            const res = await fetch('https://i.gabirmotors.com/manifest/checked');
            const data = await res.json();

            await setImages(data);
            
        }
        fetchImages();
    }, [])

    useEffect(() => {
        console.log(time)
        const fade = (i: number) => {
            setTimeout(function() {
                (document.getElementById(`${i}`) as HTMLInputElement)!.style.opacity = "100"
                if (i > 0) {
                    (document.getElementById(`${i-1}`) as HTMLInputElement)!.style.opacity = "0"
                } else {
                    (document.getElementById(`${images.length - 1}`) as HTMLInputElement)!.style.opacity = "0"
                }
                if (i === images.length - 1) {
                    for (var j = 0; j < images.length; j ++) {
                        fade(j)
                    }
                }
            }, time*i)
        }
        for (var i = 0; i < images.length; i ++) {
            fade(i)
        }
    }, [images])

    return (
        <div>
            {
                images.length && (
                    images.map((i:Image, id:number) => (
                        <div id = {`${id}`} className = "uk-position-center" style = {{ opacity: '0', transition: '0.5s' }}>
                            <img src = {i.path} style = {{
                                maxWidth: '50vw',
                                minWidth: '25vw',
                                boxShadow: '2px 2px 2px 2px #fffff'
                            }} alt = {i.oldName}/><br />
                            <span className = "uk-text-justify" style = {{ color: 'white', fontSize: '20px'}}>{i.data.description}</span><br />
                            <span className = "uk-text-justify" style = {{ color: 'white', fontSize: '20px'}}>Submitted By: {i.user.name}</span>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default MainShowoff
