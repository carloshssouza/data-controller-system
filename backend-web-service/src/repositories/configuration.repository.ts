import { ConfigurationCreateData, ConfigurationUpdateData } from '../interfaces/configuration'
import Configuration from './schemas/Configuration'
import Database from './database/config'
import ArrayUtils from '../utils/Array/ArrayUtils'
import CacheManager from '../utils/Services/CacheManager'

class ConfigurationRepository {
  public createConfiguration (data: ConfigurationCreateData) {
    const configuration = Configuration.create(data)
    CacheManager.clear()
    return configuration
  }

  public async getConfiguration () {
    const configurationCached = CacheManager.get('configuration')
    if (configurationCached) {
      return configurationCached
    }

    const configuration = await Configuration.findOne({})
    CacheManager.set('configuration', configuration)

    return configuration
  }

  public async updateConfiguration (data: ConfigurationUpdateData) {
    const configuration = await Configuration.find({}) as any
    if (!configuration) {
      throw new Error('Configuration not found')
    } else {
      const configurationUpdated = Configuration.findOneAndUpdate({ _id: configuration[0]._id }, data)
      CacheManager.delete('configuration')
      return configurationUpdated
    }
  }

  public async updateConfigurationMongoUri (mongoUri: string) {
    const configuration = await Configuration.find({}) as any
    if (!configuration) {
      throw new Error('Configuration not found')
    } else {
      CacheManager.delete('configuration')
      return Configuration.findOneAndUpdate({ _id: configuration[0]._id }, { mongoUriHost: mongoUri })
    }
  }

  public async deleteApplicationHost () {
    const configuration = await Configuration.find({}) as any
    if (!configuration) {
      throw new Error('Configuration not found')
    } else {
      CacheManager.delete('configuration')
      return Configuration.findOneAndUpdate({ _id: configuration[0]._id }, { applicationHost: '' })
    }
  }

  public async deleteMongoHost () {
    const configuration = await Configuration.find({}) as any
    if (!configuration) {
      throw new Error('Configuration not found')
    } else {
      const deleteConfiguration = await Configuration.findOneAndUpdate({ _id: configuration[0]._id }, { mongoUriHost: '' })
      CacheManager.delete('configuration')
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

  public async addRestrictData (dataName: string, dataType: string) {
    const configuration = await Configuration.find({}).select('_id restrictDataList')
    if (!configuration) {
      throw new Error('Configuration not exists')
    } else {
      const restrictDataList = configuration[0].restrictDataList
      const restrictDataTypeArray = dataType === 'personal' ? restrictDataList.personal : restrictDataList.sensible
      restrictDataTypeArray.push(dataName)
      restrictDataList.personal = restrictDataTypeArray
      CacheManager.delete('configuration')
      return Configuration.findOneAndUpdate({ _id: configuration[0]._id }, { restrictDataList })
    }
  }

  public async updateRestrictData (oldDataName: string, newDataName: string, dataType: string) {
    const configuration = await Configuration.find({}).select('_id restrictDataList')
    if (!configuration) {
      throw new Error('Configuration not exists')
    } else {
      const restrictDataList = configuration[0].restrictDataList
      const restrictDataTypeArray = dataType === 'personal' ? restrictDataList.personal : restrictDataList.sensible
      const index = restrictDataTypeArray.indexOf(oldDataName)

      if (index !== -1) {
        restrictDataTypeArray[index] = newDataName
      }

      restrictDataList[dataType === 'personal' ? 'personal' : 'sensible'] = ArrayUtils.updateStringElement(restrictDataTypeArray, oldDataName, newDataName)
      CacheManager.delete('restrictDataList')

      return Configuration.findOneAndUpdate({ _id: configuration[0]._id }, { restrictDataList })
    }
  }

  public async deleteRestrictData (dataName: string, dataType: string) {
    const configuration = await Configuration.find({}).select('_id restrictDataList')
    if (!configuration) {
      throw new Error('Configuration not exists')
    } else {
      const restrictDataList = configuration[0].restrictDataList
      const restrictDataTypeArray = dataType === 'personal' ? restrictDataList.personal : restrictDataList.sensible
      const index = restrictDataTypeArray.indexOf(dataName)

      if (index !== -1) {
        restrictDataTypeArray.splice(index, 1)
      }

      restrictDataList[dataType === 'personal' ? 'personal' : 'sensible'] = restrictDataTypeArray
      CacheManager.delete('restrictDataList')

      return Configuration.findOneAndUpdate({ _id: configuration[0]._id }, { restrictDataList })
    }
  }

  public async getRestrictData (dataType?: string) {
    if (!dataType) {
      const restrictDataListCache = CacheManager.get('restrictDataList')
      if (restrictDataListCache) {
        return restrictDataListCache
      }

      const config = await Configuration.find({}).select('restrictDataList -_id')
      CacheManager.set('restrictDataList', config[0].restrictDataList)

      return config[0].restrictDataList
    } else {
      const config = await Configuration.find({}).select('restrictDataList -_id')
      const restrictDataListType = dataType === 'personal' ? config[0].restrictDataList.personal : config[0].restrictDataList.sensible
      return restrictDataListType
    }
  }
}

export default new ConfigurationRepository()
