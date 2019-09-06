import React from "react"
import Layout from "../components/Layout"
import { AmIAuthorizedComponent } from "../generated/apolloComponents"

export default function AuthorizedPage() {
  return (
    <Layout>
      <AmIAuthorizedComponent>
        {({ data }) => {
          return (
            <div>
              {data && data.AmIAuthorized ? data.AmIAuthorized : "Loading..."}
            </div>
          )
        }}
      </AmIAuthorizedComponent>
    </Layout>
  )
}
