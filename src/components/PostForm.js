import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../styles/components/PostForm.module.css";

const PostForm = () => {
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

    const postBlogPost = async (formData) => {
        console.log(formData);
        const response = await fetch("http://localhost:3333/posts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        return data;
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
        })
            .then((data) => {
                console.log("Successfully created a blog post");
                setBlogPostWasCreated(true);
            })
            .catch((error) => {
                console.log("Couldn't create a blog post");
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

    if (blogPostWasCreated) {
        return <p>You successfully created a post!</p>;
    }

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={titleControlClasses}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter blog post title"
                    ref={titleInputRef}
                />
                {!formInputsValidity.title && (
                    <p className={classes.error}>Please enter a valid title</p>
                )}
            </div>
            <div className={descriptionControlClasses}>
                <label htmlFor="title">Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Enter blog post description"
                    ref={descriptionInputRef}
                />
                {!formInputsValidity.description && (
                    <p className={classes.error}>Please enter a valid description</p>
                )}
            </div>
            <div className={linkControlClasses}>
                <label htmlFor="title">Link</label>
                <input
                    id="link"
                    name="link"
                    type="text"
                    defaultValue="https://picsum.photos/360/216"
                    ref={linkInputRef}
                />
                {!formInputsValidity.link && (
                    <p className={classes.error}>Please enter a valid link</p>
                )}
            </div>
            <button type="submit" className={classes.submit}>Submit</button>
        </form>
    );
};

export default PostForm;
