import { User } from "../entity/User"
import config from "../config"
import jwt from "jsonwebtoken"

export const createToken = (user: User) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    config.JWT_SECRET,
    {
      expiresIn: "30min",
    },
  )

  const refreshToken = jwt.sign(
    { userId: user.id, count: user.count },
    config.JWT_SECRET,
    { expiresIn: "7days" },
  )

  return { accessToken, refreshToken }
}
