import React from 'react'

type Props = {
    id:        string;
    title?:    string;
    children?: any;
}

const Modal = (props: Props) => {
    const { id, title } = props
    return (
        <div id = { id } uk-modal = "true">
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">{ title && title }</h2>
                { props.children }
                <button className="uk-modal-close-default" type="button" uk-close="true"></button>
            </div>
        </div>
    )
}

export default Modal
