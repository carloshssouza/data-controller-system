import { LogErrorCreateData, LogErrorUpdateData } from '../../interfaces/logError'
import { TypeId } from '../../types/mongoose'
import LogErrorSchemaValidator from '../validators/logError/logError.validator'

export default class LogErrorValidator {
  async createLogErrorValidation (LogErrorData: LogErrorCreateData) {
    return new LogErrorSchemaValidator().createLogErrorValidation(LogErrorData)
  }

  async updateLogErrorValidation (LogErrorData: LogErrorUpdateData) {
    return new LogErrorSchemaValidator().updateLogErrorValidation(LogErrorData)
  }

  getLogErrorValidation (_id: TypeId) {
    return new LogErrorSchemaValidator().getLogErrorValidation(_id)
  }

  deleteLogErrorValidation (_id: TypeId) {
    return new LogErrorSchemaValidator().deleteLogErrorValidation(_id)
  }
}
