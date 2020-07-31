import React from 'react'
import ActionButton from '../ActionButton/ActionButton'

export default function TreeSelector(props) {
    //const trees = ["15bb","30bb","60bb"]


    
    return (
        <div>
            {props.treeDict.keys.map((val,idx) => {
                return (
                    <button bgc = 'white' onClick = {(val) => props.handleTreeSelectorOnClick(val)}>{val}</button>

                )
            })}
        </div>
    )
}