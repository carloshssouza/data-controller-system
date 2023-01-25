import ErrorRes from '../../utils/Erro'
import ApiEntity from '../../entities/api/api.entity'
import { Request, Response } from '../../types/express'

class ApiCreateController {
  /**
   * Method to create a new api infos
   * @param req Request object from the client
   * @param res Response object from the server
   * @returns Returns message about the new api info created successfully or error message
   */
  public async createApi (req: Request, res: Response): Promise<Response> {
    try {
      const api = await ApiEntity.createApi(req.body)

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
