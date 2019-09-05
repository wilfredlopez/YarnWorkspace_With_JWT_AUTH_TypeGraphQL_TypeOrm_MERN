import React from "react"
import Layout from "../components/Layout"
import { HelloComponent } from "../generated/apolloComponents"

export default function HelloPage() {
  return (
    <Layout>
      <HelloComponent>
        {({ data }) => {
          return <div>{data && data.hello ? data.hello : "Loading..."}</div>
        }}
      </HelloComponent>
    </Layout>
  )
}
