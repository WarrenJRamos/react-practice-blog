import React from 'react';
import classes from "./Modal.module.css"

const ModalBackdrop = (props) => {
    return (
        <div onClick={props.onCloseUpdateModal} className={classes["modal-backdrop"]}>
            
        </div>
    );
}

export default ModalBackdrop;
