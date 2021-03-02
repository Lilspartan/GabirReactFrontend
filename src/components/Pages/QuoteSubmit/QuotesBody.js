import QuoteForm from './QuoteForm'
import Header from '../../Header'

const HaikusBody = () => {
    var d = new Date();
    return (
        <>
            <Header title = "Gabir Motors | Quotes" />
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>
              <div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container">
                <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large">
						      <h3 className="uk-card-title uk-text-center">
                    <img src = "img/logo.png" alt = "GM logo" style = {{width: '10vw', height: 'auto', minWidth: '200px'}}/>
                 </h3>
						    <QuoteForm />
					      </div>
              </div>
              <div className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .fade-p1; delay: 500; repeat: true">
                <div>
                  <h4 className="fade-p1">{`Gabir Motors • ${d.getFullYear()}`}</h4>
                </div>
              </div>
            </div>
        </>
    )
}

export default HaikusBody