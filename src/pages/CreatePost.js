import React from "react";
import classes from "../styles/pages/CreatePost.module.css";
import { Link } from "react-router-dom";
import PostForm from "../components/Forms/PostForm";
import Layout from "../components/Layout/Layout";

const CreatePost = () => {
    return (
        <Layout>
            <PostForm />
            <Link to={"/"} className={classes.link}>Click here to go back home</Link>
        </Layout>
    );
};

export default CreatePost;
