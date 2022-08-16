import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/")
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    const deletePostHandler = (id) => {
        // Delete request with the given post id
    }

    const updatePostHandler = (post) => {
        // Patch request to post with the given id
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <header>
                    <h1>Warren's Blog</h1>
                </header>
                <Link to={`create-post/`}>Create Post</Link>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <Link to={`user/${user.id}`}>{user.name}</Link>
                            <button type="button" onClick={() => deletePostHandler(5)}>DELETE</button>
                            <Link to={'update-post/:id'}>UPDATE</Link>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
};

export default Home;
