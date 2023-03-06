import { ConfigurationCreateData, ConfigurationUpdateData } from '../../interfaces/configuration'
import ConfigurationSchemaValidator from '../validators/configuration/configuration.validator'

class ConfigurationValidator {
  /**
   * This function is responsible for validate the create configuration data
   * @param ConfigurationBody Object with mongoUriHost
   * @returns Returns the result of the validation(error or schema value)
   */
  async createConfiguration (ConfigurationBody: ConfigurationCreateData) {
    return ConfigurationSchemaValidator.createConfigurationValidation(ConfigurationBody)
  }

  /**
   * This function is responsible for validate the update configuration data
   * @param ConfigurationBody Object with applicationHost or mongoUriHost or restrictDataList
   * @returns Returns the result of the validation(error or schema value)
   */
  async updateConfiguration (ConfigurationBody: ConfigurationUpdateData) {
    return ConfigurationSchemaValidator.updateConfigurationValidation(ConfigurationBody)
  }

  async addRestrictDataList (ConfigurationBody: ConfigurationUpdateData) {
    return ConfigurationSchemaValidator.updateConfigurationValidation(ConfigurationBody)
  }
}

export default new ConfigurationValidator()
