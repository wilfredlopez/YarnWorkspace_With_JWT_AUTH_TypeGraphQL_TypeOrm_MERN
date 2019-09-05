import { gql } from "apollo-boost"

export const logoutMutation = gql`
  mutation logout {
    logout
  }
`
