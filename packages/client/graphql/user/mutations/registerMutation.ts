import { gql } from "apollo-boost"

export const registerMutation = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    register(
      userData: {
        email: $email
        password: $password
        firstname: $firstName
        lastname: $lastName
      }
    ) {
      email
      id
    }
  }
`
