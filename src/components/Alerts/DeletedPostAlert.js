import React from "react";
import classes from "../../styles/components/Alerts/DeletedPostAlert.module.css";

const DeletedPostAlert = () => {
    return <p className={classes["alert__delete"]}>A post has been deleted</p>;
};

export default DeletedPostAlert;
