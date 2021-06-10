import Header from '../../Header'
import Footer from '../../Footer'

const fourBody = () => {
    return (
        <>
            <Header title = "Gabir Motors | 404" />
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>

                <h1 className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container uk-display-block">
                    <img alt = "Gabir Motors Logo" src = "img/newgabirtext.png" style={{height: 'auto', width: '30vw', minWidth: '300px', marginBottom: '60vh'}}/>
                </h1>

                <h1 className = "uk-position-center">
                    404 Page Not Found
                </h1>
               
                <Footer />
            </div>
        </>
    )
}

export default fourBody