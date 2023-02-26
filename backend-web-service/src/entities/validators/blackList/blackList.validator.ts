import { Joi } from '../../../types/joi'
import { CreateRevokedToken } from '../../../interfaces/blackList'

class BlackListSchemaValidator {
  createRevokedTokenValidation (httpBody: CreateRevokedToken) {
    const schema = Joi.object<CreateRevokedToken>({
      token: Joi.string().required(),
      expiresAt: Joi.date().required()
    })

    return schema.validate(httpBody)
  }
}

export default new BlackListSchemaValidator()
