import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import User from "./user";

const Webpages = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
        </Routes>
    );
};

export default Webpages;
