import React from 'react';
import { Link } from 'react-router-dom';
import PostForm from '../components/PostForm';

const CreatePost = () => {
    return (
        <div>
            <Link to={'/'}>Back to Home</Link>
            <PostForm />
        </div>
    );
}

export default CreatePost;
