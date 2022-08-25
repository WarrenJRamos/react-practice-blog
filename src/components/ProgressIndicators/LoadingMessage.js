import React from "react";
import classes from "../../styles/components/ProgressIndicators/LoadingMessage.module.css";

const LoadingMessage = (props) => {
    return <div className={classes.message}>{props.message}</div>;
};

export default LoadingMessage;
