import UserRepository from '../../repositories/user.repository'
import { TypeId } from '../../types/mongoose'
import Encrypter from '../../utils/Services/EncrypterService'
import { UserCreateData, UserUpdateData } from '../../interfaces/user'
import UserValidator from './user.validator'
import ErrorRes from '../../utils/Erro'

export default class UserEntity {
  public async createUser (data: UserCreateData) {
    const validate = await new UserValidator().createUserValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    } else {
      data.password = await new Encrypter().hash(data.password)
      return new UserRepository().createUser(data)
    }
  }

  public getUser (_id: TypeId) {
    const validate = new UserValidator().getUserValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new UserRepository().getUser(_id)
  }

  public async updateUser (_id: TypeId, data: UserUpdateData) {
    const validate = await new UserValidator().updateUserValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    if (data.password) {
      data.password = await new Encrypter().hash(data.password)
    }
    return new UserRepository().updateUser(_id, data)
  }
}
