import ErrorLogRepository from '../../repositories/errorLog.repository'
import { TypeId } from '../../types/mongoose'
import { ErrorLogCreateData, ErrorLogUpdateData } from '../../interfaces/errorLog'
import ErrorLogValidator from './errorLog.validator'
import ErrorRes from '../../utils/Erro'

export default class ErrorLogEntity {
  public async createErrorLog (data: ErrorLogCreateData) {
    const validate = await new ErrorLogValidator().createErrorLogValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ErrorLogRepository().createErrorLog(data)
  }

  public getErrorLog (_id: TypeId) {
    const validate = new ErrorLogValidator().getErrorLogValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ErrorLogRepository().getErrorLog(_id)
  }

  public getAllErrorLogs () {
    return new ErrorLogRepository().getAllErrorLogs()
  }

  public async updateErrorLog (_id: TypeId, data: ErrorLogUpdateData) {
    const validate = await new ErrorLogValidator().updateErrorLogValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    return new ErrorLogRepository().updateErrorLog(_id, data)
  }

  public deleteErrorLog (_id: TypeId) {
    const validate = new ErrorLogValidator().deleteErrorLogValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ErrorLogRepository().deleteErrorLog(_id)
  }
}
