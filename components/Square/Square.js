import React from 'react';


function Square(props) {
    return (
        <button
        className="square"
        style={{backgroundColor: props.bgc}}
        // onMouseDown={props.onMouseDown}
        // onMouseOver={e => props.onMouseOver(e)}
        >
            {props.value}
        </button>
    );
}

export default Square