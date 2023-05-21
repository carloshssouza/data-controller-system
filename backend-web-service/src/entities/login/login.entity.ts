import ErrorRes from '../../utils/Erro/index'
import UserRepository from '../../repositories/user.repository'
import Encrypter from '../../utils/Services/EncrypterService'
import JwtService from '../../utils/Services/JwtService'
import LoginValidator from './login.validator'

class LoginEntity {
  public async loginUser (accountName: string, password: string) {
    const validate = await LoginValidator.authenticate({ accountName, password })
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    const user = await UserRepository.loadUser(accountName)
    if (!user) {
      throw new ErrorRes(401, 'Unauthorized')
    }

    const authValid = await Encrypter.compare(password, user?.password)
    if (!authValid) {
      throw new ErrorRes(401, 'Unauthorized')
    }

    return JwtService.generate({ sub: user._id })
  }
}

export default new LoginEntity()
