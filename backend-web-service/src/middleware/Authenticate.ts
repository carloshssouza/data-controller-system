import ErrorRes from '../utils/Erro'
import { Request, Response, NextFunction } from '../types/express'
import TokenJWT, { IToken } from '../utils/Services/JwtService'
import BlackListEntity from '../entities/blackList/blackList.entity'
import UserEntity from '../entities/user/user.entity'

class Authenticate {
  public async authenticateAdmin (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new ErrorRes(401, 'Token is required')
      }

      const revokedToken = await BlackListEntity.getRevokedToken(req.headers.authorization)

      if (!revokedToken) {
        const token = TokenJWT.decode(req.headers.authorization) as unknown as IToken

        if (token.error) {
          throw new ErrorRes(401, token.message)
        }

        const user = await UserEntity.getUser(token.sub)
        if (!user) {
          throw new ErrorRes(401, 'User not found')
        }
        token.type = user.type

        if (token.type !== 'admin') {
          throw new ErrorRes(401, 'User not authorized')
        }

        next()
      } else {
        throw new ErrorRes(401, 'Token revoked')
      }
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }

  public async authenticateCommon (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new ErrorRes(401, 'Token is required')
      }

      const revokedToken = await BlackListEntity.getRevokedToken(req.headers.authorization)

      if (!revokedToken) {
        const token = TokenJWT.decode(req.headers.authorization) as unknown as IToken
        if (token.error) {
          throw new ErrorRes(401, token.message)
        }

        next()
      } else {
        throw new ErrorRes(401, 'Token revoked')
      }
    } catch (error) {
      return res.status(error.status).json({ message: error.message })
    }
  }
}

export default new Authenticate()
