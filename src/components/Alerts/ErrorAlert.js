import React from "react";
import classes from "../../styles/components/Alerts/ErrorAlert.module.css";

const ErrorAlert = (props) => {
    return <div className={classes.error}>{props.message}</div>;
};

export default ErrorAlert;
