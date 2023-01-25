import ErrorRes from '../../utils/Erro'
import ErrorLogEntity from '../../entities/errorLog/erroLog.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class ErrorLogDeleteController {
  public async deleteErrorLog (req: Request, res: Response): Promise<Response> {
    try {
      const errorLog = await ErrorLogEntity.deleteErrorLog(req.params._id as unknown as TypeId)

      if (!errorLog) {
        throw new ErrorRes(500, 'Error deleting log error')
      }

      return res.status(200).json({ message: 'Log error deleted successfully' })
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ErrorLogDeleteController()
