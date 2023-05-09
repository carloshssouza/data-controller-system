import { ErrorLogCreateData, ErrorLogFilter, ErrorLogUpdateData } from '../../../interfaces/errorLog'
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
      level: Joi.string().valid('low', 'medium', 'high').required()
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
      level: Joi.string().valid('low', 'medium', 'high').required()
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

  getAllErrorLogValidation (filter: ErrorLogFilter) {
    const schema = Joi.object<ErrorLogFilter>({
      createdAt: Joi.object({
        $gte: Joi.date().required(),
        $lte: Joi.date().required()
      }).required(),
      routeName: Joi.object({
        $regex: Joi.string().required(),
        $options: Joi.string().required()
      }).optional(),
      routeId: Joi.string().hex().length(24).optional().messages({
        'string.base': 'Invalid type',
        'string.hex': 'Invalid type',
        'string.length': 'Invalid id length'
      }).optional(),
      level: Joi.object({
        $in: Joi.array().items(Joi.string().valid('low', 'medium', 'high')).required()
      }).optional()
    })

    return schema.validate(filter)
  }
}

export default new ErrorLogSchemaValidator()
