import QuoteForm from '../components/QuoteForm'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoTab from '../components/InfoTab'

const HaikusBody = () => {
    return (
        <>
            <Header title = "Gabir Motors | Quotes" />

            <InfoTab>
                <h2>Submit a quote</h2>
                <p>
                  During the PA League stream on the <a href = "https://www.twitch.tv/pennyarcade">Penny Arcade</a> Twitch channel, quotes from the streams, submitted by the chat scroll during the intro. This is where you can submit one of those quotes.
                </p>
            </InfoTab>

            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>
              <div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container">
                <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large">
						      <h3 className="uk-card-title uk-text-center">
                    <img src = "img/logo.png" alt = "GM logo" style = {{width: '10vw', height: 'auto', minWidth: '200px'}}/>
                 </h3>
						    <QuoteForm />
					      </div>
              </div>
              <Footer />
            </div>
        </>
    )
}

export default HaikusBody