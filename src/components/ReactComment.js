import React, {useEffect, useRef} from 'react';

const ReactComment = ( props ) => {
    const el = useRef();
    useEffect( () => {
        el.current.outerHTML = `<!-- ${props.text} -->`;
    }, [] );
    return (
        <div ref={el}/>
    );
};

export default ReactComment;