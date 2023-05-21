import { Joi } from '../../../types/joi'
import { ConfigurationCreateData, ConfigurationUpdateData, IRestrictDataList } from '../../../interfaces/configuration'

class ConfigurationSchemaValidator {
  createConfigurationValidation (restrictDataList: IRestrictDataList) {
    const schema = Joi.object<ConfigurationCreateData>({
      restrictDataList: Joi.object({
        personal: Joi.array().items(Joi.string()).required(),
        sensible: Joi.array().items(Joi.string()).required()
      }).required()
    })

    return schema.validate({ restrictDataList })
  }

  updateConfigurationValidation (httpBody: ConfigurationUpdateData) {
    const schema = Joi.object<ConfigurationUpdateData>({
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
