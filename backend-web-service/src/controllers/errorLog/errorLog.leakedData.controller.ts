import ErrorRes from '../../utils/Erro'
import ErrorLogEntity from '../../entities/errorLog/erroLog.entity'
import { Request, Response } from '../../types/express'
import { IFilterLeakedData } from '../../interfaces/errorLog'

class ErrorLogLeakedDataController {
  constructor () {
    this.getErrorLogLeakedData = this.getErrorLogLeakedData.bind(this)
  }

  public async getErrorLogLeakedData (req: Request, res: Response): Promise<Response> {
    try {
      const { sensitive, personal } = req.query

      if (!sensitive && !personal) {
        const errorLog = await this.getLeakedData()
        return res.status(200).json(errorLog)
      }

      const filter = {} as IFilterLeakedData

      if (personal && !sensitive) {
        filter.personal = 'personal'
      } else if (!personal && sensitive) {
        filter.sensitive = 'sensitive'
      }

      const errorLog = await this.getLeakedData(filter.personal ?? filter.sensitive)

      return res.status(200).json(errorLog)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }

  private async getLeakedData (filter?: string) {
    const errorLog = await ErrorLogEntity.getErrorLogLeakedData(filter)
    if (!errorLog) {
      throw new ErrorRes(500, 'Error getting ErrorLog')
    }

    return errorLog
  }
}
export default new ErrorLogLeakedDataController()
