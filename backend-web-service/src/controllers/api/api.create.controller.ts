import ErrorRes from '../../utils/Erro'
import ApiEntity from '../../entities/api/api.entity'
import { Request, Response } from '../../types/express'

class ApiCreateController {
  public async createApi (req: Request, res: Response): Promise<Response> {
    try {
      const api = await new ApiEntity().createApi(req.body)

      if (!api) {
        throw new ErrorRes(500, 'Error creating api')
      }

      return res.status(201).json({ message: 'Api created successfully' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ApiCreateController()
