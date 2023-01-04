import { UserCreateData, UserUpdateData } from '../../interfaces/user'
import { TypeId } from '../../types/mongoose'
import UserSchemaValidator from '../validators/user/user.validator'

export default class UserValidator {
  async createUserValidation (userData: UserCreateData) {
    return new UserSchemaValidator().createUserValidation(userData)
  }

  async updateUserValidation (userData: UserUpdateData) {
    return new UserSchemaValidator().updateUserValidation(userData)
  }

  getUserValidation (_id: TypeId) {
    return new UserSchemaValidator().getUserValidation(_id)
  }

  deleteUserValidation (_id: TypeId) {
    return new UserSchemaValidator().deleteUserValidation(_id)
  }
}
