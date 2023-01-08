import LogErrorRepository from '../../repositories/logError.repository'
import { TypeId } from '../../types/mongoose'
import { LogErrorCreateData, LogErrorUpdateData } from '../../interfaces/logError'
import LogErrorValidator from './logError.validator'
import ErrorRes from '../../utils/Erro'

export default class LogErrorEntity {
  public async createLogError (data: LogErrorCreateData) {
    const validate = await new LogErrorValidator().createLogErrorValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new LogErrorRepository().createLogError(data)
  }

  public getLogError (_id: TypeId) {
    const validate = new LogErrorValidator().getLogErrorValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new LogErrorRepository().getLogError(_id)
  }

  public getAllLogErrors () {
    return new LogErrorRepository().getAllLogErrors()
  }

  public async updateLogError (_id: TypeId, data: LogErrorUpdateData) {
    const validate = await new LogErrorValidator().updateLogErrorValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    return new LogErrorRepository().updateLogError(_id, data)
  }

  public deleteLogError (_id: TypeId) {
    const validate = new LogErrorValidator().deleteLogErrorValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new LogErrorRepository().deleteLogError(_id)
  }
}
