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
      console.log(req.query)
      const { sensible, personal } = req.query

      if (!sensible && !personal) {
        console.log('entrou')
        const errorLog = await this.getLeakedData()
        return res.status(200).json(errorLog)
      }

      const filter = {} as IFilterLeakedData

      if (personal && !sensible) {
        filter.personal = 'personal'
      } else if (!personal && sensible) {
        filter.sensible = 'sensible'
      }

      const errorLog = await this.getLeakedData(filter.personal ?? filter.sensible)

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
