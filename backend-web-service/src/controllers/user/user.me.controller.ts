import ErrorRes from '../../utils/Erro'
import UserEntity from '../../entities/user/user.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'
import JwtService from '../../utils/Services/JwtService'

class UserMeController {
  public async getUser (req: Request, res: Response): Promise<Response> {
    try {
      const tokenDecoded = JwtService.decode(req.headers.authorization)

      const user = await new UserEntity().getUser(tokenDecoded.sub as unknown as TypeId)

      if (!user) {
        throw new ErrorRes(500, 'Error getting user')
      }

      return res.status(200).json(user)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new UserMeController()
