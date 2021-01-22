const MainBody = ({ haikus }) => {
    var d = new Date();
    return (
        <>
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" uk-parallax="bgy: -200, bgx: -500" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>

                <h1 className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-medium">Welcome to Gabir Motorsports</h1>
                <div className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m" uk-grid uk-scrollspy="cls: uk-animation-fade; target: .fade-p1; delay: 500; repeat: true">
                    <div>
                        <h4 className="fade-p1">{`Gabir Motors • ${d.getFullYear()}`}</h4>
                    </div>
                </div>
            </div>

            <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover" uk-parallax="bgy: -200, bgx: -500" style={{backgroundImage: 'url(img/Outro_Main_C.jpg)', height: '150vh'}}>

                <div className="uk-child-width-auto uk-margin" uk-grid uk-scrollspy="cls: uk-animation-slide-left-small; target: .fade-p2; delay: 250; repeat: true">
                    <div>
                        <br/>
                        <div className="uk-child-width-expand@s uk-text-center" uk-grid="parallax: 50">
                            <div>
                                <div className="uk-grid-margin"  style = {{height: "55vh", width: '50vw'}}>
                                    <img className = "fade-p2" src="img/MikeRacecar.png" alt = "Mike Racecar" style = {{height: "55vh", width: 'auto'}} uk-img />
                                </div>
                            </div>
                            <div>
                                <div className = "uk-grid-margin" style = {{width: '45vw', height: '15vh'}} /> 
                                <div className="uk-grid-margin"  style = {{width: '45vw'}}>
                                    <h2 className = "fade-p2">Mike Racecar</h2>
                                </div>
                                <div className="uk-grid-margin"  style = {{width: '45vw'}}>
                                    <p className = "fade-p2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="uk-child-width-expand@s uk-text-center" uk-grid="parallax: 50">
                            <div>
                                <div className = "uk-grid-margin" style = {{width: '45vw', height: '15vh'}} />
                                <div className="uk-grid-margin"  style = {{width: '45vw'}}>
                                    <h2 className = "fade-p2">Carson Bolt</h2>
                                </div>
                                <div className="uk-grid-margin"  style = {{width: '45vw'}}>
                                    <p className = "fade-p2">Massa sed elementum tempus egestas sed. Mi bibendum neque egestas congue quisque egestas diam in arcu. Suspendisse sed nisi lacus sed viverra tellus in hac. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Euismod in pellentesque massa placerat duis ultricies lacus sed. Augue ut lectus arcu bibendum at. Posuere morbi leo urna molestie at elementum eu facilisis sed. Venenatis lectus magna fringilla urna porttitor. Odio euismod lacinia at quis risus sed. Volutpat sed cras ornare arcu dui. Sagittis nisl rhoncus mattis rhoncus urna.</p>
                                </div>
                                <div>
                                    <blockquote cite="#">
                                        <p class="uk-margin-small-bottom">Sometimes your worst nights, are your best nights.</p>
                                        <footer><cite><a href="#">Carson Bolt</a></cite></footer>
                                    </blockquote>
                                </div>
                            </div>
                            <div>
                                <div className="uk-grid-margin"  style = {{height: "55vh", width: '50vw'}}>
                                    <img className = "fade-p2" src="img/intro.png" alt = "Carson Bolt" style = {{height: "55vh", width: 'auto'}} uk-img />
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