import { IoChevronDownSharp } from 'react-icons/io5'
import Header from './Header'

const MainBody = ({ haikus }) => {
  var d = new Date();
  return (
    <>
      <Header title = "Gabir Motors | Home" />
      
      <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh' }}>
        {/*
        <div className = "uk-position-top-center uk-padding-large uk-center uk-position-large">
          <Alert body = "This alert is just a test" type = "success" />
        </div>
        */}
        <h1 className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container uk-display-block" uk-parallax="blur: 10;">
          <img src = "img/newgabirtext.png/" />
        </h1>
        <div uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 2000">
          <div className="uk-position-center" style={{ top: '60vh' }} uk-parallax="blur: 7;">
            <h3><IoChevronDownSharp /> Scroll Down <IoChevronDownSharp /></h3>
          </div>
        </div>
        <div className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .fade-p1; delay: 500; repeat: true">
          <div>
            <h4 className="fade-p1" uk-parallax="blur: 7;">{`Gabir Motors • ${d.getFullYear()}`}</h4>
          </div>
        </div>
      </div>

      <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/image.jpg)', height: 'auto' }}>
        <div className="uk-child-width-auto uk-margin uk-child-width-1-1@m" uk-grid>
          <div>
            <br />
            <div id="mike" className="uk-child-width-expand@m uk-text-center uk-grid-match" uk-grid="parallax: 100" uk-parallax="" uk-scrollspy="cls: uk-animation-slide-left-small; target: .fade-p2; delay: 100; repeat: true">
              <div>
                <div className="uk-grid-margin" style={{ height: "55vh", width: '50vw' }}>
                  <img className="fade-p2" src="img/MikeRacecar.png" alt="Mike Racecar" style={{ height: "55vh", width: 'auto' }} uk-img />
                </div>
              </div>
              <div>
                <div style={{ width: '45vw' }}>
                  <h2 className="fade-p2">Mike Racecar</h2>
                  <p className="fade-p2 bio-p uk-text-left">His momma was a V6 and his daddy is the track.  Metaphorically speaking.  But he was born in the backseat of a stock car, that much we know for certain, because that car is now in a museum - the Mike Racecar Museum.  In 2007, he fell asleep during a race and still won.  He can't read nothing but the road, and the only number he can count to is "1st."</p>
                </div>
                <div>
                  <blockquote cite="#" className="fade-p2">
                    <p className="uk-margin-small-bottom">The tallest flowers get cut, don't try to be good at anything.</p>
                    <footer><cite><a href="#mike">Mike Racecar</a></cite></footer>
                  </blockquote>
                </div>
              </div>
            </div>
            <br />
            <div id="jerry" className="uk-child-width-expand@m uk-text-center uk-grid-match" uk-grid="parallax: 100" uk-parallax="" uk-scrollspy="cls: uk-animation-slide-right-small; target: .fade-p3; delay: 100; repeat: true">
              {/*Not Visible except on mobile (To make it easier to read)*/}
              <div className="uk-hidden@m">
                <div className="uk-grid-margin" style={{ height: "55vh", width: '50vw' }}>
                  <img className="fade-p3" src="img/intro.png" alt="Carson Bolt" style={{ height: "55vh", width: 'auto' }} uk-img />
                </div>
              </div>
              <div>
                <div style={{ width: '45vw' }}>
                  <h2 className="fade-p3">Carson Bolt</h2>
                  <p className="fade-p3 bio-p uk-text-left">It's said the man eats rubber and drinks gasoline, just like the cars he loves so well.  A driver himself until an accident at the KFC Lunch buffet twenty years ago, he's since become a second father to many - and a first father to some.  Topped up on his signature "Goose Juice," the recipe for which is best left unsaid, he rules the race from his roost in the spotter tower - giving Mr. Racecar the edge he needs.</p>
                </div>
                <div>
                  <blockquote cite="#" className="fade-p3">
                    <p className="uk-margin-small-bottom">Sometimes your worst nights, are your best nights.</p>
                    <footer><cite><a href="#jerry">Carson Bolt</a></cite></footer>
                  </blockquote>
                </div>
              </div>
              <div>
                <div className="uk-grid-margin uk-visible@m" style={{ height: "55vh", width: '50vw' }}>
                  <img className="fade-p3" src="img/intro.png" alt="Carson Bolt" style={{ height: "55vh", width: 'auto' }} uk-img />
                </div>
              </div>
            </div>
            <br />
            <div id="kara" className="uk-child-width-expand@m uk-text-center uk-grid-match" uk-grid="parallax: 100" uk-parallax="" uk-scrollspy="cls: uk-animation-slide-left-small; target: .fade-p4; delay: 100; repeat: true">
              <div>
                <div className="uk-grid-margin" style={{ height: "55vh", width: '50vw' }}>
                  <img className="fade-p4" src="img/kara.png" alt="Kara" style={{ height: "55vh", width: 'auto' }} uk-img />
                </div>
              </div>
              <div>
                <div style={{ width: '45vw' }}>
                  <h2 className="fade-p4">Kara</h2>
                  <p className="fade-p4 bio-p uk-text-left">Kara is many things. Wife to one, Mother to some and loved by all, she is the prettiest spotter in racing! Trust me, when you're riding one of these 3,200 pound steel beasts out of turn four at Daytona and you don't even know your own name anymore much less what the hell is going on outside your 200 MPH coffin, well, she's that calm voice in your ear like an angel of God calling you home the the finish line. </p>
                </div>
                <div>
                  <blockquote cite="#" className="fade-p4">
                    <p className="uk-margin-small-bottom">What?! You're insane!</p>
                    <footer><cite><a href="#kara">Kara</a></cite></footer>
                  </blockquote>
                </div>
              </div>
            </div>
            <br />
            <div id="gabe" className="uk-child-width-expand@m uk-text-center uk-grid-match" uk-grid="parallax: 100" uk-parallax="" uk-scrollspy="cls: uk-animation-slide-right-small; target: .fade-p5; delay: 100; repeat: true">
              {/*Not Visible except on mobile (To make it easier to read)*/}
              <div className="uk-hidden@m">
                <div className="uk-grid-margin" style={{ height: "55vh", width: '50vw' }}>
                  <img className="fade-p5" src="img/gabe.png" alt='Gabe "The Younger"' style={{ height: "55vh", width: 'auto' }} uk-img />
                </div>
              </div>
              <div>
                <div style={{ width: '45vw' }}>
                  <h2 className="fade-p5">Gabe "The Younger"</h2>
                  <p className="fade-p5 bio-p uk-text-left">Gabe The Younger leapt fully-formed from the trunk of a moving 1969 Pontiac GTO and he's been going fast ever since.  Catch the heir to the Gabir Motors family business in front of - and, crucially - behind the scenes, making websites like this one and spotting live on streams.</p>
                </div>
                <div>
                  <blockquote cite="#" className="fade-p5">
                    <p className="uk-margin-small-bottom">I don't promise anything.</p>
                    <footer><cite><a href="#gabe">Gabe "The Younger"</a></cite></footer>
                  </blockquote>
                </div>
              </div>
              <div>
                <div className="uk-grid-margin uk-visible@m" style={{ height: "55vh", width: '50vw' }}>
                  <img className="fade-p5" src="img/gabe.png" alt='Gabe "The Younger"' style={{ height: "55vh", width: 'auto' }} uk-img />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainBody