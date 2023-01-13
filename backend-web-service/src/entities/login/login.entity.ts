import ErrorRes from '../../utils/Erro/index'
import UserRepository from '../../repositories/user.repository'
import Encrypter from '../../utils/Services/EncrypterService'
import JwtService from '../../utils/Services/JwtService'
import LoginValidator from './login.validator'

export default class LoginEntity {
  public async loginUser (email: string, password: string) {
    const validate = await new LoginValidator().authenticate({ email, password })
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    const user = await new UserRepository().loadUser(email)
    if (!user) {
      throw new ErrorRes(401, 'Unauthorized')
    }

    const authValid = await new Encrypter().compare(password, user?.password)
    if (!authValid) {
      throw new ErrorRes(401, 'Unauthorized')
    }

    return new JwtService().generate({ sub: user._id })
  }
}
