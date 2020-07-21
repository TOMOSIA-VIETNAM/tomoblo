/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import "../stylesheets/application.scss";
import Header from "./header/header";

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              tagline
              author
              contacts {
                linkedin
                github
                stackoverflow
                freecodecamp
                twitter
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <Header
            siteTitle={data.site.siteMetadata.title}
            tagline={data.site.siteMetadata.tagline}
            author={data.site.siteMetadata.author}
            contacts={data.site.siteMetadata.contacts}
          />
          <div
            style={{
              margin: `0 auto`,
              padding: `0px 1.0875rem 1.45rem`,
              paddingTop: 0
            }}
          >
            <main className="main-page">{children}</main>
            <footer className="text-center">
              <hr />
              <p className="d-inline">
                © {new Date().getFullYear()}{" "}
                <a className="text-info" href="http://www.tomosia.com/index.html" > TOMOSIA </a> , All Rights Reserved.
              </p>
            </footer>
          </div>
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
