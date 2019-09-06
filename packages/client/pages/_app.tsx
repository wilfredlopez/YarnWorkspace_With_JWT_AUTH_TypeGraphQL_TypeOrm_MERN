import App from "next/app"
import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import withApollo from "../lib/withApollo"
import { ApolloClient } from "apollo-boost"

import "../css/styles.css"
import Head from "next/head"

interface IProps {
  apolloClient: ApolloClient<any>
}

class MyApp extends App<IProps> {
  static displayName = "MyApp"

  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="static/styles.css" />
        </Head>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </div>
    )
  }
}

export default withApollo(MyApp)
