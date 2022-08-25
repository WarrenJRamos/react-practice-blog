import React from "react";
import classes from "../../styles/components/BlogPosts/BlogPost.module.css";
import BlogPostContent from "./BlogPostContent";
import BlogPostActions from "./BlogPostActions";

const BlogPost = (props) => {
    return (
        <li className={classes.post}>
            <BlogPostContent post={props.post} />
            <BlogPostActions
                postId={props.post.id}
                deleteBlogPostHandler={props.deleteBlogPostHandler}
                updateClickHandler={props.updateClickHandler}
            />
        </li>
    );
};

export default BlogPost;
