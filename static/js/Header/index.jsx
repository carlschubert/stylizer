import React from "react";

import About from '../About';

const Header = (props) => {

    return (
        <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
            <h1 className="pb-2">Neural Style Transfer</h1>
            <About />
        </div>
    );

}

export default Header;