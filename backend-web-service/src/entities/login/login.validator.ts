import { LoginInterface } from '../../interfaces/login/login.interface'
import LoginSchemaValidator from '../validators/login/login.validator'

class LoginValidator {
  /**
   * This function is responsible for validate the login data
   * @param loginBody Object with email and password
   * @returns Returns the result of the validation(error or schema value)
   */
  async authenticate (loginBody: LoginInterface) {
    return LoginSchemaValidator.authenticateValidation(loginBody)
  }
}

export default new LoginValidator()
