import { gql } from "apollo-boost"

export const filesQuery = gql`
  query Files {
    files
  }
`
