import React from "react";
import classes from "../../styles/components/BlogPosts/BlogPostActions.module.css";
import Button from "../Forms/Button";

const BlogPostActions = (props) => {
    return (
        <div className={classes["post--actions"]}>
            <Button
                className={classes["btn__delete"]}
                textContent="DELETE"
                onClick={() => {
                    props.deleteBlogPostHandler(props.postId);
                }}
            />
            <Button
                textContent="UPDATE"
                onClick={() => props.updateClickHandler(props.postId)}
            />
        </div>
    );
};

export default BlogPostActions;
