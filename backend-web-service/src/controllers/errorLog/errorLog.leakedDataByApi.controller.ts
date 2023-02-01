import ErrorRes from '../../utils/Erro'
import ErrorLogEntity from '../../entities/errorLog/erroLog.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class ErrorLogLeakedDataByApiController {
  public async getErrorLogLeakedDataByApi (req: Request, res: Response): Promise<Response> {
    try {
      const ErrorLogByApi = await ErrorLogEntity.getErrorLogLeakedDataByApi(req.params._id as unknown as TypeId)

      if (!ErrorLogByApi) {
        throw new ErrorRes(500, 'Error getting ErrorLog by Api')
      }

      return res.status(200).json(ErrorLogByApi)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ErrorLogLeakedDataByApiController()
