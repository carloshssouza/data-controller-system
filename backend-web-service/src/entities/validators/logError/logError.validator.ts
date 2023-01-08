import { LogErrorCreateData, LogErrorUpdateData } from '../../../interfaces/logError'
import { Joi } from '../../../types/joi'
import { TypeId } from '../../../types/mongoose'

export default class LogErrorSchemaValidator {
  createLogErrorValidation (httpBody: LogErrorCreateData) {
    const schema = Joi.object<LogErrorCreateData>({
      title: Joi.string().required(),
      description: Joi.string().required(),
      routeId: Joi.string().hex().length(24).required().messages({
        'string.base': 'Invalid type',
        'string.hex': 'Invalid type',
        'string.length': 'Invalid id length',
        'any.required': 'Id is required'
      }),
      routeName: Joi.string().required(),
      leakData: Joi.array().items({
        name: Joi.string().required(),
        type: Joi.string().required()
      }).required()
    })

    return schema.validate(httpBody)
  }

  updateLogErrorValidation (httpBody: LogErrorUpdateData) {
    const schema = Joi.object<LogErrorUpdateData>({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      routeId: Joi.string().hex().length(24).required().messages({
        'string.base': 'Invalid type',
        'string.hex': 'Invalid type',
        'string.length': 'Invalid id length',
        'any.required': 'Id is required'
      }),
      routeName: Joi.string().optional(),
      leakData: Joi.array().items({
        name: Joi.string().required(),
        type: Joi.string().required()
      }).optional()
    }).or('route', 'dataReturnAllowed')

    return schema.validate(httpBody)
  }

  getLogErrorValidation (_id: TypeId) {
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

  deleteLogErrorValidation (_id: TypeId) {
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
}
