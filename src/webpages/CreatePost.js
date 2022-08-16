import React from 'react';
import BlogForm from '../components/BlogForm';
import { Link } from 'react-router-dom';

const CreatePost = () => {
    return (
        <div>
            <Link to={'/'}>Back to Home</Link>
            <BlogForm />
        </div>
    );
}

export default CreatePost;
