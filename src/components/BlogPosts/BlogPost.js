import React from "react";
import classes from "../../styles/components/BlogPosts/BlogPost.module.css";

const BlogPost = (props) => {
    return (
        <li key={props.post.id} className={classes.post}>
            <div className={classes["post--image"]}>
                <img src={props.post.link} alt={props.post.title} />
            </div>
            <div className={classes["post--details"]}>
                <h2>{props.post.title}</h2>
                <p>{props.post.description}</p>
            </div>
            <div className={classes["post--actions"]}>
                <button
                    type="button"
                    className={`${classes.btn} ${classes["btn__delete"]}`}
                    onClick={() => {
                        props.deleteBlogPostHandler(props.post.id);
                    }}
                >
                    DELETE
                </button>
                <button
                    type="button"
                    className={classes.btn}
                    onClick={() => props.updateClickHandler(props.post.id)}
                >
                    UPDATE
                </button>
            </div>
        </li>
    );
};

export default BlogPost;
