import { TypeId } from '../../types/mongoose'
import { ConfigurationCreateData, ConfigurationUpdateData } from '../../interfaces/configuration'
import ErrorRes from '../../utils/Erro/index'
import ConfigurationValidator from './configuration.validator'
import configurationRepository from '../../repositories/configuration.repository'
import Database from '../../repositories/database/config'
import isAppRunning from 'src/utils/Services/CheckConnectionService'
import FileService from 'src/utils/Services/FileService'

class ConfigurationEntity {
  public async createConfiguration (data: ConfigurationCreateData) {
    const validate = await ConfigurationValidator.createConfiguration(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    const connection = await Database.connect(data.mongoUrlHost)

    if (connection) {
      return configurationRepository.createConfiguration(data)
    } else {
      throw new ErrorRes(500, 'Connection failed')
    }
  }

  public async updateConfiguration (_id: TypeId, data: ConfigurationUpdateData) {
    const validate = await ConfigurationValidator.updateConfiguration(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    const appConnected = await isAppRunning(data.applicationHost)
    if (!appConnected) throw new ErrorRes(500, 'Application is not running')

    const fileCreated = FileService.createConfigFile(data.applicationHost)

    if (!fileCreated) throw new ErrorRes(500, 'Error creating config file')

    return configurationRepository.updateConfiguration(_id, data)
  }

  public getConfiguration () {
    return configurationRepository.getConfiguration()
  }
}

export default new ConfigurationEntity()
