import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRequest from "../hooks/use-request";
import classes from "../styles/pages/Home.module.css";
import UpdateBlogPost from "../components/BlogPosts/UpdateBlogPost";
import BlogPosts from "../components/BlogPosts/BlogPosts";
import DeletedPostAlert from "../components/Alerts/DeletedPostAlert";
import LoadingMessage from "../components/ProgressIndicators/LoadingMessage";
import ErrorMessage from "../components/Error/ErrorMessage";
import Layout from "../components/Layout/Layout";

const Home = () => {
    const { fetchData, isLoaded, setIsLoaded, error, setError } = useRequest();
    const [posts, setPosts] = useState([]);
    const [aPostHasBeenDeleted, setAPostHasBeenDeleted] = useState(false);
    const [aPostIsBeingUpdated, setAPostIsBeingUpdated] = useState(false);
    const [idOfPostBeingUpdated, setIdOfPostBeingUpdated] = useState();

    // Send a request to get all blog posts
    const fetchBlogPosts = async () => {
        const responseData = await fetchData({
            apiEndpoint: "http://localhost:3333/posts/",
        });

        return responseData;
    };

    // Only run once, to retrieve all blog posts, after the component
    // has been mounted into the DOM
    useEffect(() => {
        fetchBlogPosts()
            .then((data) => {
                console.log("Successfully retrieved all blog posts!");
                setIsLoaded(true);
                setPosts(data);
            })
            .catch((err) => {
                console.log(err.message);
                setError(err.message);
            });
    }, []);

    // Send a request to delete a blog post with the given ID
    const deleteBlogPost = async (id) => {
        const responseData = await fetchData({
            apiEndpoint: `http://localhost:3333/posts/${id}`,
            method: "DELETE",
        });

        return responseData;
    };

    // Event handler for deleting blog post
    const deleteBlogPostHandler = (id) => {
        deleteBlogPost(id)
            .then(() => {
                console.log("Successfully deleted a blog post!");
                setPosts((prevPosts) => {
                    return prevPosts.filter((prevPost) => prevPost.id !== id);
                });
                setAPostHasBeenDeleted(true);
                setTimeout(() => {
                    setAPostHasBeenDeleted(false); //
                }, 2000);
            })
            .catch((err) => {
                console.log(err.message);
                setError(err.message);
            });
    };

    // Need to store ID of post being updated to true, so modal component is
    // aware of the blog post it's updating
    const updateClickHandler = (postId) => {
        setIdOfPostBeingUpdated(postId);
        setAPostIsBeingUpdated(true);
    };

    // Send a request to update a blog post with the given updated data
    const updateBlogPost = async (updatedBlogPostData) => {
        const { id, title, description, link } = updatedBlogPostData;

        const responseData = await fetchData({
            apiEndpoint: `http://localhost:3333/posts/${id}`,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: { title, description, link },
        });

        return responseData;
    };

    // Event handler for updating a blog post
    const updateBlogPostHandler = (updatedBlogPostData) => {
        updateBlogPost(updatedBlogPostData)
            .then(() => {
                console.log("Successfully updated the blog post!");
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
                setAPostIsBeingUpdated(false);
                setIdOfPostBeingUpdated(null);
            })
            .catch((err) => {
                console.log(err.message);
                setError(err.message);
            });
    };

    const closeUpdateModalHandler = () => {
        setAPostIsBeingUpdated(false);
    };

    if (error) {
        return <ErrorMessage message={`Error: ${error}`} />;
    } else if (!isLoaded) {
        return <LoadingMessage />;
    } else {
        return (
            <Layout>
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
            </Layout>
        );
    }
};

export default Home;
