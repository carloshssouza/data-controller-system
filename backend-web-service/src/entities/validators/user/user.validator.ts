import { UserCreateData, UserUpdateData } from '../../../interfaces/user'
import { Joi } from '../../../types/joi'
import { TypeId } from '../../../types/mongoose'

export default class UserSchemaValidator {
  createUserValidation (httpBody: UserCreateData) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      type: Joi.string().valid('common', 'admin').optional()
    })

    return schema.validate(httpBody)
  }

  updateUserValidation (httpBody: UserUpdateData) {
    const schema = Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().optional()
    }).or('name', 'email')

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
