import ErrorRes from '../../utils/Erro'
import { Request, Response } from '../../types/express'
import ApiRepository from '../../repositories/api.repository'

class ApiGetPermissionController {
  /**
   * Method to get api info
   * @param req Request object from the client
   * @param res Response object from the server
   * @returns Returns the api data object
   */
  public async getApiPermission (req: Request, res: Response): Promise<Response> {
    try {
      const endpointPath = req.body.endpointPath
      const requestType = req.body.requestType

      const api = await ApiRepository.getApiPermission(endpointPath, requestType)

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

export default new ApiGetPermissionController()
