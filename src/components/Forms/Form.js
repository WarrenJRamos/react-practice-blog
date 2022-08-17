import React from "react";
import classes from "../../styles/components/Forms/Form.module.css";

const Form = (props) => {
    return (
        <form onSubmit={props.onSubmitHandler} className={classes.form}>
            {props.children}
        </form>
    );
};

export default Form;
