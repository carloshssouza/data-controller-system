import ErrorRes from '../../utils/Erro'
import UserEntity from '../../entities/user/user.entity'
import { Request, Response } from '../../types/express'

class UserCreateController {
  public async createUser (req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserEntity.createUser(req.body)

      if (!user) {
        throw new ErrorRes(500, 'Error creating user')
      }

      return res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new UserCreateController()
