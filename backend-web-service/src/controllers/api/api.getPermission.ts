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
      const endpointPathSplitted = req.body.endpointPath.split('/')[1]
      const requestType = req.body.requestType
      endpointPathSplitted.shift()

      const api = await ApiRepository.getApiPermission(endpointpath, requestType)

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
