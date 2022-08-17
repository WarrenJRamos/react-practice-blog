import React from 'react';
import classes from "./Modal.module.css";

const ModalOverlay = (props) => {
    return (
        <div className={classes["modal-overlay"]}>
            {props.children}
        </div>
    );
}

export default ModalOverlay;
