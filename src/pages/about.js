import React from 'react'
import Layout from "../components/layout"
import {graphql} from "gatsby"

const AboutPage = ({data})  => (
    
        <Layout>
            <h1>About Us {data.site.siteMetadata.title}</h1>
            <p>
            This is a 1 hour crash course on Gatsby JS which is a static site generator that runs on React and GraphQL. We will be creating a static site along with a Markdown based blog using a few plugins. We will also deploy our Gatsby site to Netlify
            </p>    
        </Layout>
    )

export const query = graphql `
query {
    site{
        siteMetadata{
            title
        }
    }
}
`

export default AboutPage;