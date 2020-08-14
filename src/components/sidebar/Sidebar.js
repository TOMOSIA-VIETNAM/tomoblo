import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Bio from "./Bio"
import "./sidebar.scss"

import SocialLinks from "./SocialLinks"
import TechTags from "./TechTags"


const Sidebar = () => {
    return (
        <StaticQuery
            query={graphql`
                query SiteBioQuery {
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
                                facebook
                            }
                            labels {
                                tag
                                tech
                                name
                                size
                                color
                            }
                        }
                    }
                    allMarkdownRemark(
                        limit: 10
                        sort: { fields: [frontmatter___date], order: DESC }
                        filter: { frontmatter: { published: { eq: true } } }
                    ) {
                        edges {
                            node {
                                frontmatter {
                                    tags
                                }
                            }
                        }
                    }
                }
            `}
            render={data => (
                <div class="sidebar__inner">
                    <Bio author={data.site.siteMetadata.author} tagline={data.site.siteMetadata.tagline} />
                    <SocialLinks contacts={data.site.siteMetadata.contacts} />
                    <div className="tech-tags">
                        <TechTags labels={data.site.siteMetadata.labels} posts={data.allMarkdownRemark.edges} />
                    </div>
                </div>
            )}
        />
    )
}

export default Sidebar
