import { useState, useEffect } from "react";
import Loading from "../components/LoadingIcon/Loading";
import { Helmet } from 'react-helmet';

type Props = {
    number: number;
}

const MFT = () => {
    const [loading, setLoading] = useState(true);
    const [numOfMFTS, setNumOfMFTS] = useState(0);

    useEffect(() => {
        const getNum = async() => {
			const res = await fetch("https://i.gabirmotors.com/mfts");
			const data = await res.json();

			setNumOfMFTS(data.children.length)
		}

		getNum();

        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, [])

    const MFTCard = (props: Props) => {
        var image = `https://i.gabirmotors.com/MFTs/images/mft${props.number}.jpg`
        return (
            <div className = "uk-padding-medium" style = {{ marginTop: "20px" }}>
                <div className="uk-flex uk-flex-center uk-flex-middle">
                    <div className="uk-display-block uk-card uk-card-secondary uk-link-toggle uk-card-hover">
                        <div className="uk-card-media-top">
                            <img src={image} alt="" style = {{ width: '1000px' }} className = "uk-box-shadow-large" />
                        </div>
                        <div className="uk-card-body">
                            <h1 style = {{ letterSpacing: "0.6px", fontSize: "36px"}} className="uk-card-title">Merch MFT #{props.number}</h1>
                            <span className="uk-text-primary uk-text-bold">Price:</span> <span className="uk-icon uk-icon-image" style={{backgroundImage: "url(img/small_logo.png)" }}></span> {(Math.random() * 100).toFixed(2)}
                            <br />
                            <a href={image} target = "_new" className = "uk-button uk-button-default uk-margin-small mft_buy"><span uk-icon="icon: cart;"></span> Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>{`Gabir Motors X MFT`}</title>
                <meta name = "description" content = "Gabir Motors has partnered with MFTs to bring you the world's FIRST MFT marketplace!" />
                <meta content="Gabir Motors X MFT" property="og:title" />
                <meta content="Gabir Motors has partnered with MFTs to bring you the world's FIRST MFT marketplace!" property="og:description" />
                <meta name="Gabir Motors X MFT" content="Gabir Motors" />
                <meta name="twitter:description" content="Gabir Motors has partnered with MFTs to bring you the world's FIRST MFT marketplace!" />
            </Helmet>

            {loading && <Loading />}

            {!loading && (
                <>
                    <nav className="uk-navbar-container" uk-navbar = "true" style = {{ backgroundColor: "#222222", color: "white", padding: "20px" }}>
                        <div className="uk-navbar-center">
                            <a className="uk-navbar-item uk-logo" href="#">
                                <img src="https://i.gabirmotors.com/assets/teams/GM/main.png" style = {{ height: "4rem" }} />
                                <span uk-icon="icon: close; ratio: 2.5" style = {{ color: "white", fontWeight: "bolder" }}></span>
                                <img src="https://i.gabirmotors.com/MFTs/mftlogo.png" style = {{ height: "4rem" }} />
                            </a>
                        </div>
                    </nav>
                    <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', height: 'auto', paddingBottom: "5vh", minHeight: "100vh" }}>
                        <div className = "uk-child-width-1-1@s uk-child-width-1-5@m" style = {{ padding: "40px"}} uk-grid="true">
                            {Array(numOfMFTS).fill(" ").map((h, i) => <MFTCard number = {i + 1} />)}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default MFT
