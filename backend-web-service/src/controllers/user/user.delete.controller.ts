import ErrorRes from '../../utils/Erro'
import UserEntity from '../../entities/user/user.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class UserDeleteController {
  public async deleteUser (req: Request, res: Response): Promise<Response> {
    try {
      const user = await new UserEntity().deleteUser(req.params._id as unknown as TypeId)

      if (!user) {
        throw new ErrorRes(500, 'Error deleting user')
      }

      return res.status(201).json({ message: 'User deleted successfully' })
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new UserDeleteController()
