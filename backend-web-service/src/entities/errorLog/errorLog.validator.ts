import { ErrorLogCreateData, ErrorLogFilter, ErrorLogUpdateData } from '../../interfaces/errorLog'
import { TypeId } from '../../types/mongoose'
import ErrorLogSchemaValidator from '../validators/erroLog/errorLog.validator'

class ErrorLogValidator {
  async createErrorLogValidation (ErrorLogData: ErrorLogCreateData) {
    return ErrorLogSchemaValidator.createErrorLogValidation(ErrorLogData)
  }

  async updateErrorLogValidation (ErrorLogData: ErrorLogUpdateData) {
    return ErrorLogSchemaValidator.updateErrorLogValidation(ErrorLogData)
  }

  getErrorLogValidation (_id: TypeId) {
    return ErrorLogSchemaValidator.getErrorLogValidation(_id)
  }

  deleteErrorLogValidation (_id: TypeId) {
    return ErrorLogSchemaValidator.deleteErrorLogValidation(_id)
  }

  getAllErrorLogValidation (filter: ErrorLogFilter) {
    return ErrorLogSchemaValidator.getAllErrorLogValidation(filter)
  }
}

export default new ErrorLogValidator()
