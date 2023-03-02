import { CreateRevokedToken } from '../../interfaces/blackList'
import BlackListSchemaValidator from '../validators/blackList/blackList.validator'

class BlackListValidator {
  /**
   * This function is responsible for revoke the token
   * @param BlackListBody Object with token and expiresAt
   * @returns Returns the result of the validation(error or schema value)
   */
  async createRevokedTokenValidation (BlackListBody: CreateRevokedToken) {
    return BlackListSchemaValidator.createRevokedTokenValidation(BlackListBody)
  }
}

export default new BlackListValidator()
