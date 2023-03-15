import { ConfigurationCreateData, ConfigurationUpdateData } from '../../interfaces/configuration'
import ErrorRes from '../../utils/Erro/index'
import ConfigurationValidator from './configuration.validator'
import ConfigurationRepository from '../../repositories/configuration.repository'
import Database from '../../repositories/database/config'
import isAppRunning from '../../utils/Services/CheckConnectionService'
import FileService from '../../utils/Services/FileService'
import restrictDataList from '../../utils/defaultRestrictDataList'

class ConfigurationEntity {
  public async createConfiguration (data: ConfigurationCreateData) {
    data.restrictDataList = restrictDataList

    const validate = await ConfigurationValidator.createConfiguration(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    const connection = await Database.connect(data.mongoUriHost)

    if (connection) {
      const configuration = await ConfigurationRepository.getConfiguration()
      if (configuration && configuration.mongoUriHost) {
        return configuration
      } else {
        FileService.createConfigFile(data.mongoUriHost, '../../../../configs/db.connection.json')

        return ConfigurationRepository.createConfiguration(data)
      }
    } else {
      throw new ErrorRes(500, 'Error connecting to database')
    }
  }

  public async addApplicationHost (data: ConfigurationUpdateData) {
    const validate = await ConfigurationValidator.updateConfiguration(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    const appConnected = await isAppRunning(data.applicationHost)
    if (!appConnected) throw new ErrorRes(500, 'Application host is not running')
    const configuration = {
      applicationHost: data.applicationHost,
      restrictDataList
    }

    const fileCreated = await FileService.createConfigFile(configuration, '../../../../configs/proxy.config.json')

    if (!fileCreated) throw new ErrorRes(500, 'Error creating config file')

    return ConfigurationRepository.updateConfiguration(data)
  }

  public async addRestrictDataList (data: ConfigurationUpdateData) {
    const validate = await ConfigurationValidator.updateConfiguration(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    const fileCreated = await FileService.createConfigFile(data.restrictDataList, '../../../../proxy-server/restrictDataList.json')

    if (!fileCreated) throw new ErrorRes(500, 'Error creating restrict data list file')

    return ConfigurationRepository.updateConfiguration(data)
  }

  public async updateConfiguration (data: ConfigurationUpdateData) {
    const validate = await ConfigurationValidator.updateConfiguration(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    return ConfigurationRepository.updateConfiguration(data)
  }

  public getConfiguration () {
    return ConfigurationRepository.getConfiguration()
  }

  public deleteApplicationHost () {
    return ConfigurationRepository.deleteApplicationHost()
  }

  public deleteMongoHost () {
    return ConfigurationRepository.deleteMongoHost()
  }

  public connectToDatabase () {
    return ConfigurationRepository.connectToDatabase()
  }
}

export default new ConfigurationEntity()
