import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
} from "apollo-boost"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import fetch from "isomorphic-unfetch"
import { isBrowser } from "./isBrowser"
import config from "../config"
import { createUploadLink } from "apollo-upload-client"

import { onError } from "apollo-link-error"
import Router from "next/router"
import { parseCookies } from "./withApollo"

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  //@ts-ignore
  global.fetch = fetch
}

interface IOptions {
  getToken: any
  link?: ApolloLink
}
const uploadLink = createUploadLink({ uri: `${config.API_URL}/graphql` })

function create(initialState: any, { getToken, fetchOptions }: any) {
  const httpLink = createHttpLink({
    uri: `${config.API_URL}/graphql`,
    credentials: "include",
    fetchOptions,
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        )

        if (
          isBrowser &&
          message.includes(
            "Access denied! You need to be authorized to perform this action!",
          )
        ) {
          Router.replace("/login")
        }
      })

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const authLink = setContext((req, { headers }) => {
    const token = parseCookies()["access-token"]
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        cookie: token ? `access-token=${token}` : "",
        // cookie: token ? `${token}` : "",
      },
      cookies: {
        cookies: { token },
      },
      credentials: "include",
    }
  })

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    // link: errorLink.concat(authLink.concat(uploadLink.concat(httpLink))),
    link: errorLink.concat(authLink.concat(uploadLink)),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo(initialState: any, options: IOptions) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    let fetchOptions = {
      "Sec-Fetch-Mode": "cors",
      credentials: "include",
    }
    // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
    // 'https-proxy-agent' is required here because it's a sever-side only module
    // if (process.env.https_proxy) {
    //   fetchOptions = {
    //     agent: new (require("https-proxy-agent"))(process.env.https_proxy),
    //   }
    // }
    return create(initialState, {
      ...options,
      fetchOptions,
      link: uploadLink,
    })
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
