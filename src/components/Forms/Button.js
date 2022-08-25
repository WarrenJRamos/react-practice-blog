import React from "react";
import classes from "../../styles/components/Forms/Button.module.css";

// General button; don't use for submit button
// I could have used an if/else to check what the type was to handle
// for submit buttons versus general buttons if I wanted to though
const Button = (props) => {
    return (
        <button
            type="button"
            className={`${classes.btn} ${props.className}`}
            onClick={props.onClick}
        >
            {props.textContent}
        </button>
    );
};

export default Button;
