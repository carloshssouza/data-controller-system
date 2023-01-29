import { ErrorLogCreateData, ErrorLogUpdateData } from '../../../interfaces/errorLog'
import { Joi } from '../../../types/joi'
import { TypeId } from '../../../types/mongoose'

class ErrorLogSchemaValidator {
  createErrorLogValidation (errorLogData: ErrorLogCreateData) {
    const schema = Joi.object<ErrorLogCreateData>({
      title: Joi.string().required(),
      description: Joi.string().required(),
      routeId: Joi.string().hex().length(24).required().messages({
        'string.base': 'Invalid type',
        'string.hex': 'Invalid type',
        'string.length': 'Invalid id length',
        'any.required': 'Id is required'
      }),
      leakedData: Joi.array().items({
        name: Joi.string().required(),
        type: Joi.string().required()
      }).required(),
      level: Joi.number().required()
    })

    return schema.validate(errorLogData)
  }

  updateErrorLogValidation (errorLogData: ErrorLogUpdateData) {
    const schema = Joi.object<ErrorLogUpdateData>({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      routeId: Joi.string().hex().length(24).required().messages({
        'string.base': 'Invalid type',
        'string.hex': 'Invalid type',
        'string.length': 'Invalid id length',
        'any.required': 'Id is required'
      }),
      leakedData: Joi.array().items({
        name: Joi.string().required(),
        type: Joi.string().required()
      }).optional(),
      level: Joi.number().optional()
    }).or('title', 'description', 'routeId', 'leakedData')

    return schema.validate(errorLogData)
  }

  getErrorLogValidation (_id: TypeId) {
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

  deleteErrorLogValidation (_id: TypeId) {
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

export default new ErrorLogSchemaValidator()
