import ErrorRes from '../../utils/Erro'
import ErrorLogEntity from '../../entities/errorLog/erroLog.entity'
import { Request, Response } from '../../types/express'
import { getDateFilter } from '../../utils/Date/DateUilts'
import { ErrorLogFilter } from '../../interfaces/errorLog'
import { TypeId } from '../../types/mongoose'

class ErrorLogGetAllController {
  public async getAllErrorLogs (req: Request, res: Response): Promise<Response> {
    try {
      const dateTime = req.query.dateTime as string

      if (dateTime && dateTime === 'all') {
        const ErrorLogs = await ErrorLogEntity.getAllErrorLogs()
        if (!ErrorLogs) {
          throw new ErrorRes(500, 'Error getting all log errors')
        }
        return res.status(200).json(ErrorLogs)
      }
      const { startDate, endDate } = getDateFilter(dateTime)
      const routeId = req.query.routeId as unknown as TypeId
      const routeName = req.query.routeName as string
      const level = req.query.level as string
      const levelSplitted = level ? level.split(',') : null

      const filter: ErrorLogFilter = {
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      }

      if (routeId) {
        filter.routeId = routeId
      }

      if (routeName) {
        filter.routeName = {
          $regex: `.*${routeName}.*`,
          $options: 'i'
        }
      }

      if (levelSplitted && Array.isArray(levelSplitted)) {
        filter.level = {
          $in: levelSplitted
        }
      }

      const ErrorLogs = await ErrorLogEntity.getAllErrorLogs(filter)
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
