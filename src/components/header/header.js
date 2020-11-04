import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import SocialLinks from "./SocialLinks"
import "./header.css"

import logo from "../../images/logo.png"

const Header = ({ siteTitle, tagline, author, contacts }) => {

  return (
    <header className="head-main">
      <div className="head-elements">
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          <img src={logo} className="profile-img" alt="" />
        </Link>
        <SocialLinks contacts={contacts} />
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
