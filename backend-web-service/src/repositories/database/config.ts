import configurationEntity from '../../entities/configuration/configuration.entity'
import UserEntity from '../../entities/user/user.entity'
import { mongoose } from '../../types/mongoose'
import defaultUser from '../utils/defaultUser'
import restrictDataList from '../utils/defaultRestrictDataList'

class Database {
  public async connect (url: string): Promise<boolean> {
    mongoose.set('strictQuery', true)

    return mongoose.connect(url)
      .then(async () => {
        console.log('Connected to Mongodb')
        const user = await UserEntity.getDefaultUser('admin')
        if (!user) {
          const createUser = UserEntity.createUser(defaultUser)
          const createRestrictData = configurationEntity.createConfiguration(restrictDataList)
          if (createRestrictData) {
            console.log('Default restrict data created')
          }
          if (createUser) {
            console.log('Default user created')
          }
        }
        return true
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  public disconnect () {
    return mongoose.disconnect()
  }
}

export default new Database()
