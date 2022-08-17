import React from "react";
import classes from "../../styles/components/Forms/FormInput.module.css";

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
                    props.defaultValue && "https://picsum.photos/360/216"
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
