import { UserCreateData, UserUpdateData } from '../../../interfaces/user'
import { Joi } from '../../../types/joi'
import { TypeId } from '../../../types/mongoose'

class UserSchemaValidator {
  createUserValidation (httpBody: UserCreateData) {
    const schema = Joi.object<UserCreateData>({
      name: Joi.string().required(),
      accountName: Joi.string().min(4).max(10).required(),
      password: Joi.string().required().min(4).max(16),
      type: Joi.string().valid('user', 'admin').optional(),
      extraPermissions: Joi.array().items(Joi.string()).optional()
    })

    return schema.validate(httpBody)
  }

  updateUserValidation (httpBody: UserUpdateData) {
    const schema = Joi.object({
      _id: Joi.string().hex().length(24).required().messages({
        'string.base': 'Invalid type',
        'string.hex': 'Invalid type',
        'string.length': 'Invalid id length',
        'any.required': 'Id is required'
      }),
      name: Joi.string().optional(),
      password: Joi.string().optional().min(4).max(16).optional(),
      extraPermissions: Joi.array().items(Joi.string()).optional()
    }).or('name', 'password', 'extraPermissions')

    return schema.validate(httpBody)
  }

  getUserValidation (_id: TypeId) {
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

export default new UserSchemaValidator()
