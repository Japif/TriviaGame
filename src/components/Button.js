import { useState } from "react";
import "./Button.css";

function Button(props) {

  return (
    <div className={props.customclass} onClick={() => props.onClick(props.children)}>
        {props.children}
    </div>
  );
}

export default Button;
