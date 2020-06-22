import React from "react"

import "./header.css"

const MobileBio = (props) => {

    return (
        <div className="mobile-bio-main">
            <h4 className="mr-4 mt-4">{props.author}</h4>
        </div>
    )
}

export default MobileBio
