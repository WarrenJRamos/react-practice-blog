import React from "react";
import classes from "../../styles/components/BlogPosts/BlogPostContent.module.css";

const BlogPostContent = (props) => {
    return (
        <>
            <div>
                <img src={props.post.link} alt={props.post.title} />
            </div>
            <div className={classes["post--details"]}>
                <h2>{props.post.title}</h2>
                <p>{props.post.description}</p>
            </div>
        </>
    );
};

export default BlogPostContent;
