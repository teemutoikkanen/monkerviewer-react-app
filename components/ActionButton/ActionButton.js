import React from "react";
import './ActionButton.css'
export default function ActionButton(props) {
  return <button classname='ActionButton' style={{ backgroundColor: props.bgc }}>{props.name}</button>;
}
