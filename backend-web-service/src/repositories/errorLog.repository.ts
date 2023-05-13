import { ErrorLogCreateData, ErrorLogUpdateData } from '../interfaces/errorLog'
import { TypeId } from '../types/mongoose'
import Api from './schemas/Api'
import ErrorLog from './schemas/ErrorLog'

class ErrorLogRepository {
  public async createErrorLog (data: ErrorLogCreateData) {
    const apiData = await Api.findOne({ _id: data.routeId }).select('routeName endpointPath requestType')
    const errorLog = await ErrorLog.create({
      ...data,
      routeName: apiData.routeName,
      endpointPath: apiData.endpointPath,
      requestType: apiData.requestType
    })

    delete errorLog.routeId

    return errorLog
  }

  public getErrorLog (_id: TypeId) {
    return ErrorLog.findOne({ _id })
  }

  public async getAllErrorLogs (filter: any) {
    const errors = await ErrorLog.find(filter).sort({ createdAt: 1 })
    return errors
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

  public async getExtraInfosErrorLogs () {
    const errors = await ErrorLog.find({})
    if (!errors.length) {
      return {
        total: 0,
        mostLeakedRouteName: '-',
        mostLeakedDataName: '-',
        amountPerLevel: {
          low: 0,
          medium: 0,
          high: 0
        }
      }
    }

    // Find the most leaked data
    const mostLeakedData = errors.reduce((acc: any, obj: any) => {
      obj.leakedData.forEach((leaked: any) => {
        if (acc[leaked.name]) {
          acc[leaked.name].count += 1
          acc[leaked.name].lastObj = obj
        } else {
          acc[leaked.name] = { count: 1, lastObj: obj }
        }
      })
      return acc
    }, {})

    const sortedLeakedData = Object.entries(mostLeakedData).sort(
      (a: any, b: any) => b[1].count as any - a[1].count || errors.indexOf(b[1].lastObj) - errors.indexOf(a[1].lastObj)
    )
    const mostLeakedDataName = sortedLeakedData[0][0]

    // Find the most leaked route
    const mostLeakedRoute = errors.reduce((acc: any, obj) => {
      if (acc[obj.routeName]) {
        acc[obj.routeName].count += 1
        acc[obj.routeName].lastObj = obj
      } else {
        acc[obj.routeName] = { count: 1, lastObj: obj }
      }
      return acc
    }, {})

    const sortedLeakedRoutes = Object.entries(mostLeakedRoute).sort(
      (a: any, b: any) => b[1].count - a[1].count || errors.indexOf(b[1].lastObj) - errors.indexOf(a[1].lastObj)
    )
    const mostLeakedRouteName = sortedLeakedRoutes[0][0]

    // Count the amount per level
    const amountPerLevel = errors.reduce((acc: any, obj) => {
      if (acc[obj.level]) {
        acc[obj.level] += 1
      } else {
        acc[obj.level] = 1
      }
      return acc
    }, {})

    const response = {
      total: errors.length,
      mostLeakedDataName,
      mostLeakedRouteName,
      amountPerLevel
    }

    return response
  }
}

export default new ErrorLogRepository()
