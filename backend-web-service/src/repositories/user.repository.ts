import { UserCreateData, UserUpdateData } from '../interfaces/user'
import { TypeId } from '../types/mongoose'
import User from './schemas/User'

class UserRepository {
  public loadUser (email: string) {
    return User.findOne({ email })
  }

  public createUser (data: UserCreateData) {
    return User.create(data)
  }

  public getUser (_id: TypeId) {
    return User.findOne({ _id }).select('-password -createdAt -updatedAt')
  }

  public updateUser (_id: TypeId, data: UserUpdateData) {
    return User.findOneAndUpdate({ _id }, data)
  }

  public getAllUsers () {
    return User.find({}).select('-password -createdAt -updatedAt')
  }

  public deleteUser (_id: TypeId) {
    return User.findOneAndDelete({ _id })
  }
}

export default new UserRepository()
