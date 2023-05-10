import ErrorRes from '../../utils/Erro'
import ErrorLogEntity from '../../entities/errorLog/erroLog.entity'
import { Request, Response } from '../../types/express'

class ErrorLogGetExtraInfosController {
  public async getExtraInfosErrorLogs (req: Request, res: Response): Promise<Response> {
    try {
      const ErrorLog = await ErrorLogEntity.getExtraInfosErrorLogs()

      if (!ErrorLog) {
        throw new ErrorRes(500, 'Error getting ErrorLog')
      }

      return res.status(200).json(ErrorLog)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ErrorLogGetExtraInfosController()
