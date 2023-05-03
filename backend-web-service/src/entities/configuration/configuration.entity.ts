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

    const applicationHostConfigFileCreated = await FileService.createConfigFile(configuration.applicationHost, '../../../../configs/applicationHost.config.json')
    const restrictDataListConfigFileCreated = await FileService.createConfigFile(configuration.restrictDataList, '../../../../configs/restrictDataList.config.json')

    if (!applicationHostConfigFileCreated || !restrictDataListConfigFileCreated) throw new ErrorRes(500, 'Error creating config file')

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

  public async addRestrictData (dataName: string, dataType: string) {
    const validate = await ConfigurationValidator.addRestrictData(dataName, dataType)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return ConfigurationRepository.addRestrictData(dataName, dataType)
  }

  public async deleteRestrictData (dataName: string, dataType: string) {
    const validate = await ConfigurationValidator.deleteRestrictData(dataName, dataType)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return ConfigurationRepository.deleteRestrictData(dataName, dataType)
  }

  public async updateRestrictData (oldDataName: string, newDataName: string, dataType: string) {
    const validate = await ConfigurationValidator.updateRestrictData(oldDataName, newDataName, dataType)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return ConfigurationRepository.updateRestrictData(oldDataName, newDataName, dataType)
  }
}

export default new ConfigurationEntity()
