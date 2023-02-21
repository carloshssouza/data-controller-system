import { Joi } from '../../../types/joi'
import { ConfigurationCreateData, ConfigurationUpdateData } from '../../../interfaces/configuration'

class ConfigurationSchemaValidator {
  createConfigurationValidation (httpBody: ConfigurationCreateData) {
    const schema = Joi.object({
      mongoUriHost: Joi.string().uri().regex(/^mongodb(?:\+srv)?:\/\/((\w+):(\w+)@)?([^/?#:]+):(\d+)(\/.+)?$/).required()
    })

    return schema.validate(httpBody)
  }

  updateConfigurationValidation (httpBody: ConfigurationUpdateData) {
    const schema = Joi.object({
      mongoUriHost: Joi.string().uri().regex(/^mongodb(?:\+srv)?:\/\/((\w+):(\w+)@)?([^/?#:]+):(\d+)(\/.+)?$/).optional(),
      applicationHost: Joi.string().uri({ scheme: ['http', 'https'] }).optional()
    }).or('mongoUriHost', 'applicationHost')

    return schema.validate(httpBody)
  }
}

export default new ConfigurationSchemaValidator()
