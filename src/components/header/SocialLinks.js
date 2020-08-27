import React from "react"
import { Link } from "gatsby"

const SocialLinks = ({ contacts }) => {
    return (
        <div className="social-links float-right mr-4">
            <a className="text-primary ml-4"
                href='https://stackedit.io/app#'
                rel='noreferrer'
                target='_blank'>
                <span className="text-dark d-block py-1">Viết bài</span>
            </a>
            <a className="text-main ml-4"
                href='./huong-dan-tao-bai-viet-moi/'>
                <span className="text-main d-block py-1">Hướng dẫn viết bài!</span>
            </a>
            <Link to="/archive"><span className="text-dark d-block py-1 ml-4">Tất cả blog</span></Link>
        </div>
    )
}

export default SocialLinks
