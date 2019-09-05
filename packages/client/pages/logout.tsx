import React from "react"
import Layout from "../components/Layout"
import { MyContext } from "../interfaces/MyContext"
import { logoutMutation } from "../graphql/user/mutations/logoutMutation"
import redirect from "../lib/redirect"

const LogoutPage = () => {
  return (
    <Layout title="Logout">
      <div>
        <h5>Logout page</h5>
      </div>
    </Layout>
  )
}

LogoutPage.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
  await apolloClient.mutate({
    mutation: logoutMutation,
  })
  await apolloClient.resetStore()

  redirect(ctx, "/login")
  //   Router.push("/login")
  return {}
}

export default LogoutPage
