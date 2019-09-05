import { gql } from "apollo-boost"

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginData: { email: $email, password: $password }) {
      email
      firstName
      lastName
      name
      id
      confirmed
    }
  }
`
