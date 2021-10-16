import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/LoadingIcon/Loading";
import { useState, useEffect } from "react";
import { Race } from '../interfaces';
import Alert from '../components/Alert/index';
import qs from 'qs';
import { Notification, Area } from '../components/Notification/index'

const MainBody = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [urlQuery, setUrlQuery] = useState(qs.parse(props.location.search, { ignoreQueryPrefix: true }));
  const [next, setNext] = useState<Race>({
    "tags": {
      "paid": {
        "track": false,
        "car": []
      },
      "tags": [
        "note"
      ],
      "notes": null,
      "winnerNumber": null,
      "winner": null,
      "theme": null
    },
    "car": [
      "N/A"
    ],
    "date": "",
    "timestamp": 0,
    "track": "",
    "id": "0",
  });

  const codes = ["RACECAR", "NOTLAST", "PODIUM", "COLDTIRES", "GABIR"];

  function timeConverter(UNIX_timestamp:number){
    var a = new Date(UNIX_timestamp * 1000);;
    var year = a.getFullYear();
    var month = a.getMonth() + 1 < 10 ? "" + String(a.getMonth() + 1) : String(a.getMonth() + 1);
    var date = "0" + a.getDate();
    var hour = "0" + a.getHours();
    var min = "0" + a.getMinutes();
    var sec = "0" + a.getSeconds();
    var s = `${year}-${month}-${date.substr(-2)}T${hour.substr(-2)}:${min.substr(-2)}:${sec.substr(-2)}-07:00`
    return s
  }

  const fetchCal = async () => {
    const res = await fetch(`https://api.gabirmotors.com/calendar`)
    const data:Race[] = await res.json()
    
    return data.sort((a:Race, b:Race) => { return a.timestamp - b.timestamp })
  }

  useEffect(() => {
    (async () => {
      var cal = await fetchCal();
      var done = false;

      for (var i = 0; i < cal.length; i ++) {
        console.log(cal[i].timestamp * 1000 + 9000000 + " > " + Date.now() + " = " + (cal[i].timestamp * 1000 + 9000000 > Date.now()))
        if (cal[i].timestamp * 1000 + 9000000 > Date.now() && !done) {
          done = true;
					console.log("Setting Time...")
          setNext(cal[i]);
        }
      }
    })()

    setTimeout(() => {
      setLoading(false);
    }, 1500)

    var startTime = '19:30:00';
    var endTime = '21:30:00';

    var currentDate = new Date()   

    var startDate = new Date(currentDate.getTime());
    startDate.setHours(Number(startTime.split(":")[0]));
    startDate.setMinutes(Number(startTime.split(":")[1]));
    startDate.setSeconds(Number(startTime.split(":")[2]));

    var endDate = new Date(currentDate.getTime());
    endDate.setHours(Number(endTime.split(":")[0]));
    endDate.setMinutes(Number(endTime.split(":")[1]));
    endDate.setSeconds(Number(endTime.split(":")[2]));

    setIsLive(startDate < currentDate && endDate > currentDate && currentDate.getDay() == 4);
  }, [])


  return (
    <>
      <Header title="Gabir Motors | Home" />
      {loading && <Loading />}

      {!loading && (
        <>
          {
            urlQuery?.error && urlQuery.error === "noteam" && (
              <Alert type = "danger" title = "Error!" text = "Error with retrieving the given team" />
            )
          }

          {
            urlQuery?.success && urlQuery.success === "quotesubmit" && (
              <Alert type = "success" title = "Success!" text = "Your quote has been recieved, thank you!" />
            )
          }

          {
            urlQuery?.success && urlQuery.success === "haikusubmit" && (
              <Alert type = "success" title = "Success!" text = "Your haiku has been recieved, thank you!" />
            )
          }        

          <Area>
            {isLive && (
              <>
                <Notification icon = "twitch" link = "https://gabirmotors.com/live">
                  The League is Live RIGHT NOW!!! Click to watch
                </Notification>
              </>
            )}
          </Area>

          <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
            <div className="uk-offcanvas-bar">
              <img src="img/NorthernHarbor.png" alt="Northern Harbor Logo" />
              <h2>
                Get <strong>20%</strong> off your next order at Northern Harbor
              </h2>
              <h4>
                Use code{" "}
                <code>{codes[Math.floor(Math.random() * codes.length)]}</code>{" "}
                for 20% off any of Northern Harbor's beef based seafood
                products!
              </h4>
              <blockquote>
                <p className="uk-text-muted">
                  Northern Harbor is the world's premier provider of meat-based
                  fish substitutes. With mouth-watering favorites like our
                  Bone-In Fysh Wyngz, our succulent Fishey Mignon, and our new
                  You'll Swear It's Beef line of Shramp and Crobb crostini,
                  we've got something for every person who wants to ask for fish
                  but actually get beef.{" "}
                </p>
                <footer>Northern Harbor</footer>
              </blockquote>
            </div>
          </div>
          <div
            className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover"
            style={{
              backgroundImage: "url(img/gabir_bg.jpg)",
              height: "100vh",
            }}
          >
            <div className="uk-child-width-1-4 uk-text-center uk-position-top-center" uk-grid = "true" uk-scrollspy="cls: uk-animation-slide-top-medium; target: .fade-cd; delay: 400;" uk-countdown={`date: ` + timeConverter(next.timestamp + 9000)} uk-parallax="blur: 15;">
              <div className = "uk-width-1-1">
                <h1 className = "fade-cd uk-text-center uk-display-block">NEXT RACE IN</h1>
              </div>
              <div className = "fade-cd">
                <span className="acumin uk-countdown-number uk-countdown-days"></span>
                <div className="acumin uk-countdown-label">Days</div>
              </div>
              <div className = "fade-cd">
                <span className="acumin uk-countdown-number uk-countdown-hours"></span>
                <div className="acumin uk-countdown-label">Hours</div>
              </div>
              <div className = "fade-cd">
                <span className="acumin uk-countdown-number uk-countdown-minutes"></span>
                <div className="acumin uk-countdown-label">Minutes</div>
              </div>
              <div className = "fade-cd">
                <span className="acumin uk-countdown-number uk-countdown-seconds"></span>
                <div className="acumin uk-countdown-label">Seconds</div>
              </div>
            </div>
            <h1
              className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container uk-display-block"
              uk-parallax="blur: 15;"
            >
              <img
                uk-toggle="target: #offcanvas-flip"
                alt="Gabir Motors Logo"
                src="img/newgabirtext.png"
                uk-parallax="scale:1.2"
              />
            </h1>
            <div uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 1800">
              <div
                className="uk-position-center"
                style={{ top: "75vh" }}
                uk-parallax="blur: 7;"
              >
                <h3>
                  <a href="#mike" className="uk-button uk-button-default">
                    Meet the team
                  </a>
                  {/* <Button type = "success" /> */}
                </h3>
              </div>
            </div>
            <Footer />
          </div>

          <div
            className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed text-shadow"
            style={{ backgroundImage: "url(img/image.jpg)", height: "auto" }}
          >
            <div
              className="uk-child-width-auto uk-margin uk-child-width-1-1@m"
              uk-grid
            >
              <div>
                <br />
                <div
                  id="mike"
                  className="uk-child-width-expand@m uk-text-center uk-grid-match text-shadow"
                  uk-grid="parallax: 100"
                  uk-scrollspy="cls: uk-animation-slide-left-small; target: .fade-p2; delay: 100"
                >
                  <div>
                    <div
                      className="uk-grid-margin"
                      style={{ height: "55vh", width: "50vw" }}
                    >
                      <img
                        className="fade-p2"
                        src="img/MikeRacecar.png"
                        alt="Mike Racecar"
                        style={{ height: "55vh", width: "auto" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ width: "45vw" }}>
                      <h2 className="fade-p2">Mike Racecar</h2>
                      <p className="fade-p2 bio-p uk-text-left">
                        His momma was a V6 and his daddy is the track.
                        Metaphorically speaking. But he was born in the backseat
                        of a stock car, that much we know for certain, because
                        that car is now in a museum - the Mike Racecar Museum.
                        In 2007, he fell asleep during a race and still won. He
                        can't read nothing but the road, and the only number he
                        can count to is "1st."
                      </p>
                    </div>
                    <div>
                      <blockquote cite="#" className="fade-p2">
                        <p className="uk-margin-small-bottom">
                          The tallest flowers get cut, don't try to be good at
                          anything.
                        </p>
                        <footer>
                          <cite>
                            <a
                              target="_new"
                              href="https://twitter.com/cwgabriel"
                            >
                              Mike Racecar
                            </a>
                          </cite>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  id="jerry"
                  className="uk-child-width-expand@m uk-text-center uk-grid-match text-shadow"
                  uk-grid="parallax: 100"
                  uk-scrollspy="cls: uk-animation-slide-right-small; target: .fade-p3; delay: 100;"
                >
                  {/*Not Visible except on mobile (To make it easier to read)*/}
                  <div className="uk-hidden@m">
                    <div
                      className="uk-grid-margin"
                      style={{ height: "55vh", width: "50vw" }}
                    >
                      <img
                        className="fade-p3"
                        src="img/intro.png"
                        alt="Carson Bolt"
                        style={{ height: "55vh", width: "auto" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ width: "45vw" }}>
                      <h2 className="fade-p3">Carson Bolt</h2>
                      <p className="fade-p3 bio-p uk-text-left">
                        It's said the man eats rubber and drinks gasoline, just
                        like the cars he loves so well. A driver himself until
                        an accident at the KFC Lunch buffet twenty years ago,
                        he's since become a second father to many - and a first
                        father to some. Topped up on his signature "Goose
                        Juice," the recipe for which is best left unsaid, he
                        rules the race from his roost in the spotter tower -
                        giving Mr. Racecar the edge he needs.
                      </p>
                    </div>
                    <div>
                      <blockquote cite="#" className="fade-p3">
                        <p className="uk-margin-small-bottom">
                          Sometimes your worst nights, are your best nights.
                        </p>
                        <footer>
                          <cite>
                            <a
                              target="_new"
                              href="https://twitter.com/TychoBrahe"
                            >
                              Carson Bolt
                            </a>
                          </cite>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                  <div>
                    <div
                      className="uk-grid-margin uk-visible@m"
                      style={{ height: "55vh", width: "50vw" }}
                    >
                      <img
                        className="fade-p3"
                        src="img/intro.png"
                        alt="Carson Bolt"
                        style={{ height: "55vh", width: "auto" }}
                        uk-img
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div
                  id="kara"
                  className="uk-child-width-expand@m uk-text-center uk-grid-match text-shadow"
                  uk-grid="parallax: 100"
                  uk-scrollspy="cls: uk-animation-slide-left-small; target: .fade-p4; delay: 100;"
                >
                  <div>
                    <div
                      className="uk-grid-margin"
                      style={{ height: "55vh", width: "50vw" }}
                    >
                      <img
                        className="fade-p4"
                        src="img/kara.png"
                        alt="Kara"
                        style={{ height: "55vh", width: "auto" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ width: "45vw" }}>
                      <h2 className="fade-p4">Kara</h2>
                      <p className="fade-p4 bio-p uk-text-left">
                        Kara is many things. Wife to one, Mother to some and
                        loved by all, she is the prettiest spotter in racing!
                        Trust me, when you're riding one of these 3,200 pound
                        steel beasts out of turn four at Daytona and you don't
                        even know your own name anymore much less what the hell
                        is going on outside your 200 MPH coffin, well, she's
                        that calm voice in your ear like an angel of God calling
                        you home to the finish line.{" "}
                      </p>
                    </div>
                    <div>
                      <blockquote cite="#" className="fade-p4">
                        <p className="uk-margin-small-bottom">
                          What?! You're insane!
                        </p>
                        <footer>
                          <cite>
                            <a
                              target="_new"
                              href="https://twitter.com/karajanae"
                            >
                              Kara
                            </a>
                          </cite>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  id="gabe"
                  className="uk-child-width-expand@m uk-text-center uk-grid-match text-shadow"
                  uk-grid="parallax: 100"
                  uk-scrollspy="cls: uk-animation-slide-right-small; target: .fade-p5; delay: 100;"
                >
                  {/*Not Visible except on mobile (To make it easier to read)*/}
                  <div className="uk-hidden@m">
                    <div
                      className="uk-grid-margin"
                      style={{ height: "55vh", width: "50vw" }}
                    >
                      <img
                        className="fade-p5"
                        src="img/gabe.png"
                        alt='Gabe "The Younger"'
                        style={{ height: "55vh", width: "auto" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ width: "45vw" }}>
                      <h2 className="fade-p5">Gabe "The Younger"</h2>
                      <p className="fade-p5 bio-p uk-text-left">
                        Gabe The Younger leapt fully-formed from the trunk of a
                        moving 1969 Pontiac GTO and he's been going fast ever
                        since. Catch the heir to the Gabir Motors family
                        business in front of - and, crucially - behind the
                        scenes, making websites like this one and spotting live
                        on streams.
                      </p>
                    </div>
                    <div>
                      <blockquote cite="#" className="fade-p5">
                        <p className="uk-margin-small-bottom">
                          I don't promise anything.
                        </p>
                        <footer>
                          <cite>
                            <a
                              target="_new"
                              href="https://twitter.com/gabekrahulik"
                            >
                              Gabe "The Younger"
                            </a>
                          </cite>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                  <div>
                    <div
                      className="uk-grid-margin uk-visible@m"
                      style={{ height: "55vh", width: "50vw" }}
                    >
                      <img
                        className="fade-p5"
                        src="img/gabe.png"
                        alt='Gabe "The Younger"'
                        style={{ height: "55vh", width: "auto" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainBody;
