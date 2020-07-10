import React from "react";
import { Link, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/sidebar/Sidebar";
import TechTag from "../components/tags/TechTag";

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const labels = data.site.siteMetadata.labels;
  const currentPage = 1;
  const postsPerPage = 5; // see limit in graphql query below
  const nextPage = (currentPage + 1).toString();
  const hasNextPage = data.allMarkdownRemark.totalCount > postsPerPage;

  const getTechTags = tags => {
    const techTags = [];
    tags.forEach((tag, i) => {
      labels.forEach(label => {
        if (tag === label.tag) {
          techTags.push(
            <TechTag
              key={i}
              tag={label.tag}
              tech={label.tech}
              name={label.name}
              size={label.size}
              color={label.color}
            />
          );
        }
      });
    });
    return techTags;
  };

  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[
          `gatsby`,
          `javascript`,
          `react`,
          `web development`,
          `blog`,
          `graphql`
        ]}
      />
      <div className="index-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>
        <div className="post-list-main">
          {posts.map(post => {
            const tags = post.node.frontmatter.tags;
            return (
              <div key={post.node.id} className="container mt-5">
                <Link to={post.node.fields.slug} className="text-dark">
                  <h2 className="title">{post.node.frontmatter.title}</h2>
                </Link>
                <small className="d-block text-info">
                  <i>Được đăng vào {post.node.frontmatter.date}</i>
                </small>
                <p className="mt-3 d-inline">{post.node.excerpt}</p>
                <div className="d-block">{getTechTags(tags)}</div>
              </div>
            );
          })}
          {hasNextPage && (
            <div className="mt-4 text-center">
              <Link to={nextPage} rel="next" style={{ textDecoration: `none` }}>
                <span className="text-dark">Trang tiếp theo →</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
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
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 200)
          html
          id
          frontmatter {
            title
            date(formatString: "DD-MM-YYYY")
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;
