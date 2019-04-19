/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Context } from "../layouts/index"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const {theme, setTheme} = useContext(Context)

  return (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
        <button onClick={() => {
          if(theme.mode === 'dark'){
            setTheme({mode: 'light'})
          }else{
            setTheme({ mode: `dark`}) 
          }   
        }}>set {theme.mode === 'dark' ? 'light' : 'dark' } theme</button>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )}
  />
)
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
