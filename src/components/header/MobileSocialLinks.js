import React from "react";
import { Link } from "gatsby"

import "../layout.css"

const MobileSocialLinks = ({ contacts }) => {
    return (
        <div className="bottom-bar py-1">
            <Link to="/archive"><span className="text-dark d-block py-1">Archive</span></Link>
        </div>
    )
}

export default MobileSocialLinks;
