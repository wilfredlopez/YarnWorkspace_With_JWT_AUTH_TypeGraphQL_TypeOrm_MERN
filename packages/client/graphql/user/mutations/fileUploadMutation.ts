import { gql } from "apollo-boost"

export const fileUploadMutation = gql`
  mutation FileUpload($upload: Upload!) {
    fileUpload(file: $upload)
  }
`
