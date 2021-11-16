import './style.scss'
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import Loading from "../../components/LoadingIcon/Loading";

type Props = {
    title?: string;
    children?: any;
}

const Blank = (props: Props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, [])

    return (
        <>
            <Header
                title={`Gabir Motors${props?.title ? " | " + props.title : ""}`}
            />
            {loading && <Loading />}

            {!loading && (
                <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', height: 'auto', paddingBottom: "5vh", minHeight: "100vh" }}>
                    { props?.children }   
                </div>
            )}]
        </>
    )
}

export default Blank
