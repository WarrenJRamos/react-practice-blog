import React from "react";
import Webpages from "./webpages/Index";
import { BrowserRouter } from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <Webpages />
        </BrowserRouter>
    );
}

export default App;
