import { LogErrorCreateData, LogErrorUpdateData } from '../interfaces/logError'
import { TypeId } from '../types/mongoose'
import LogError from './schemas/LogError'

export default class LogErrorRepository {
  public createLogError (data: LogErrorCreateData) {
    return LogError.create(data)
  }

  public getLogError (_id: TypeId) {
    return LogError.findOne({ _id })
  }

  public getAllLogErrors () {
    return LogError.find({})
  }

  public updateLogError (_id: TypeId, data: LogErrorUpdateData) {
    return LogError.findOneAndUpdate({ _id }, data)
  }

  public deleteLogError (_id: TypeId) {
    return LogError.findOneAndDelete({ _id })
  }
}
