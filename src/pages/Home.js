import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpdateBlogPost from "../components/BlogPosts/UpdateBlogPost";
import BlogPosts from "../components/BlogPosts/BlogPosts";
import DeletedPostAlert from "../components/Alerts/DeletedPostAlert";
import classes from "../styles/pages/Home.module.css";
import Header from "../components/Header/Header";
import LoadingMessage from "../components/ProgressIndicators/LoadingMessage";
import ErrorMessage from "../components/Error/ErrorMessage";
import Container from "../components/Layout/Container";

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
                setError(err.message);
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
        return <ErrorMessage message={error} />;
    } else if (!isLoaded) {
        return <LoadingMessage />;
    } else {
        return (
            <Container>
                <Header />
                <Link to={`create-post/`} className={classes["create-post"]}>
                    Click here to create a new post
                </Link>
                {aPostHasBeenDeleted && <DeletedPostAlert />}
                <BlogPosts
                    posts={posts}
                    deleteBlogPostHandler={deleteBlogPostHandler}
                    updateClickHandler={updateClickHandler}
                />
                {aPostIsBeingUpdated && (
                    <UpdateBlogPost
                        onCloseUpdateModal={closeUpdateModalHandler}
                        idOfPostBeingUpdated={idOfPostBeingUpdated}
                        onUpdateFormSubmitHandler={updateBlogPostHandler}
                    />
                )}
            </Container>
        );
    }
};

export default Home;
