import React, { useRef } from "react";
import classes from "../../styles/components/Forms/UpdateForm.module.css";
import Form from "./Form";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

// Didn't add any validation for this form
// Could have stored the values in state rather than refs, but decided to go with
// ref approach for simple validation in the post form component, and since they
// use the same form component, I had to use ref approach for this form as well.
const UpdateForm = (props) => {
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    const linkInputRef = useRef();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredLink = linkInputRef.current.value;

        props.onUpdateFormSubmitHandler({
            id: props.idOfPostBeingUpdated,
            title: enteredTitle,
            description: enteredDescription,
            link: enteredLink,
        });
    };

    return (
        <Form onSubmitHandler={onSubmitHandler}>
            <h2>Update the post</h2>
            <FormInput
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                ref={titleInputRef}
                label="Title"
                className={classes.control}
                isValid
            />
            <FormInput
                id="description"
                name="description"
                type="text"
                placeholder="Description"
                ref={descriptionInputRef}
                label="Description"
                className={classes.control}
                isValid
            />
            <FormInput
                id="link"
                name="link"
                type="text"
                ref={linkInputRef}
                label="Link"
                className={classes.control}
                defaultValue="/bird.jpg"
                isValid
            />
            <SubmitButton />
        </Form>
    );
};

export default UpdateForm;
