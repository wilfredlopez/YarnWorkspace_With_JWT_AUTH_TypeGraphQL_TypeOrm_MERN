import { gql } from "apollo-boost"

export const changePasswordMutation = gql`
  mutation ChangePassword($token: String!, $password: String!) {
    changePassword(data: { token: $token, password: $password }) {
      id
      email
    }
  }
`
