import React from "react";
import ReactDOM from "react-dom";
import ModalBackdrop from "./ModalBackdrop";
import ModalOverlay from "./ModalOverlay";

const root = document.getElementById("root");

// Set it up this way so Modal could be used for other components, not just
// for updating blog post data; ended up not needing to use it for other
// components though
const Modal = (props) => {
    return (
        <>
            {/*Render the modal in the root rather than parent*/}
            {ReactDOM.createPortal(
                <ModalBackdrop onCloseUpdateModal={props.onCloseUpdateModal} />,
                root
            )}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                root
            )}
        </>
    );
};

export default Modal;
