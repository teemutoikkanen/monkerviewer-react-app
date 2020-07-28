import React from 'react';


function Square(props) {
    // console.log(props.value, props.bgc);
    return (
        <button
        className="square"
        style={{background: props.bgc}}
        // onMouseDown={props.onMouseDown}
        // onMouseOver={e => props.onMouseOver(e)}
        >
            {props.value}
        </button>
    );
}

export default Square