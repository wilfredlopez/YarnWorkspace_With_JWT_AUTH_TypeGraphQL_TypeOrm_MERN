// TODO: I NEED TO ADD THE GOOGLE STORAGE SERVICE JSON (google-storage-service.json) TO THE ROOT OF THIS SERVER
// ALSO ADD GOOGLE CLOUD STORAGE PACKAGE

import { Storage } from "@google-cloud/storage"
import path from "path"

import { Resolver, Mutation, Query, Field, ObjectType, Arg } from "type-graphql"
import { Readable } from "stream"
import { ReadStream } from "fs"
import { GraphQLUpload } from "graphql-upload"

export interface Upload {
  stream: Readable
  createReadStream(): ReadStream
  filename: string
  mimetype: string
  encoding: string
}

@ObjectType()
export class UploadType {
  @Field(() => Boolean)
  stream!: Readable
  @Field(() => Boolean)
  createReadStream!: () => ReadStream
  @Field(() => String)
  filename!: string
  @Field(() => String)
  mimetype!: string
  @Field(() => String)
  encoding!: string
}

const googleGloud = new Storage({
  keyFilename: path.join(
    __dirname,
    "..",
    "..",
    "..",
    "google-storage-service.json",
  ),
  projectId: "optimum-tensor-251513",
})

@ObjectType()
export class FilesType {
  @Field(() => [String])
  files!: Array<string>
}

//Testing
// googleGloud.getBuckets().then(b => console.log(b))

const wilfredFiles = googleGloud.bucket("files-wilfred")

@Resolver()
export default class FilesResolver {
  @Query(() => [String])
  async files(): Promise<Array<string>> {
    const filesinfo: Array<string> = []
    await wilfredFiles.getFiles().then(async f => {
      await f.forEach(bucket => {
        bucket.forEach((file: any) => filesinfo.push(file.name))
      })
    })
    return filesinfo
  }

  @Mutation(() => Boolean)
  async fileUpload(
    @Arg("file", type => GraphQLUpload) file: UploadType,
  ): Promise<Boolean> {
    console.log("TRYING TO  UPLOAD")
    console.log(file)
    try {
      const { createReadStream, filename } = await file
      await new Promise(res =>
        createReadStream()
          .pipe(
            wilfredFiles
              // .file(`/${Date.now()}/${filename}`)
              .file(filename)
              .createWriteStream({
                resumable: false,
                gzip: true,
              })
              .on("finish", res),
          )
          .on("close", res),
      )

      //OLDWAY

      // await new Promise(res =>
      //   createReadStream()
      //     .pipe(
      //       wilfredFiles.file(filename)
      //         .createWriteStream({
      //           resumable: false,
      //           gzip: true,
      //         }).
      //         on("finish", res),
      //     )
      //     .on("close", res),
      // )
      return true
    } catch (error) {
      return false
    }
  }
}
