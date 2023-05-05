import { Joi } from '../../../types/joi'
import { ConfigurationCreateData, ConfigurationUpdateData } from '../../../interfaces/configuration'

class ConfigurationSchemaValidator {
  createConfigurationValidation (httpBody: ConfigurationCreateData) {
    const schema = Joi.object({
      mongoUriHost: Joi.string().uri().regex(/^mongodb(?:\+srv)?:\/\//).required(),
      restrictDataList: Joi.object({
        personal: Joi.array().items(Joi.string()).required(),
        sensible: Joi.array().items(Joi.string()).required()
      }).required()
    })

    return schema.validate(httpBody)
  }

  updateConfigurationValidation (httpBody: ConfigurationUpdateData) {
    const schema = Joi.object({
      mongoUriHost: Joi.string().uri().regex(/^mongodb(?:\+srv)?:\/\/(?:(?:[^:]+:[^@]+)@)?([^/?]+)(?:\/([^?]+))?(?:\?(?:[^=&]+=[^&]+(?:&[^=&]+=[^&]+)*)?)?$/i).optional(),
      applicationHost: Joi.string().uri({ scheme: ['http', 'https'] }).optional(),
      restrictDataList: Joi.object({
        personal: Joi.array().items(Joi.string()).optional(),
        sensible: Joi.array().items(Joi.string()).optional()
      }).optional()
    }).or('mongoUriHost', 'applicationHost')

    return schema.validate(httpBody)
  }

  addRestrictDataValidation (dataName: string, dataType: string) {
    const schema = Joi.object({
      dataName: Joi.string().required(),
      dataType: Joi.string().required()
    })

    return schema.validate({ dataName, dataType })
  }

  updateRestrictDataValidation (oldDataName: string, newDataName: string, dataType: string) {
    const schema = Joi.object({
      oldDataName: Joi.string().required(),
      newDataName: Joi.string().required(),
      dataType: Joi.string().required()
    })

    return schema.validate({ oldDataName, newDataName, dataType })
  }

  deleteRestrictDataValidation (newDataName: string, dataType: string) {
    const schema = Joi.object({
      newDataName: Joi.string().required(),
      dataType: Joi.string().required()
    })

    return schema.validate({ newDataName, dataType })
  }
}

export default new ConfigurationSchemaValidator()
