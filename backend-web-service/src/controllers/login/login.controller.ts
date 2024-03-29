import ErrorRes from '../../utils/Erro'
import { Request, Response } from '../../types/express'
import LoginEntity from '../../entities/login/login.entity'

class LoginController {
  async loginUser (req: Request, res: Response): Promise<Response> {
    try {
      const token = await LoginEntity.loginUser(req.body.accountName, req.body.password)

      if (!token) {
        throw new ErrorRes(400, 'Authentication failed')
      }

      return res.status(200).json({ access_token: token })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new LoginController()
