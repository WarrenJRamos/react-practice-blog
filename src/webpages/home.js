import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpdateBlogPost from "../components/UpdateBlogPost";
import classes from "../styles/webpages/Home.module.css";

// FIXME - Replace all instances of data fetching with a custom hook (if I have time)
const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [aPostHasBeenDeleted, setAPostHasBeenDeleted] = useState(false);
    const [aPostIsBeingUpdated, setAPostIsBeingUpdated] = useState(false);
    const [idOfPostBeingUpdated, setIdOfPostBeingUpdated] = useState();
    const [posts, setPosts] = useState([]);

    const fetchBlogPosts = async () => {
        const response = await fetch("http://localhost:3333/posts/");

        // FIXME - Possibly add error handling here (if I have time)

        const data = await response.json();

        return data;
    };

    useEffect(() => {
        fetchBlogPosts()
            .then((data) => {
                setIsLoaded(true);
                setPosts(data);
            })
            .catch((error) => setError(error.message));
    }, []);

    const deleteBlogPost = async (id) => {
        const response = await fetch(`http://localhost:3333/posts/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        return data;
    };

    const deleteBlogPostHandler = (id) => {
        // Delete request with the given post id
        deleteBlogPost(id).then((data) => {
            setPosts((prevPosts) => {
                return prevPosts.filter((prevPost) => prevPost.id !== id);
            });
            setAPostHasBeenDeleted(true);
            setTimeout(() => {
                setAPostHasBeenDeleted(false); //
            }, 2000);
        });
    };

    const updateClickHandler = (postId) => {
        setIdOfPostBeingUpdated(postId);
        setAPostIsBeingUpdated(true);
    };

    const updateBlogPost = async (updatedBlogPostData) => {
        const { id, title, description, link } = updatedBlogPostData;

        const response = await fetch(`http://localhost:3333/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                link,
            }),
        });

        const data = await response.json();

        return data;
    };

    const updateBlogPostHandler = (updatedBlogPostData) => {
        // Patch request to post with the given id
        updateBlogPost(updatedBlogPostData)
            .then((data) => {
                console.log("Successfully updated the blog post");
                setPosts((prevPosts) => {
                    return prevPosts.map((prevPost) => {
                        if (prevPost.id === updatedBlogPostData.id) {
                            return {
                                ...updatedBlogPostData,
                            };
                        }
                        return prevPost;
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setAPostIsBeingUpdated(false);
                setIdOfPostBeingUpdated(null);
            });
    };

    const closeUpdateModalHandler = () => {
        setAPostIsBeingUpdated(false);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={classes["home-container"]}>
                <header className={classes.header}>
                    <h1>Warren's Blog</h1>
                </header>
                <Link to={`create-post/`} className={classes["create-post"]}>
                    Click here to create a new post
                </Link>
                {aPostHasBeenDeleted && <p>A post has been deleted</p>}
                <ul className={classes["posts"]}>
                    {posts.map((post) => (
                        <li key={post.id} className={classes.post}>
                            <div className={classes["post--image"]}>
                                <img
                                    src={post.link}
                                    alt={post.title}
                                />
                            </div>
                            <div className={classes["post--details"]}>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                            </div>
                            <div className={classes["post--actions"]}>
                                <button
                                    type="button"
                                    className={`${classes.btn} ${classes["btn__delete"]}`}
                                    onClick={() => {
                                        deleteBlogPostHandler(post.id);
                                    }}
                                >
                                    DELETE
                                </button>
                                <button
                                    type="button"
                                    className={classes.btn}
                                    onClick={() => updateClickHandler(post.id)}
                                >
                                    UPDATE
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {aPostIsBeingUpdated && (
                    <UpdateBlogPost
                        onCloseUpdateModal={closeUpdateModalHandler}
                        idOfPostBeingUpdated={idOfPostBeingUpdated}
                        onUpdateFormSubmitHandler={updateBlogPostHandler}
                    />
                )}
            </div>
        );
    }
};

export default Home;
