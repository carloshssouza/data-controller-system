import { ConfigurationCreateData, ConfigurationUpdateData } from '../interfaces/configuration'
import Configuration from './schemas/Configuration'

class ConfigurationRepository {
  public createConfiguration (data: ConfigurationCreateData) {
    return Configuration.create(data)
  }

  public getConfiguration () {
    return Configuration.findOne({})
  }

  public async updateConfiguration (data: ConfigurationUpdateData) {
    const configuration = await Configuration.find({}) as any
    if (!configuration) {
      throw new Error('Configuration not found')
    } else {
      return Configuration.findOneAndUpdate({ _id: configuration[0]._id }, data)
    }
  }

  public async addRestrictDataList (data:any) {
    const configuration = await Configuration.find({}) as any
    if (!configuration) {
      throw new Error('Configuration not found')
    } else {
      return Configuration.findOneAndUpdate({ _id: configuration[0]._id }, data)
    }
  }
}

export default new ConfigurationRepository()
