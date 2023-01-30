import ErrorRes from '../../utils/Erro'
import ErrorLogEntity from '../../entities/errorLog/erroLog.entity'
import { Request, Response } from '../../types/express'
import { IFilterLeakedData } from '../../interfaces/errorLog'

class ErrorLogLeakedDataByApiController {
  public async getErrorLogLeakedDataByApi (req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.query)
      const { sensible, personal } = req.query

      return res.status(200).json()
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}
export default new ErrorLogLeakedDataByApiController()
