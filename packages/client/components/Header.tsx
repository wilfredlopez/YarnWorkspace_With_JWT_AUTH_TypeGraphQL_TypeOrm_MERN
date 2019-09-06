import * as React from "react"
import Link from "next/link"

import { MeComponent } from "../generated/apolloComponents"

interface Props {}

const AppHeader: React.FunctionComponent<Props> = () => {
  return (
    <div>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          |{" "}
          <Link href="/authorized">
            <a>Authorized</a>
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
    </div>
  )
}

export default AppHeader
