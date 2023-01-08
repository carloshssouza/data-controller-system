import ErrorRes from '../utils/Erro'
import { Request, Response, NextFunction } from '../types/express'
import TokenJWT from '../utils/Services/JwtService'

interface IToken {
  payload: {
    sub: string,
  }
}
class Authenticate {
  public authenticateCommon (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new ErrorRes(401, 'Token is required')
      }

      const token = new TokenJWT().decode(req.headers.authorization) as IToken

      if (!token) {
        throw new ErrorRes(401, 'Token not valid')
      }

      next()
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }
}

export default new Authenticate()
