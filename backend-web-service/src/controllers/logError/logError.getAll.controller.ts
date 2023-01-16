import ErrorRes from '../../utils/Erro'
import LogError from '../../entities/logError/logError.entity'
import { Request, Response } from '../../types/express'

class LogErrorGetAllController {
  public async getAllLogErrors (req: Request, res: Response): Promise<Response> {
    try {
      const logErrors = await new LogError().getAllLogErrors()
      if (!logErrors) {
        throw new ErrorRes(500, 'Error getting all log errors')
      }

      return res.status(200).json(logErrors)
    } catch (error) {
      console.log(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new LogErrorGetAllController()
