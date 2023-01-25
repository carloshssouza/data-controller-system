import { UserCreateData, UserUpdateData } from '../../interfaces/user'
import { TypeId } from '../../types/mongoose'
import UserSchemaValidator from '../validators/user/user.validator'

class UserValidator {
  async createUserValidation (userData: UserCreateData) {
    return UserSchemaValidator.createUserValidation(userData)
  }

  async updateUserValidation (userData: UserUpdateData) {
    return UserSchemaValidator.updateUserValidation(userData)
  }

  getUserValidation (_id: TypeId) {
    return UserSchemaValidator.getUserValidation(_id)
  }
}

export default new UserValidator()
