import { Joi } from '../../../types/joi'
import { LoginInterface } from '../../../interfaces/login/login.interface'

class LoginSchemaValidator {
  authenticateValidation (httpBody: LoginInterface) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })

    return schema.validate(httpBody)
  }
}

export default new LoginSchemaValidator()
