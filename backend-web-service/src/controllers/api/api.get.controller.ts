import ErrorRes from '../../utils/Erro'
import ApiEntity from '../../entities/api/api.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class ApiGetController {
  /**
   * Method to get api info
   * @param req Request object from the client
   * @param res Response object from the server
   * @returns Returns the api data object
   */
  public async getApi (req: Request, res: Response): Promise<Response> {
    try {
      const api = await ApiEntity.getApi(req.params._id as unknown as TypeId)

      if (!api) {
        throw new ErrorRes(500, 'Error getting api')
      }

      return res.status(200).json(api)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ApiGetController()
