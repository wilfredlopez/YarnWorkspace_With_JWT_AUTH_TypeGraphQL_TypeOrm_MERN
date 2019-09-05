import { gql } from "apollo-boost"

export const meQuery = gql`
  query Me {
    me {
      email
      lastName
      firstName
      confirmed
      id
      name
    }
  }
`
