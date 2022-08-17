import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";

const Webpages = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
        </Routes>
    );
};

export default Webpages;
