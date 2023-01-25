import { ErrorLogCreateData, ErrorLogUpdateData } from '../interfaces/errorLog'
import { TypeId } from '../types/mongoose'
import ErrorLog from './schemas/ErrorLog'

class ErrorLogRepository {
  public createErrorLog (data: ErrorLogCreateData) {
    return ErrorLog.create(data)
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
