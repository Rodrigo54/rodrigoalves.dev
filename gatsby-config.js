require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Rodrigo Alves`,
    position: `Desenvolvedor Full Stack`,
    description: `Sou um Full Stack Web Developer que gosta de aprender novas formas de programar. Tento me esforçar para ser um bom artista na web.`,
    author: `@rodrigo54`,
    siteUrl: `http://rodrigoalves.dev`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `rtrtr`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images/`,
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
  ],
};
