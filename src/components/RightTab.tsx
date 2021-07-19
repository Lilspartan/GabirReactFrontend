const RightTab = (props:any) => {
    const info = props.children;

    return (
        <div id={props.id} uk-offcanvas="flip: true; overlay: true">
            <div className="uk-offcanvas-bar" style = {{ width: '30vw', minWidth: '300px'}}>
                {info}

            </div>

        </div>
    )
}

export default RightTab
