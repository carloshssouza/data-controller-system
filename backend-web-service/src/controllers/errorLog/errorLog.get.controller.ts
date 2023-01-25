import ErrorRes from '../../utils/Erro'
import ErrorLogEntity from '../../entities/errorLog/erroLog.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class ErrorLogGetController {
  public async getErrorLog (req: Request, res: Response): Promise<Response> {
    try {
      const ErrorLog = await ErrorLogEntity.getErrorLog(req.params._id as unknown as TypeId)

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

export default new ErrorLogGetController()
