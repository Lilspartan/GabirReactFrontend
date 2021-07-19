import React from 'react'
import { useEffect, useState } from 'react';
import { Image } from '../interfaces';
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
    }, [images,time])

    return (
        <div className = "" style = {{
            height: '100vh'
        }}>
            {
                images.length && (
                    images.map((i:Image, id:number) => (
                        <div id = {`${id}`} className = "" style = {{ opacity: '0', transition: '0.5s', position: 'absolute', bottom: '0' }}>
                            <img src = {i.path} style = {{
                                maxWidth: '50vw',
                                minWidth: '25vw',
                                border: '5px solid white',
                                boxShadow: '0px 7px 38px 12px rgba(0,0,0,0.47)'
                            }} alt = {i.oldName}/><br />
                            <span className = "uk-text-justify" style = {{ color: 'white', fontSize: '40px', fontFamily: 'acumin-pro-extra-condensed, sans-serif' }}>{i.data.description}</span><br />
                            <span className = "uk-text-justify" style = {{ color: 'white', fontSize: '40px', fontFamily: 'acumin-pro-extra-condensed, sans-serif' }}>Submitted By: {i.user.name}</span>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default MainShowoff
