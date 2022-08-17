import React from "react";
import { Link } from "react-router-dom";
import PostForm from "../components/PostForm";
import classes from "../styles/webpages/CreatePost.module.css";

const CreatePost = () => {
    return (
        <div className={classes["create-post-container"]}>
            <h2 className={classes.header}>Create a new post</h2>
            <PostForm />
            <footer className={classes.footer}>
                <Link to={"/"}>Click here to go back home</Link>
            </footer>
        </div>
    );
};

export default CreatePost;
