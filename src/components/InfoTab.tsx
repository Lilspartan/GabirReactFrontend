const InfoTab = (props: any) => {
    const info = props.children;

    return (
        <>
            <div uk-sticky = "true" uk-scrollspy="cls: uk-animation-slide-right; target: .what-is-page; delay: 250; repeat: true">
                {/* eslint-disable-next-line */}
                <a id = "info-button" uk-tooltip = "What is this page?" className="what-is-page uk-margin-small-right uk-position-top-right"uk-toggle="target: #info" href = "#"><span className = "icon-button" uk-icon = "icon:question; ratio: 1.4" style = {{ color: 'white', margin: '10px' }}></span></a>
            </div>
            <div id="info" uk-offcanvas="flip: true; overlay: true;"> 
                <div className="uk-offcanvas-bar">
                    {info}
                </div>
            </div>
        </>
    )
}

export default InfoTab
