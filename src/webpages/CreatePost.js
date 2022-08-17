import React from "react";
import { Link } from "react-router-dom";
import PostForm from "../components/Forms/PostForm";
import Header from "../components/Header/Header";
import Container from "../components/Layout/Container";
import classes from "../styles/webpages/CreatePost.module.css";

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
