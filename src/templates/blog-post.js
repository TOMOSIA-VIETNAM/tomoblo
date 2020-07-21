import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../stylesheets/application.scss";

import TechTag from "../components/tags/TechTag";
import CustomShareBlock from "../components/CustomShareBlock";
import Gitalk from 'gatsby-plugin-gitalk';
import 'gitalk/dist/gitalk.css';
import 'applause-button';
import 'applause-button/dist/applause-button.css';

const BlogPost = props => {
  const post = props.data.markdownRemark;
  const labels = props.data.site.siteMetadata.labels;
  const siteName = props.data.site.siteMetadata.title;
  const siteUrl = props.data.site.siteMetadata.url;
  const url = `${siteUrl}${props.pageContext.slug}`;
  const tags = post.frontmatter.tags;

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

  let gitalkConfig = {
    id: props.pageContext.slug,
    title: post.frontmatter.title,
  };

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />

      <div className="post-page-main">
        <div className="post-main">
          <SEO title={post.frontmatter.title} />
          <div className="mt-3">
            <h2 className="title">{post.frontmatter.title}</h2>

            <small className="d-block text-muted reading-time">
              {post.frontmatter.date} <span className="dot">●</span> {post.fields.readingTime.text}
            </small>

            <div className="list-tags">
              <applause-button style={{ width: "58px", "height": "58px" }} />
              <div className="d-block">{getTechTags(tags)}</div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: post.html }} className="main-content" />
            <CustomShareBlock
              title={post.frontmatter.title}
              siteName={siteName}
              url={url}
            />
            <Gitalk options={gitalkConfig} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        url
        title
        labels {
          tag
          tech
          name
          size
          color
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD-MM-YYYY")
        tags
      }
      fields {
        slug
        readingTime {
          text
        }
      }
    }
  }
`;

export default BlogPost;
