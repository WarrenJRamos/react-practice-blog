import React from "react";
import classes from "../../styles/components/BlogPosts/BlogPostContent.module.css";

const BlogPostContent = (props) => {
    return (
        <>
            <img src={props.post.link} alt={props.post.title} className={classes["post--image"]}/>
            <div className={classes["post--details"]}>
                <h2>{props.post.title}</h2>
                <p>{props.post.description}</p>
            </div>
        </>
    );
};

export default BlogPostContent;
