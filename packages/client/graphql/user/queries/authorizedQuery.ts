import { gql } from "apollo-boost"

export const authorizedQuery = gql`
  query amIAuthorized {
    AmIAuthorized
  }
`
