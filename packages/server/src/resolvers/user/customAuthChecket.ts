import { AuthChecker } from "type-graphql"
import { MyContext } from "../../schema/MyContext"

export const customAuthChecker: AuthChecker<MyContext> = (
  { root, args, context, info },
  roles,
) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  //@ts-ignore
  if (context.req.userId) {
    return true
  }

  return false // or false if access is denied
}
