import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import config from "../config"
import { User } from "../entity/User"
import { createToken } from "../utils/createToken"

export const authMiddleware = async function(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  //logic here
  try {
    const accessToken = req.cookies["access-token"]
    const refreshToken = req.cookies["refresh-token"]

    if (!refreshToken && !accessToken) {
      console.warn("No token provided in the request")
      return next()
    }

    try {
      const data = await verify(accessToken, config.JWT_SECRET)

      // console.log(data)

      //@ts-ignore
      req.userId = data.userId
      //@ts-ignore
      req.email = data.email
      next()
    } catch (error) {
      const data = (await verify(refreshToken, config.JWT_SECRET)) as any

      const user = await User.findOneOrFail(data.userId)

      if (!user || user.count !== data.count) {
        return next() //user count is not valid or no user
      }

      const tokens = createToken(user)

      const hour = 3600000

      res.cookie("refresh-token", tokens.refreshToken, {
        expires: true,
        maxAge: 14 * 24 * hour, //2 weeks
      })

      res.cookie("access-token", tokens.accessToken, {
        expires: true,
        maxAge: 24 * hour, //24 hours
      })

      await user.save()

      //@ts-ignore
      req.userId = data.userId
      //@ts-ignore
      req.email = data.email
      next()
    }
  } catch (error) {
    next()
  }
}
