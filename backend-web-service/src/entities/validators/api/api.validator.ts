import { ApiCreateData, ApiUpdateData } from '../../../interfaces/api'
import { Joi } from '../../../types/joi'
import { TypeId } from '../../../types/mongoose'

export default class ApiSchemaValidator {
  createApiValidation (httpBody: ApiCreateData) {
    const schema = Joi.object<ApiCreateData>({
      route: Joi.string().required(),
      dataReturnAllowed: Joi.boolean().required()
    })

    return schema.validate(httpBody)
  }

  updateApiValidation (httpBody: ApiUpdateData) {
    const schema = Joi.object<ApiUpdateData>({
      route: Joi.string().optional(),
      dataReturnAllowed: Joi.boolean().optional()
    }).or('route', 'dataReturnAllowed')

    return schema.validate(httpBody)
  }

  getApiValidation (_id: TypeId) {
    const schema = Joi.object({
      _id: Joi.string().hex().length(24).required().messages({
        'string.base': 'Invalid type',
        'string.hex': 'Invalid type',
        'string.length': 'Invalid id length',
        'any.required': 'Id is required'
      })
    })

    return schema.validate({ _id })
  }

  deleteApiValidation (_id: TypeId) {
    const schema = Joi.object({
      _id: Joi.string().hex().length(24).required().messages({
        'string.base': 'Invalid type',
        'string.hex': 'Invalid type',
        'string.length': 'Invalid id length',
        'any.required': 'Id is required'
      })
    })

    return schema.validate({ _id })
  }

  getApiPermissionValidation (route: string) {
    const schema = Joi.object({
      route: Joi.string().required()
    })

    return schema.validate({ route })
  }
}
