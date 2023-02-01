import { ErrorLogCreateData, ErrorLogUpdateData } from '../interfaces/errorLog'
import { TypeId } from '../types/mongoose'
import Api from './schemas/Api'
import ErrorLog from './schemas/ErrorLog'

class ErrorLogRepository {
  public async createErrorLog (data: ErrorLogCreateData) {
    const apiData = await Api.findOne({ _id: data.routeId }).select('routeName endpointPath typeRequest')
    const errorLog = await ErrorLog.create({
      ...data,
      routeName: apiData.routeName,
      endpointPath: apiData.endpointPath,
      typeRequest: apiData.typeRequest
    })

    delete errorLog.routeId

    return errorLog
  }

  public getErrorLog (_id: TypeId) {
    return ErrorLog.findOne({ _id })
  }

  public getAllErrorLogs () {
    return ErrorLog.find({})
  }

  public updateErrorLog (_id: TypeId, data: ErrorLogUpdateData) {
    return ErrorLog.findOneAndUpdate({ _id }, data)
  }

  public deleteErrorLog (_id: TypeId) {
    return ErrorLog.findOneAndDelete({ _id })
  }

  public async getErrorLogLeakedData (filter?: string) {
    if (!filter) {
      return ErrorLog.aggregate([
        {
          $unwind: '$leakedData'
        },
        {
          $group: {
            _id: '$leakedData.name',
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            name: '$_id',
            count: 1
          }
        },
        {
          $sort: {
            count: -1
          }
        }
      ])
    }
    return ErrorLog.aggregate([
      {
        $unwind: '$leakedData'
      },
      {
        $match: {
          'leakedData.type': filter
        }
      },
      {
        $group: {
          _id: '$leakedData.name',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ])
  }

  public getErrorLogDynamicFilter (filter?: object) {
    return ErrorLog.find({})
  }

  public getErrorLogLeakedDataByApi (routeId: TypeId) {
    return ErrorLog.findOne({ routeId })
  }
}

export default new ErrorLogRepository()
