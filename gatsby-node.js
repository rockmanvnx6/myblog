const { createFilePath } = require("gatsby-source-filesystem")
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages" })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
//onCreateNode: creates "slugs" to build paths for building nodes on GraphQL.
// These nodes represent the new pages. For every node in MarkdownRemark, a slug will be created

exports.createPages = ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions
  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve("./src/templates/blog-post.js"),
        context: {
          // Data passed to context is avaiable
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    })
  })
}

//creates pages, but querying GraphQL, then based on the result, createPage(with settings) on each node in that query.
