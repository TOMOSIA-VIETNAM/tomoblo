import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"


import MobileSocialLinks from "./MobileSocialLinks"
import MobilePageLinks from "./MobilePageLinks"
import SocialLinks from "./SocialLinks"
import MobileBio from "./MobileBio"
import "./header.css"

import logo from "../../images/logo.png"

const Header = ({ siteTitle, tagline, author, contacts }) => {

  return (
    <header
      className="head-main"
      style={{
        background: `white`,
        borderBottom: `1px solid #f0f0f2`
      }}
    >
      <div className="head-elements"
        style={{
          margin: `0`,
          padding: `0 .75rem`
        }}
      >
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
      <MobileSocialLinks />
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
