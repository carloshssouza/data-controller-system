import { ConfigurationCreateData, ConfigurationUpdateData } from '../interfaces/configuration'
import Configuration from './schemas/Configuration'
import Database from './database/config'

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

  public async deleteApplicationHost () {
    const configuration = await Configuration.find({}) as any
    if (!configuration) {
      throw new Error('Configuration not found')
    } else {
      return Configuration.findOneAndUpdate({ _id: configuration[0]._id }, { applicationHost: '' })
    }
  }

  public async deleteMongoHost () {
    const configuration = await Configuration.find({}) as any
    if (!configuration) {
      throw new Error('Configuration not found')
    } else {
      const deleteConfiguration = Configuration.findOneAndUpdate({ _id: configuration[0]._id }, { mongoUriHost: '' })
      if (deleteConfiguration) {
        Database.disconnect()
        return true
      }
    }
  }

  public async connectToDatabase () {
    const configuration = await Configuration.find({}) as any

    if (!configuration) {
      throw new Error('Configuration not exists')
    }

    return await Database.connect(configuration.mongoUriHost)
  }
}

export default new ConfigurationRepository()
