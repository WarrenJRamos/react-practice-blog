import React from "react";
import Webpages from "./webpages";
import { BrowserRouter } from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <Webpages />
        </BrowserRouter>
    );
}

export default App;
