import ErrorRes from '../../utils/Erro'
import ApiEntity from '../../entities/api/api.entity'
import { Request, Response } from '../../types/express'

class ApiGetAllController {
  public async getAllApis (req: Request, res: Response): Promise<Response> {
    try {
      const apis = await new ApiEntity().getAllApis()
      if (!apis) {
        throw new ErrorRes(500, 'Error getting all Apis')
      }

      return res.status(201).json(apis)
    } catch (error) {
      console.log(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ApiGetAllController()
