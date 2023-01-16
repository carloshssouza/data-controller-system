import ErrorRes from '../../utils/Erro'
import LogError from '../../entities/logError/logError.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class LogErrorGetController {
  public async getLogError (req: Request, res: Response): Promise<Response> {
    try {
      const logError = await new LogError().getLogError(req.params._id as unknown as TypeId)

      if (!logError) {
        throw new ErrorRes(500, 'Error getting logError')
      }

      return res.status(200).json(logError)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new LogErrorGetController()
