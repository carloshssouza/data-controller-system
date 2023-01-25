import ErrorRes from '../../utils/Erro'
import ErrorLogEntity from '../../entities/errorLog/erroLog.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class ErrorLogUpdateController {
  public async updateErrorLog (req: Request, res: Response): Promise<Response> {
    try {
      const ErrorLog = await ErrorLogEntity.updateErrorLog(req.params._id as unknown as TypeId, req.body)

      if (!ErrorLog) {
        throw new ErrorRes(500, 'Error updating log error')
      }

      return res.status(200).json({ message: 'log error updated successfully' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ErrorLogUpdateController()
