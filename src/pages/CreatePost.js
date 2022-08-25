import React from "react";
import { Link } from "react-router-dom";
import PostForm from "../components/Forms/PostForm";
import Header from "../components/Header/Header";
import Container from "../components/Layout/Container";
import classes from "../styles/pages/CreatePost.module.css";

// Would have put footer into its own component, but I'm only using it for
// the create post page, so I didn't do it.
const CreatePost = () => {
    return (
        <Container>
            <Header />
            <PostForm />
            <footer className={classes.footer}>
                <Link to={"/"}>Click here to go back home</Link>
            </footer>
        </Container>
    );
};

export default CreatePost;
