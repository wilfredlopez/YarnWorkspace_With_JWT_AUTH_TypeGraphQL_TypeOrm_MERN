import * as React from "react"
import { MyContext } from "../interfaces/MyContext"
import {
  ConfirmMutation,
  ConfirmMutationVariables,
} from "../generated/apolloComponents"
import { confirmMutaion } from "../graphql/user/mutations/confirmMutation"
import redirect from "../lib/redirect"

export interface IConfirmationPageProps {}

export default class ConfirmationPage extends React.Component<
  IConfirmationPageProps
> {
  static async getInitialProps({
    query: { token },
    apolloClient,
    ...ctx
  }: MyContext) {
    console.log(token)

    if (!token) {
      return redirect(ctx, "/")
    }
    await apolloClient.mutate<ConfirmMutation, ConfirmMutationVariables>({
      mutation: confirmMutaion,
      variables: { token: token as string },
    })
    redirect(ctx, "/login")
  }
  public render() {
    return (
      <div>
        <h1>Confirmation Page</h1>
      </div>
    )
  }
}
