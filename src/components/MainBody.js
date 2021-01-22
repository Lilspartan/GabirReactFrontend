const MainBody = ({ haikus }) => {
    var d = new Date();
    return (
        <>
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>

                <h1 className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container" uk-parallax = "blur: 10;">Welcome to Gabir Motors</h1>
                <div className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .fade-p1; delay: 500; repeat: true">
                    <div>
                        <h4 className="fade-p1" uk-parallax = "blur: 7;">{`Gabir Motors • ${d.getFullYear()}`}</h4>
                    </div>
                </div>
            </div>

            <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{backgroundImage: 'url(img/image.png)', height: 'auto'}}>

                <div className="uk-child-width-auto uk-margin uk-child-width-1-1@m" uk-grid>
                    <div>
                        <br/>
                        <div id = "mike" className="uk-child-width-expand@m uk-text-center uk-grid-match" uk-grid="parallax: 100" uk-parallax = "" uk-scrollspy="cls: uk-animation-slide-left-small; target: .fade-p2; delay: 100; repeat: true">
                            <div>
                                <div className="uk-grid-margin"  style = {{height: "55vh", width: '50vw'}}>
                                    <img className = "fade-p2" src="img/MikeRacecar.png" alt = "Mike Racecar" style = {{height: "55vh", width: 'auto'}} uk-img />
                                </div>
                            </div>
                            <div>
                                <div style = {{width: '45vw'}}>
                                    <h2 className = "fade-p2">Mike Racecar</h2>
                                    <p className = "fade-p2 bio-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                                <div>
                                    <blockquote cite="#" className = "fade-p2">
                                        <p class="uk-margin-small-bottom">The tallest flowers get cut, don't try to be good at anything.</p>
                                        <footer><cite><a href="#mike">Mike Racecar</a></cite></footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="uk-child-width-expand@m uk-text-center uk-grid-match" uk-grid="parallax: 100" uk-parallax = "" uk-scrollspy="cls: uk-animation-slide-right-small; target: .fade-p3; delay: 100; repeat: true">
                            {/*Not Visible except on mobile (To make it easier to read)*/}
                            <div className = "uk-hidden@m">
                                <div className="uk-grid-margin"  style = {{height: "55vh", width: '50vw'}}>
                                    <img className = "fade-p3" src="img/intro.png" alt = "Carson Bolt" style = {{height: "55vh", width: 'auto'}} uk-img />
                                </div>
                            </div>
                            <div>
                                <div style = {{width: '45vw'}}>
                                    <h2 className = "fade-p3">Carson Bolt</h2>
                                    <p className = "fade-p3 bio-p">Massa sed elementum tempus egestas sed. Mi bibendum neque egestas congue quisque egestas diam in arcu. Suspendisse sed nisi lacus sed viverra tellus in hac. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Euismod in pellentesque massa placerat duis ultricies lacus sed. Augue ut lectus arcu bibendum at. Posuere morbi leo urna molestie at elementum eu facilisis sed. Venenatis lectus magna fringilla urna porttitor. Odio euismod lacinia at quis risus sed. Volutpat sed cras ornare arcu dui. Sagittis nisl rhoncus mattis rhoncus urna.</p>
                                </div>
                                <div>
                                    <blockquote cite="#" className = "fade-p3">
                                        <p class="uk-margin-small-bottom">Sometimes your worst nights, are your best nights.</p>
                                        <footer><cite><a href="#">Carson Bolt</a></cite></footer>
                                    </blockquote>
                                </div>
                            </div>
                            <div>
                                <div className="uk-grid-margin uk-visible@m"  style = {{height: "55vh", width: '50vw'}}>
                                    <img className = "fade-p3" src="img/intro.png" alt = "Carson Bolt" style = {{height: "55vh", width: 'auto'}} uk-img />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="uk-child-width-expand@m uk-text-center uk-grid-match" uk-grid="parallax: 100" uk-parallax = "" uk-scrollspy="cls: uk-animation-slide-left-small; target: .fade-p4; delay: 100; repeat: true">
                            <div>
                                <div className="uk-grid-margin"  style = {{height: "55vh", width: '50vw'}}>
                                    <img className = "fade-p4" src="img/kara.png" alt = "Kara" style = {{height: "55vh", width: 'auto'}} uk-img />
                                </div>
                            </div>
                            <div>
                                <div  style = {{width: '45vw'}}>
                                    <h2 className = "fade-p4">Kara</h2>
                                    <p className = "fade-p4 bio-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                                <div>
                                    <blockquote cite="#" className = "fade-p4">
                                        <p class="uk-margin-small-bottom">What?! You're insane!</p>
                                        <footer><cite><a href="#">Kara</a></cite></footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="uk-child-width-expand@m uk-text-center uk-grid-match" uk-grid="parallax: 100" uk-parallax = "" uk-scrollspy="cls: uk-animation-slide-right-small; target: .fade-p5; delay: 100; repeat: true">
                            {/*Not Visible except on mobile (To make it easier to read)*/}
                            <div className = "uk-hidden@m">
                                <div className="uk-grid-margin"  style = {{height: "55vh", width: '50vw'}}>
                                    <img className = "fade-p5" src="img/gabe.png" alt = 'Gabe "The Younger"' style = {{height: "55vh", width: 'auto'}} uk-img />
                                </div>
                            </div>
                            <div>
                                <div style = {{width: '45vw'}}>
                                    <h2 className = "fade-p5">Gabe "The Younger"</h2>
                                    <p className = "fade-p5 bio-p">Massa sed elementum tempus egestas sed. Mi bibendum neque egestas congue quisque egestas diam in arcu. Suspendisse sed nisi lacus sed viverra tellus in hac. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Euismod in pellentesque massa placerat duis ultricies lacus sed. Augue ut lectus arcu bibendum at. Posuere morbi leo urna molestie at elementum eu facilisis sed. Venenatis lectus magna fringilla urna porttitor. Odio euismod lacinia at quis risus sed. Volutpat sed cras ornare arcu dui. Sagittis nisl rhoncus mattis rhoncus urna.</p>
                                </div>
                                <div>
                                    <blockquote cite="#" className = "fade-p5">
                                        <p class="uk-margin-small-bottom">I don't promise anything.</p>
                                        <footer><cite><a href="#">Gabe "The Younger"</a></cite></footer>
                                    </blockquote>
                                </div>
                            </div>
                            <div>
                                <div className="uk-grid-margin uk-visible@m"  style = {{height: "55vh", width: '50vw'}}>
                                    <img className = "fade-p5" src="img/gabe.png" alt = 'Gabe "The Younger"' style = {{height: "55vh", width: 'auto'}} uk-img />
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