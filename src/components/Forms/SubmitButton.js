import React from "react";
import classes from "../../styles/components/Forms/SubmitButton.module.css";

const SubmitButton = () => {
    return (
        <button type="submit" className={classes.submit}>
            Submit
        </button>
    );
};

export default SubmitButton;
