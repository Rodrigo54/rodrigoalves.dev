const path = require('path');
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        "@templates": path.resolve(__dirname, 'src/templates'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        "@model": path.resolve(__dirname, 'src/model'),
        "@styles": path.resolve(__dirname, 'src/styles'),
      },
    },
  })
}

// To add the slug field to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // Ensures we are processing only markdown files
  if (node.internal.type === "Mdx") {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages"
    })

    // Creates new field with name of 'slug'
    createNodeField({
      name: "slug",
      node,
      value: `/${slug.slice(12)}`,
    })
  }
}

// To create the posts pages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMdx.edges
  const blogPostTemplate = path.resolve(`./src/templates/blog-post/index.tsx`);

  for (const { node, next, previous } of posts) {
    const path = `/blog${node.fields.slug}`;
    createPage({
      path,
      component: blogPostTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        previousPost: next,
        nextPost: previous,
      },
    })
  }

  const postsPerPage = 5;
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? `/blog/` : `/blog/page/${index + 1}`,
      component: path.resolve(`./src/templates/blog-list/index.tsx`),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
      },
    })
  })
}
