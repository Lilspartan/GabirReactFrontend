import './style.scss'
import { useState, useEffect } from "react";
import { LoadingPage, Header } from "../../Components";

type Props = {
    title?: string;
    children?: any;
	loading?: boolean
	flex?: boolean
    otherBg?: boolean
}

const Blank = (props: Props) => {
    const [loading, setLoading] = useState((props.loading !== undefined ? props.loading : true));

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, [])

		const classes = `uk-height-large uk-background-cover uk-light ${props?.flex !== undefined ? (props.flex ? "uk-flex" : "") : "uk-flex"} uk-background-cover uk-background-fixed`

    return (
        <>
            <Header
                title={`Gabir Motors${props?.title ? " | " + props.title : ""}`}
            />
            {loading && <LoadingPage />}

            {!loading && (
                <div className={classes} style={{ backgroundImage: props.otherBg ? 'url(../../img/image.jpg)' : 'url(../../img/gabir_bg.jpg)', height: 'auto', paddingBottom: "5vh", minHeight: "100vh" }}>
                    { props?.children }   
                </div>
            )}
        </>
    )
}

export default Blank