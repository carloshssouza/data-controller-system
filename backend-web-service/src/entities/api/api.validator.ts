import { ApiCreateData, ApiUpdateData } from '../../interfaces/api'
import { TypeId } from '../../types/mongoose'
import ApiSchemaValidator from '../validators/api/api.validator'

export default class ApiValidator {
  /**
   * Method to validate the create operation to create a new instance of the api
   * @param apiData Object containing the data to validate
   * @returns Returns the schema validation or error
   */
  async createApiValidation (apiData: ApiCreateData) {
    return new ApiSchemaValidator().createApiValidation(apiData)
  }

  /**
   * Method to validate the update operation to create a new instance of the api
   * @param apiData Object containing the data to validate
   * @returns Returns the schema validation or error
   */
  async updateApiValidation (apiData: ApiUpdateData) {
    return new ApiSchemaValidator().updateApiValidation(apiData)
  }

  /**
   * Method to validate the get operation about the specified api
   * @param _id Id of the api to validate
   * @returns Returns the schema validation or error
   */
  getApiValidation (_id: TypeId) {
    return new ApiSchemaValidator().getApiValidation(_id)
  }

  /**
   * Method to validate the delete operation about the specified api
   * @param _id Id of the api to validate
   * @returns Returns the schema validation or error
   */
  deleteApiValidation (_id: TypeId) {
    return new ApiSchemaValidator().deleteApiValidation(_id)
  }

  /**
   * Method to validate the get permission operation about the specified api
   * @param route Route name of the api to validate
   * @returns Returns the schema validation or error
   */
  getApiPermissionValidation (endpointPath: string, requestType: string) {
    return new ApiSchemaValidator().getApiPermissionValidation(endpointPath, requestType)
  }
}
