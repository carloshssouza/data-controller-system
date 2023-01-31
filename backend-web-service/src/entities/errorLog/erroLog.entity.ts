import ErrorLogRepository from '../../repositories/errorLog.repository'
import { TypeId } from '../../types/mongoose'
import { ErrorLogCreateData, ErrorLogUpdateData } from '../../interfaces/errorLog'
import ErrorLogValidator from './errorLog.validator'
import ErrorRes from '../../utils/Erro'

class ErrorLogEntity {
  public async createErrorLog (data: ErrorLogCreateData) {
    const validate = await ErrorLogValidator.createErrorLogValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return ErrorLogRepository.createErrorLog(data)
  }

  public getErrorLog (_id: TypeId) {
    const validate = ErrorLogValidator.getErrorLogValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return ErrorLogRepository.getErrorLog(_id)
  }

  public getAllErrorLogs () {
    return ErrorLogRepository.getAllErrorLogs()
  }

  public async updateErrorLog (_id: TypeId, data: ErrorLogUpdateData) {
    const validate = await ErrorLogValidator.updateErrorLogValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    return ErrorLogRepository.updateErrorLog(_id, data)
  }

  public deleteErrorLog (_id: TypeId) {
    const validate = ErrorLogValidator.deleteErrorLogValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return ErrorLogRepository.deleteErrorLog(_id)
  }

  public getErrorLogLeakedData (filter?: string) {
    if (!filter) {
      return ErrorLogRepository.getErrorLogLeakedData()
    }
    // const validate
    // if(validate.error) {
    //   throw new ErrorRes(400, validate.error.message)
    // }
    return ErrorLogRepository.getErrorLogLeakedData(filter)
  }

  public getErrorLogDynamicFilter (filter?: Object) {
    return ErrorLogRepository.getErrorLogDynamicFilter(filter)
  }
}

export default new ErrorLogEntity()
