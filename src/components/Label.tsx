import React from 'react'

type Props = {
    text: string;
}

const Label = (props:Props) => {
    return <span style = {{ fontSize: '0.8em' }}className="uk-label">{props.text}</span>
}

export default Label
