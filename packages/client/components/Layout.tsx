import * as React from "react"
import Head from "next/head"

import AppHeader from "./Header"
import styled from "styled-components"

type Props = {
  title?: string
}

const Container = styled("div")`
  background: #fff;
  margin: 0;
  padding: 0 0.2rem;
  max-width: 1450px;
  margin: auto;
  @media (min-width: 720px) {
    padding: 0 1rem;
  }
`

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title",
}) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <AppHeader />
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </Container>
)

export default Layout
