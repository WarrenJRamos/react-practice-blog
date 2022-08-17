import React from "react";
import classes from "../../styles/components/Forms/Button.module.css";

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
