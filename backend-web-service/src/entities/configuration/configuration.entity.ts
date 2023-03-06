import { ConfigurationCreateData, ConfigurationUpdateData } from '../../interfaces/configuration'
import ErrorRes from '../../utils/Erro/index'
import ConfigurationValidator from './configuration.validator'
import configurationRepository from '../../repositories/configuration.repository'
import Database from '../../repositories/database/config'
import isAppRunning from '../../utils/Services/CheckConnectionService'
import FileService from '../../utils/Services/FileService'

class ConfigurationEntity {
  public async createConfiguration (data: ConfigurationCreateData) {
    const validate = await ConfigurationValidator.createConfiguration(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    const connection = await Database.connect(data.mongoUriHost)

    if (connection) {
      FileService.createConfigFile(data.mongoUriHost, '../../../config.json')
      return configurationRepository.createConfiguration(data)
    } else {
      throw new ErrorRes(500, 'Connection failed')
    }
  }

  public async addApplicationHost (data: ConfigurationUpdateData) {
    const validate = await ConfigurationValidator.updateConfiguration(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    const appConnected = await isAppRunning(data.applicationHost)
    if (!appConnected) throw new ErrorRes(500, 'Application host is not running')

    const fileCreated = await FileService.createConfigFile(data.restrictDataList, '../../../../proxy-server/src/services/DataControlService')

    if (!fileCreated) throw new ErrorRes(500, 'Error creating config file')

    return configurationRepository.updateConfiguration(data)
  }

  public async addRestrictDataList (data: ConfigurationUpdateData) {
    const validate = await ConfigurationValidator.updateConfiguration(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    const fileCreated = await FileService.createConfigFile(data.applicationHost, '../../../../proxy-server/restrictDataList.json')

    if (!fileCreated) throw new ErrorRes(500, 'Error creating restrict data list file')

    return configurationRepository.updateConfiguration(data)
  }

  public async updateConfiguration (data: ConfigurationUpdateData) {
    const validate = await ConfigurationValidator.updateConfiguration(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    return configurationRepository.updateConfiguration(data)
  }

  public getConfiguration () {
    return configurationRepository.getConfiguration()
  }
}

export default new ConfigurationEntity()
