import React, { useRef, useEffect, useState } from "react";

const BlogForm = () => {
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
        return !!input.value;
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
        console.log("Submitted the form");
    };

    const titleControlClasses = `control ${
        formInputsValidity.title ? "" : "invalid"
    }`;
    const descriptionControlClasses = `control ${
        formInputsValidity.description ? "" : "invalid"
    }`;
    const linkControlClasses = `control ${
        formInputsValidity.link ? "" : "invalid"
    }`;

    return (
        <form className="" onSubmit={onSubmitHandler}>
            <h2>Create a new Blog Post</h2>
            <div className={titleControlClasses}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    ref={titleInputRef}
                />
                {!formInputsValidity.title && (
                    <p className="error">Please enter a valid title</p>
                )}
            </div>
            <div className={descriptionControlClasses}>
                <label htmlFor="title">Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Description"
                    ref={descriptionInputRef}
                />
                {!formInputsValidity.description && (
                    <p className="error">Please enter a valid description</p>
                )}
            </div>
            <div className={linkControlClasses}>
                <label htmlFor="title">Link</label>
                <input
                    id="link"
                    name="link"
                    type="text"
                    placeholder="Link"
                    ref={linkInputRef}
                />
                {!formInputsValidity.link && (
                    <p className="error">Please enter a valid link</p>
                )}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BlogForm;
