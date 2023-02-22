import ErrorRes from '../../utils/Erro'
import { Request, Response } from '../../types/express'
import JwtService from '../../utils/Services/JwtService'

class ValidateTokenController {
  async validateToken (req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = JwtService.decode(token)
      if (!decoded) {
        throw new ErrorRes(401, 'Invalid authorization')
      }
      return res.status(200).json({ validate: decoded })
    } catch (error: any) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}
export default new ValidateTokenController()
