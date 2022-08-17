import React, { useRef } from "react";

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
        <form onSubmit={onSubmitHandler}>
            <h2>Update the post</h2>
            <div className="">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    ref={titleInputRef}
                />
            </div>
            <div className="">
                <label htmlFor="title">Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Description"
                    ref={descriptionInputRef}
                />
            </div>
            <div className="">
                <label htmlFor="title">Link</label>
                <input
                    id="link"
                    name="link"
                    type="text"
                    defaultValue="https://picsum.photos/200/300"
                    ref={linkInputRef}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UpdateForm;
