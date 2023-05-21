import { ConfigurationUpdateData } from '../../interfaces/configuration'
import ErrorRes from '../../utils/Erro/index'
import ConfigurationValidator from './configuration.validator'
import ConfigurationRepository from '../../repositories/configuration.repository'
import { IRestrictData } from '../../repositories/interfaces/interfaces.schemas'

class ConfigurationEntity {
  public async createConfiguration (restrictDataList: IRestrictData) {
    const validate = await ConfigurationValidator.createConfigurationValidation(restrictDataList)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    return ConfigurationRepository.createConfiguration(restrictDataList)
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

  public async getRestrictData (dataType?: string) {
    return ConfigurationRepository.getRestrictData(dataType)
  }
}

export default new ConfigurationEntity()
