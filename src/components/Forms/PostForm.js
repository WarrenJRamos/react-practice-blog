import React, { useRef, useEffect, useState } from "react";
import useRequest from "../../hooks/use-request";
import classes from "../../styles/components/Forms/PostForm.module.css";
import ErrorMessage from "../Error/ErrorMessage";
import Form from "./Form";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

const PostForm = () => {
    const { fetchData, error, setError } = useRequest();
    const [blogPostWasCreated, setBlogPostWasCreated] = useState(false);
    const [formInputsValidity, setFormInputsValidity] = useState({
        title: true,
        description: true,
        link: true,
    });

    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    const linkInputRef = useRef();

    // Returns true if input passes validation logic
    const validate = (input) => {
        return input !== "";
    };

    // Send a request to create a blog post
    const postBlogPost = async (formData) => {
        const responseData = fetchData({
            apiEndpoint: "http://localhost:3333/posts/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: formData,
        });

        return responseData;
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredLink = linkInputRef.current.value;

        // Basic validation just to check if they are empty
        const enteredTitleIsValid = validate(enteredTitle);
        const enteredDescriptionIsValid = validate(enteredDescription);
        const enteredLinkIsValid = validate(enteredLink);

        setFormInputsValidity({
            title: enteredTitleIsValid,
            description: enteredDescriptionIsValid,
            link: enteredLinkIsValid,
        });

        const formIsValid =
            enteredTitleIsValid &&
            enteredDescriptionIsValid &&
            enteredLinkIsValid;

        if (!formIsValid) {
            return;
        }

        // FIXME: Replace with submit logic which does a POST request
        postBlogPost({
            title: enteredTitle,
            description: enteredDescription,
            link: enteredLink,
        }).then(() => {
            console.log("Successfully created a blog post!");
            setBlogPostWasCreated(true);
        }).catch((err) => {
            console.log(err.message);
            setError(err.message);
        });
    };

    const titleControlClasses = `${classes.control} ${
        formInputsValidity.title ? "" : classes.invalid
    }`;
    const descriptionControlClasses = `${classes.control} ${
        formInputsValidity.description ? "" : classes.invalid
    }`;
    const linkControlClasses = `${classes.control} ${
        formInputsValidity.link ? "" : classes.invalid
    }`;

    if (error) {
        return <ErrorMessage message={`Error: ${error}`} />;
    }

    if (blogPostWasCreated) {
        return <p>You successfully created a post!</p>;
    }

    return (
        <Form onSubmitHandler={onSubmitHandler}>
            <h2 className={classes.header}>Create a new post</h2>
            <FormInput
                id="title"
                name="title"
                type="text"
                placeholder="Enter blog post title"
                ref={titleInputRef}
                label="Title"
                className={titleControlClasses}
                isValid={formInputsValidity.title}
            />
            <FormInput
                id="description"
                name="description"
                type="text"
                placeholder="Enter blog post description"
                ref={descriptionInputRef}
                label="Description"
                className={descriptionControlClasses}
                isValid={formInputsValidity.description}
            />
            <FormInput
                id="link"
                name="link"
                type="text"
                ref={linkInputRef}
                label="Link"
                defaultValue="https://picsum.photos/360/216"
                className={linkControlClasses}
                isValid={formInputsValidity.link}
            />
            <SubmitButton />
        </Form>
    );
};

export default PostForm;
