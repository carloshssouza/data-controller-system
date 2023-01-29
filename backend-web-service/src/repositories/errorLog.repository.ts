import { ErrorLogCreateData, ErrorLogUpdateData } from '../interfaces/errorLog'
import { TypeId } from '../types/mongoose'
import Api from './schemas/Api'
import ErrorLog from './schemas/ErrorLog'

class ErrorLogRepository {
  public async createErrorLog (data: ErrorLogCreateData) {
    const apiData = await Api.findOne({ _id: data.routeId }).select('routeName endpointPath')

    return ErrorLog.create({
      ...data,
      routeName: apiData.routeName,
      endpointPath: apiData.endpointPath
    })
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
}

export default new ErrorLogRepository()
