import ErrorRes from '../../utils/Erro'
import ApiEntity from '../../entities/api/api.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class ApiGetController {
  public async updateApi (req: Request, res: Response): Promise<Response> {
    try {
      const api = await new ApiEntity().updateApi(req.params._id as unknown as TypeId, req.body)

      if (!api) {
        throw new ErrorRes(500, 'Error updating Api')
      }

      return res.status(201).json({ message: 'Api updated successfully' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ApiGetController()
