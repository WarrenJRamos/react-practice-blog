import React from "react";
import Modal from "./Modal/Modal";
import UpdateForm from "./UpdateForm";

const UpdateBlogPost = (props) => {
    return (
        <Modal onCloseUpdateModal={props.onCloseUpdateModal}>
            <UpdateForm
                idOfPostBeingUpdated={props.idOfPostBeingUpdated}
                onUpdateFormSubmitHandler={props.onUpdateFormSubmitHandler}
            />
        </Modal>
    );
};

export default UpdateBlogPost;
