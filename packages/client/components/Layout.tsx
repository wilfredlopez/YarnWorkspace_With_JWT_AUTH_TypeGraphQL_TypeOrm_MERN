import * as React from "react"
import Link from "next/link"
import Head from "next/head"
import { MeComponent } from "../generated/apolloComponents"
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
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/hello">
          <a>Hello</a>
        </Link>{" "}
        |{" "}
        <Link href="/about">
          <a>About</a>
        </Link>{" "}
        |{" "}
        <Link href="/file-uploads">
          <a>File Uploads</a>
        </Link>{" "}
        |{" "}
        <MeComponent>
          {({ data, loading }) => {
            if (!data || loading || !data.me) {
              return (
                <Link href="/login">
                  <a>Login/Register</a>
                </Link>
              )
            }
            return (
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            )
          }}
        </MeComponent>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </Container>
)

export default Layout
