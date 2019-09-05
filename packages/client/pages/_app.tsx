import App from "next/app"
import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import withApollo from "../lib/withApollo"
import { ApolloClient } from "apollo-boost"

import "../css/styles.css"

interface IProps {
  apolloClient: ApolloClient<any>
}

class MyApp extends App<IProps> {
  static displayName = "MyApp"

  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withApollo(MyApp)
