require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Rodrigo Alves`,
    position: `Desenvolvedor Web Full Stack`,
    description: `Sou um Full Stack Web Developer que gosta de aprender novas formas de programar. Tento me esforçar para ser um bom artista na web.`,
    author: `@rodrigo54`,
    siteUrl: `http://rodrigoalves.dev`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `rtrtr`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `rodrigo-io`
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `http://rodrigoalves.dev`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rodrigo Alves`,
        short_name: `Rodrigo Alves`,
        start_url: `/`,
        background_color: `#16202c`,
        theme_color: `#16202c`,
        display: `minimal-ui`,
        icon: `src/img/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-embed-gist`,
          `gatsby-remark-lazy-load`,
          {
            resolve: `gatsby-remark-lazy-load`,
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: {
                default: 'Dark+ (default dark)',
                parentSelector: {
                  'body.dark': 'Dark+ (default dark)',
                  'body.light': 'Light+ (default light)'
                }
              }
            },
          }
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/img/`,
      },
      __key: `images`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./src/pages/`,
      },
      __key: `pages`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `./src/posts/`,
      },
      __key: `posts`,
    },
  ],
};
