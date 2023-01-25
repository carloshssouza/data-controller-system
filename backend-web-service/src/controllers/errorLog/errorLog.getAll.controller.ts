import ErrorRes from '../../utils/Erro'
import ErrorLogEntity from '../../entities/errorLog/erroLog.entity'
import { Request, Response } from '../../types/express'

class ErrorLogGetAllController {
  public async getAllErrorLogs (req: Request, res: Response): Promise<Response> {
    try {
      const ErrorLogs = await ErrorLogEntity.getAllErrorLogs()
      if (!ErrorLogs) {
        throw new ErrorRes(500, 'Error getting all log errors')
      }

      return res.status(200).json(ErrorLogs)
    } catch (error) {
      console.log(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ErrorLogGetAllController()
