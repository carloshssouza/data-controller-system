import ErrorRes from '../utils/Erro'
import { Request, Response, NextFunction } from '../types/express'
import TokenJWT, { IToken } from '../utils/Services/JwtService'
import BlackListEntity from '../entities/blackList/blackList.entity'

class Authenticate {
  public async authenticateCommon (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new ErrorRes(401, 'Token is required')
      }

      const revokedToken = await BlackListEntity.getRevokedToken(req.headers.authorization)

      if (!revokedToken) {
        const token = TokenJWT.decode(req.headers.authorization) as IToken

        if (!token) {
          throw new ErrorRes(401, 'Token not valid')
        }

        next()
      } else {
        throw new ErrorRes(401, 'Token revoked')
      }
    } catch (error) {
      console.error(error)
      if (error.expiredAt) {
        return res.status(401).json({ message: 'Token expired' })
      }
      return res.status(error.status).json({ message: error.message })
    }
  }

  public async authenticateAdmin (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new ErrorRes(401, 'Token is required')
      }

      const revokedToken = await BlackListEntity.getRevokedToken(req.headers.authorization)

      if (!revokedToken) {
        const token = TokenJWT.decode(req.headers.authorization) as IToken

        if (!token) {
          throw new ErrorRes(401, 'Token not valid')
        }

        next()
      } else {
        throw new ErrorRes(401, 'Token revoked')
      }
    } catch (error) {
      console.error(error)
      if (error.expiredAt) {
        return res.status(401).json({ message: 'Token expired' })
      }
      return res.status(error.status).json({ message: error.message })
    }
  }
}

export default new Authenticate()
