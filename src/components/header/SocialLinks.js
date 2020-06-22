import React from "react"
import { Link } from "gatsby"

const SocialLinks = ({ contacts }) => {
    return (
        <div className="social-links float-right mr-4">
            <Link to="/archive"><span className="text-dark d-block py-1">Archive</span></Link>
        </div>
    )
}

export default SocialLinks
