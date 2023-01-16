import { ApiCreateData, ApiUpdateData } from '../../interfaces/api'
import { TypeId } from '../../types/mongoose'
import ApiSchemaValidator from '../validators/api/api.validator'

export default class ApiValidator {
  async createApiValidation (ApiData: ApiCreateData) {
    return new ApiSchemaValidator().createApiValidation(ApiData)
  }

  async updateApiValidation (ApiData: ApiUpdateData) {
    return new ApiSchemaValidator().updateApiValidation(ApiData)
  }

  getApiValidation (_id: TypeId) {
    return new ApiSchemaValidator().getApiValidation(_id)
  }

  deleteApiValidation (_id: TypeId) {
    return new ApiSchemaValidator().deleteApiValidation(_id)
  }

  getApiPermissionValidation (route: string) {
    return new ApiSchemaValidator().getApiPermissionValidation(route)
  }
}
