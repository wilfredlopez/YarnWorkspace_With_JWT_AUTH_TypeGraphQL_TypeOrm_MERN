import * as React from "react"
import Layout from "../components/Layout"
import { NextPage } from "next"

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hi Next.js 👋</h1>
      <div>
        <p>
          This is my boilerplate app with a Apollo Server backend. GraphQl,
          using Cookies for Authentication and Express Sessions.
        </p>
        <p>
          This front end uses React, NextJS, graphql-codegen, typescript, and
          Apollo Boost.{" "}
          <span>
            <i>Dont look at the styling. a lot of work left to do there. </i>
          </span>
        </p>
        <p>by Wilfred Lopez</p>
      </div>
    </Layout>
  )
}

export default IndexPage
