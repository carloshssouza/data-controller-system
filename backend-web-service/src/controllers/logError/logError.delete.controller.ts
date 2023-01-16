import ErrorRes from '../../utils/Erro'
import LogErrorEntity from '../../entities/logError/logError.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class LogErrorDeleteController {
  public async deleteLogError (req: Request, res: Response): Promise<Response> {
    try {
      const logError = await new LogErrorEntity().deleteLogError(req.params._id as unknown as TypeId)

      if (!logError) {
        throw new ErrorRes(500, 'Error deleting log error')
      }

      return res.status(200).json({ message: 'Log error deleted successfully' })
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new LogErrorDeleteController()
