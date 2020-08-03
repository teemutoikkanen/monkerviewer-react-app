import React from 'react';
import MouseOverPopover from '../MouseOverPopover/MouseOverPopover'


function Square(props) {
    // console.log(props.value, props.bgc);

    let bgc = props.bgc
    if (!props.bgc) {
        bgc = "rgb(190, 190, 190)"
    }
    
    return (
        <button
        className="square"
        style={{background: bgc}}
        // onMouseDown={props.onMouseDown}
        // onMouseOver={e => props.onMouseOver(e)}
        >
            {props.value}
            <MouseOverPopover></MouseOverPopover>
        </button>
        
    );
}

export default Square