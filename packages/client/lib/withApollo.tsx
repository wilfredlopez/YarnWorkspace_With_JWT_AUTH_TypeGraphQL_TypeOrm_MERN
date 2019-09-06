import React from "react"
import cookie from "cookie"
import PropTypes from "prop-types"
import { getDataFromTree } from "react-apollo"
import Head from "next/head"
import { isBrowser } from "./isBrowser"
import initApollo from "./initApollo"
import { NormalizedCacheObject, ApolloClient } from "apollo-boost"
import redirect from "./redirect"
import { createUploadLink } from "apollo-upload-client"
import config from "../config"

export function parseCookies(req?: any, config = {}) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie, config)
}

const uploadLink = createUploadLink({ uri: `${config.API_URL}/graphql` })

export default (App: any) => {
  return class WithData extends React.Component {
    // It is needed for better devtools experience. Check how react devtools shows it: "MyApp WithData"
    static displayName = `WithData(${App.displayName})`

    // Since apolloState is required but it is missed before this method returns the new props,
    // so it is needed to provide defaults
    static defaultProps = {
      apolloState: {},
    }

    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    }

    static async getInitialProps(ctx: any) {
      const {
        AppTree,
        ctx: { req, res },
      } = ctx

      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).token,
          link: uploadLink,
        },
      )

      ctx.ctx.apolloClient = apollo

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {}
      }

      if (!isBrowser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(<AppTree {...appProps} apolloClient={apollo} />)
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error("Error while running `getDataFromTree`", error)
          if (
            error.message.includes(
              "Access denied! You need to be authorized to perform this action!",
            )
          ) {
            redirect(ctx.ctx, "/login")
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
      }
    }

    apolloClient: ApolloClient<NormalizedCacheObject>

    constructor(props: any) {
      super(props)
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline

      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().token
        },
      })
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />
    }
  }
}
