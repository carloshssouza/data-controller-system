import { ErrorLogCreateData, ErrorLogUpdateData } from '../../interfaces/errorLog'
import { TypeId } from '../../types/mongoose'
import ErrorLogSchemaValidator from '../validators/erroLog/errorLog.validator'

export default class ErrorLogValidator {
  async createErrorLogValidation (ErrorLogData: ErrorLogCreateData) {
    return new ErrorLogSchemaValidator().createErrorLogValidation(ErrorLogData)
  }

  async updateErrorLogValidation (ErrorLogData: ErrorLogUpdateData) {
    return new ErrorLogSchemaValidator().updateErrorLogValidation(ErrorLogData)
  }

  getErrorLogValidation (_id: TypeId) {
    return new ErrorLogSchemaValidator().getErrorLogValidation(_id)
  }

  deleteErrorLogValidation (_id: TypeId) {
    return new ErrorLogSchemaValidator().deleteErrorLogValidation(_id)
  }
}
