import ErrorRes from '../../utils/Erro'
import ApiEntity from '../../entities/api/api.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class ApiDeleteController {
  /**
   * Method to delete api
   * @param req Request object from the client
   * @param res Response object from the server
   * @returns Returns message about the api info was deleted
   */
  public async deleteApi (req: Request, res: Response): Promise<Response> {
    try {
      const api = await ApiEntity.deleteApi(req.params._id as unknown as TypeId)

      if (!api) {
        throw new ErrorRes(500, 'Error deleting Api')
      }

      return res.status(200).json({ message: 'Api deleted successfully' })
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ApiDeleteController()
