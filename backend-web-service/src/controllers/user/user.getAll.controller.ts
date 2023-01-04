import ErrorRes from '../../utils/Erro'
import UserEntity from '../../entities/user/user.entity'
import { Request, Response } from '../../types/express'

class UserGetAllController {
  public async getAllUsers (req: Request, res: Response): Promise<Response> {
    try {
      const users = await new UserEntity().getAllUsers()

      if (!users) {
        throw new ErrorRes(500, 'Error getting all users')
      }

      return res.status(201).json(users)
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new UserGetAllController()
