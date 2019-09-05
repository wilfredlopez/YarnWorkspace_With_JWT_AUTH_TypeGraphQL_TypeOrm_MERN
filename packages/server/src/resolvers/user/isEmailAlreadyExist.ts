import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator"
import { User } from "../../entity/User"

@ValidatorConstraint({ async: true })
export class isEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  async validate(email: any, _args: ValidationArguments) {
    return await User.findOne({ email }).then(user => {
      if (user) {
        return false
      }
      return true
    })
  }
}

export function isEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isEmailAlreadyExistConstraint,
    })
  }
}
