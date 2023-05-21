import ErrorRes from '../../utils/Erro'
import UserEntity from '../../entities/user/user.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class UserGetController {
  public async getUser (req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserEntity.getUser(req.params._id as unknown as TypeId)

      if (!user) {
        throw new ErrorRes(500, 'Error getting user')
      }

      return res.status(201).json(user)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new UserGetController()
