import React from "react";
import classes from "../../styles/components/Forms/FormInput.module.css";

// I don't normally add a default value, but to make it easier to create
// blog posts, I put the image link as the default value for inputs that
// are links
const FormInput = React.forwardRef((props, ref) => {
    return (
        <div className={`${props.className}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                defaultValue={
                    props.name === "link" ? props.defaultValue : ""
                }
                ref={ref}
            />
            {!props.isValid && (
                <p className={classes.error}>
                    Please enter a valid {props.name}
                </p>
            )}
        </div>
    );
});

export default FormInput;
