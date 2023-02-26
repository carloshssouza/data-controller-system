import BlackListRepository from '../../repositories/blackList.repository'
import { CreateRevokedToken } from '../../interfaces/blackList'
import BlackListValidator from './blackList.validator'
import ErrorRes from '../../utils/Erro'

class BlackListEntity {
  public async createRevokedToken (revokedToken: CreateRevokedToken) {
    const validate = await BlackListValidator.createRevokedTokenValidation(revokedToken)
    if (validate.error) {
      throw new ErrorRes(401, validate.error.message)
    }
    return BlackListRepository.createRevokedToken(revokedToken)
  }

  public async getRevokedToken (revokedToken: string) {
    return BlackListRepository.getRevokedToken(revokedToken)
  }
}

export default new BlackListEntity()
