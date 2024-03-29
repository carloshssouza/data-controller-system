import { ConfigurationUpdateData, IRestrictDataList } from '../../interfaces/configuration'
import ConfigurationSchemaValidator from '../validators/configuration/configuration.validator'

class ConfigurationValidator {
  /**
   * This function is responsible for validate the update configuration data
   * @param ConfigurationBody Object with applicationHost or mongoUriHost or restrictDataList
   * @returns Returns the result of the validation(error or schema value)
   */
  async updateConfiguration (ConfigurationBody: ConfigurationUpdateData) {
    return ConfigurationSchemaValidator.updateConfigurationValidation(ConfigurationBody)
  }

  async createConfigurationValidation (restrictDataList: IRestrictDataList) {
    return ConfigurationSchemaValidator.createConfigurationValidation(restrictDataList)
  }

  async addRestrictData (dataName: string, dataType: string) {
    return ConfigurationSchemaValidator.addRestrictDataValidation(dataName, dataType)
  }

  async updateRestrictData (oldDataName: string, newDataName: string, dataType: string) {
    return ConfigurationSchemaValidator.updateRestrictDataValidation(oldDataName, newDataName, dataType)
  }

  async deleteRestrictData (dataName: string, dataType: string) {
    return ConfigurationSchemaValidator.deleteRestrictDataValidation(dataName, dataType)
  }
}

export default new ConfigurationValidator()
