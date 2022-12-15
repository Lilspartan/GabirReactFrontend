const Loading = () => {
    var style1 = { "--order": 1} as any;
    var style2 = { "--order": 2} as any;
    var style3 = { "--order": 3} as any;
    return (
        <div className = "uk-background-cover loader"
        style={{
          backgroundImage: "url(../../img/gabir_bg.jpg)",
          height: "100vh",
        }}>
            <div className = "uk-position-center">
                <div style = {{ width: "300px", height: "300px"}}>
                    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Loading">
                            <path style = {style1} id="yellow" d="M81.9745 131.399C92.3597 92.2545 127.788 65 168.286 65V65H233L139.414 414H7L81.9745 131.399Z" fill="#FFD100"/>
                            <path style = {style2} id="orange" d="M247.214 65H314.286H375L281.5 414H153L247.214 65Z" fill="#FF8300"/>
                            <path style = {style3} id="red" d="M388.59 65H465.95C494.227 65 514.807 91.825 507.483 119.137L428.414 414H296L388.59 65Z" fill="#FF1212"/>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Loading
