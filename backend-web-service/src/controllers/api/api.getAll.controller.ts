import ErrorRes from '../../utils/Erro'
import ApiEntity from '../../entities/api/api.entity'
import { Request, Response } from '../../types/express'

class ApiGetAllController {
  /**
   * Method to create a new api infos
   * @param req Request object from the client
   * @param res Response object from the server
   * @returns Returns array if api data
   */
  public async getAllApis (req: Request, res: Response): Promise<Response> {
    try {
      const apis = await ApiEntity.getAllApis()
      if (!apis) {
        throw new ErrorRes(500, 'Error getting all Apis')
      }

      return res.status(200).json(apis)
    } catch (error) {
      console.log(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ApiGetAllController()
