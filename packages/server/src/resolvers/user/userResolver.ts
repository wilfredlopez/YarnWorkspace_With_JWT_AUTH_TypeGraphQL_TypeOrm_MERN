import bcrypt from "bcryptjs"
import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql"
import { User, UserInputType, UserLoginInput } from "../../entity/User"
import { MyContext } from "../../schema/MyContext"
import { createToken } from "../../utils/createToken"
import { verify } from "jsonwebtoken"
import config from "../../config"

@Resolver(User)
export class UserResolver {
  @Query(() => String!)
  async test() {
    return "Hello Woruld"
  }

  //Cannot pass the entity or typescript type to the @mutation
  //need to create an object type. @ObjectType for this
  @Mutation(returns => User)
  async register(@Arg("userData")
  {
    email,
    password,
    lastname,
    firstname,
  }: UserInputType): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      //   await this.recipeService.removeById(id);
      const user = await User.create({
        email: email,
        password: hashedPassword,
        firstName: firstname,
        lastName: lastname,
        count: 0,
        confirmed: false,
      }).save()

      return user
    } catch (e) {
      throw new Error(e)
    }
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("loginData")
    { email, password }: UserLoginInput,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      })
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
          throw new Error("Invalid Password") //if password is not valid
        }

        //TODO: I NEED TO FIX THIS WHEN I ADD EMAIL CONFIRMATION
        // if (!user.confirmed) {
        //   throw new Error("Not Confirmed. Please confirm your email address") //if password is not valid
        // }

        const { accessToken, refreshToken } = createToken(user)

        const hour = 3600000

        ctx.res.cookie("refresh-token", refreshToken, {
          expires: true,
          maxAge: 14 * 24 * hour, //2 weeks
        })

        ctx.res.cookie("access-token", accessToken, {
          expires: true,
          maxAge: 24 * hour, //24 hours
        })

        return user //if password is valid
      }
      return null
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const request = ctx.req as any

    //@ts-ignore
    if (!ctx.req.userId) {
      return undefined
    }

    //do it with user id
    const user = await User.findOneOrFail(request.userId)

    //do it with email
    // const user = await User.findOne({
    //   where: {
    //     email: request.email,
    //   },
    // })
    if (user) {
      return user
    } else {
      return undefined
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    ctx.res.clearCookie("access-token")
    ctx.res.clearCookie("refresh-token")
    return true
  }

  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<Boolean> {
    const verified = (await verify(token, config.JWT_SECRET)) as any

    if (!verified.userId) {
      return false
    }
    const user = await User.findOneOrFail({ id: verified.userId })
    if (!user) {
      return false
    }

    user.confirmed = true
    await user.save()

    return true
  }

  @Authorized() //only authorized members can access
  @Query(() => String, { nullable: true })
  async AmIAuthorized(@Ctx() ctx: MyContext): Promise<string> {
    // //@ts-ignore
    // if (!ctx.req.session.userId) {
    //   return null
    // }
    return "Hello World"
  }

  // @Query(returns => [User])
  // async getAllUsers() {
  //   const users = await User.find()
  //   return users
  // }
}

export default UserResolver
