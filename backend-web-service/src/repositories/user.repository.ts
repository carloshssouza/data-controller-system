import { UserCreateData, UserUpdateData } from '../interfaces/user'
import { TypeId } from '../types/mongoose'
import User from './schemas/User'

class UserRepository {
  public loadUser (accountName: string) {
    return User.findOne({ accountName })
  }

  public createUser (data: UserCreateData) {
    return User.create(data)
  }

  public getUser (_id: TypeId) {
    return User.findOne({ _id }).select('-password -createdAt -updatedAt')
  }

  public getDefaultUser (accountName: string) {
    return User.findOne({ accountName })
  }

  public updateUser (_id: TypeId, data: UserUpdateData) {
    return User.findOneAndUpdate({ _id }, data)
  }

  public getAllUsers () {
    return User.find({}).select('-password -createdAt -updatedAt')
  }

  public async deleteUser (_id: TypeId, userAdminId: TypeId) {
    const user = await User.findOne({ _id })
    if (user._id.toString() === userAdminId.toString()) {
      throw new Error('You cannot delete yourself')
    } else {
      return User.findOneAndDelete({ _id })
    }
  }
}

export default new UserRepository()
