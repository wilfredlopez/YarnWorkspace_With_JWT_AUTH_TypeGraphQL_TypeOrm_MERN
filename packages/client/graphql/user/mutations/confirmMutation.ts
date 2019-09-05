import { gql } from "apollo-boost"

export const confirmMutaion = gql`
  mutation Confirm($token: String!) {
    confirmUser(token: $token)
  }
`
