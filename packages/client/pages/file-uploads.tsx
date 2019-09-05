import Layout from "../components/Layout"
import React from "react"

import { FilesGetter } from "../components/FileUploadHelpers/FilesGetter"
import FilesUploaderHelper from "../components/FileUploadHelpers/FilesUploader"

const FilesUploadPage: React.FunctionComponent = () => {
  return (
    <Layout title="File Uploads | Next.js + TypeScript Example">
      <h1>Files Upload</h1>
      <FilesUploaderHelper />
      <div>
        <FilesGetter />
      </div>
    </Layout>
  )
}

export default FilesUploadPage
