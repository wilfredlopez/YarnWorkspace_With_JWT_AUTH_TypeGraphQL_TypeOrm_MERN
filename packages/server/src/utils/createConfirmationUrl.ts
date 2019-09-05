import config from "../config"
import { User } from "../entity/User"
import { sign } from "jsonwebtoken"

export const createConfirmationUrl = async (
  userId: string,
): Promise<string> => {
  const user = await User.findOneOrFail({ id: userId })
  const token = sign(
    { userId: userId, email: user.email, count: user.count },
    config.JWT_SECRET,
    {
      expiresIn: "1day",
    },
  )

  user.token = token

  await user.save()
  return `${config.FRONTEND_URL}/user/confirm/${token}`
}
