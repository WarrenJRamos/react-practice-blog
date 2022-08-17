import React from "react";
import BlogPost from "./BlogPost";
import classes from "../../styles/components/BlogPosts/BlogPosts.module.css";

const BlogPosts = (props) => {
    return (
        <ul className={classes["posts"]}>
            {props.posts.map((post) => (
                <BlogPost
                    key={post.id}
                    post={post}
                    deleteBlogPostHandler={props.deleteBlogPostHandler}
                    updateClickHandler={props.updateClickHandler}
                />
            ))}
        </ul>
    );
};

export default BlogPosts;
