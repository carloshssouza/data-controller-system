import UserRepository from '../../repositories/user.repository'
import { TypeId } from '../../types/mongoose'
import Encrypter from '../../utils/Services/EncrypterService'
import { UserCreateData, UserUpdateData } from '../../interfaces/user'
import UserValidator from './user.validator'
import ErrorRes from '../../utils/Erro'

class UserEntity {
  public async createUser (data: UserCreateData) {
    const validate = await UserValidator.createUserValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    } else {
      data.password = await Encrypter.hash(data.password)
      return UserRepository.createUser(data)
    }
  }

  public getUser (_id: TypeId) {
    const validate = UserValidator.getUserValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return UserRepository.getUser(_id)
  }

  public async updateUser (_id: TypeId, data: UserUpdateData) {
    const validate = await UserValidator.updateUserValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    if (data.password) {
      data.password = await Encrypter.hash(data.password)
    }
    return UserRepository.updateUser(_id, data)
  }

  public async getAllUsers () {
    return UserRepository.getAllUsers()
  }

  public getDefaultUser (accountName: string) {
    return UserRepository.getDefaultUser(accountName)
  }

  public deleteUser (_id: TypeId, userAdminId: TypeId) {
    const validate = UserValidator.getUserValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return UserRepository.deleteUser(_id, userAdminId)
  }
}

export default new UserEntity()
