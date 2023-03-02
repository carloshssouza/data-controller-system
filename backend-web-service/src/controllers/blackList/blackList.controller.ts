import ErrorRes from '../../utils/Erro'
import { Request, Response } from '../../types/express'
import BlackListEntity from '../../entities/blackList/blackList.entity'
import JwtService, { IToken } from '../../utils/Services/JwtService'

class BlackListController {
  async createRevokedToken (req: Request, res: Response): Promise<Response> {
    try {
      const token = JwtService.decode(req.headers.authorization) as unknown as IToken
      if (token) {
        const revokedToken = {
          token: req.headers.authorization,
          expiresAt: new Date(token.exp * 1000)
        }

        const response = await BlackListEntity.createRevokedToken(revokedToken)

        if (!response) {
          throw new ErrorRes(500, 'Error while revoking token')
        }

        return res.status(200).json({ message: 'Token successfully revoked' })
      } else {
        throw new ErrorRes(401, 'Token not valid')
      }
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new BlackListController()
