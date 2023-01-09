import ErrorRes from '../../utils/Erro'
import ApiEntity from '../../entities/api/api.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class ApiDeleteController {
  public async deleteApi (req: Request, res: Response): Promise<Response> {
    try {
      const api = await new ApiEntity().deleteApi(req.params._id as unknown as TypeId)

      if (!api) {
        throw new ErrorRes(500, 'Error deleting Api')
      }

      return res.status(201).json({ message: 'Api deleted successfully' })
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ApiDeleteController()
