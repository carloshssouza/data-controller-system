import ErrorRes from '../../utils/Erro'
import UserEntity from '../../entities/user/user.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'
import JwtService, { IToken } from '../../utils/Services/JwtService'

class UserGetController {
  public async deleteUser (req: Request, res: Response): Promise<Response> {
    try {
      const token = JwtService.decode(req.headers.authorization) as unknown as IToken
      const userAdmin = await UserEntity.getUser(token.sub)

      const user = await UserEntity.deleteUser(req.params._id as unknown as TypeId, userAdmin._id as unknown as TypeId)
      if (!user) {
        throw new ErrorRes(500, 'Error getting user')
      }

      return res.status(201).json({ message: 'User deleted successfully' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new UserGetController()
