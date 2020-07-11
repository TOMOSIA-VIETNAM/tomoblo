'use strict'

const siteConfig = require("./config")

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    url: siteConfig.url,
    title: siteConfig.title,
    tagline: siteConfig.tagline,
    description: `A blog template for web developers that's ready to go out of the box. Feel free to modify it to your liking.`,
    author: siteConfig.author.name,
    contacts: {
      linkedin: siteConfig.author.contacts.linkedin,
      github: siteConfig.author.contacts.github,
      stackoverflow: siteConfig.author.contacts.stackoverflow,
      freecodecamp: siteConfig.author.contacts.freecodecamp,
      twitter: siteConfig.author.contacts.twitter,
      facebook: siteConfig.author.contacts.facebook
    },
    labels: siteConfig.labels,
    siteUrl: 'http://blog.tomosia.com/',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-cname`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['stylesheets'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`
            }
          },
          'gatsby-remark-mermaid',
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            }
          }, `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          'Lato',
          'Helvetica Neue',
          'Helvetica',
          'sans-serif'
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-gitalk`,
      options: {
        config: {
          clientID: '69beba26a588a29737d6',
          clientSecret: 'c96383537bf4c5ffd7a37b01b84739a6cd16473c',
          repo: 'tomoblo',
          owner: 'TOMOSIA-VIETNAM',
          admin: ['anhnguyen1tomosia'],
          distractionFreeMode: true
        }
      }
    },
  ],
}
