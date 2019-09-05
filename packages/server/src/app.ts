import express from "express"
import { ApolloServer } from "apollo-server-express"
import { Request, Response } from "express"
import { createConnection } from "typeorm"
import { buildSchema } from "type-graphql"
// import UserResolver from "./resolvers/user/userResolver"
// import ChangeForgotPasswordResolver from "./resolvers/user/changeForgotPasswordResolver"
import cors from "cors"
import { customAuthChecker } from "./resolvers/user/customAuthChecket"
import { MyContext } from "./schema/MyContext"
import cookieParser from "cookie-parser"

import { authMiddleware } from "./midleware/authMidleware"

const app = async () => {
  const schema = await buildSchema({
    // resolvers: [UserResolver, ChangeForgotPasswordResolver],
    resolvers: [__dirname + "/resolvers/**/*.ts"],
    authChecker: customAuthChecker,
  })

  const app: express.Application = express()
  app.use(cookieParser())
  app.use(
    cors({
      origin: "http://localhost:3000", //frontend
      credentials: true,
    }),
  )

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: MyContext) => ({ req, res }),
  })

  await createConnection() //connecting to mongodb
  app.use(authMiddleware)

  server.applyMiddleware({ app, cors: false }) // app is from an existing express app

  app.get("/", (req: Request, res: Response) => {
    res.redirect("/graphql")
  })

  const port = process.env.PORT || 4000

  app.listen({ port }, () => console.log(`Ready at http://localhost:${port}`))
}

export default app
