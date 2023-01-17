import ApiRepository from '../../repositories/api.repository'
import { TypeId } from '../../types/mongoose'
import { ApiCreateData, ApiUpdateData } from '../../interfaces/api'
import ApiValidator from './api.validator'
import ErrorRes from '../../utils/Erro'

export default class ApiEntity {
  /**
   * Method to create a new api instance
   * @param data Object containing the data to create the new api instance
   * @returns Returns the new api instance
   */
  public async createApi (data: ApiCreateData) {
    const validate = await new ApiValidator().createApiValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ApiRepository().createApi(data)
  }

  /**
   * Method to get a api info
   * @param _id Id of the api to get
   * @returns Returns the data about the api specified
   */
  public getApi (_id: TypeId) {
    const validate = new ApiValidator().getApiValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ApiRepository().getApi(_id)
  }

  /**
   * Method to get all api info
   * @returns Returns array of all api info
   */
  public getAllApis () {
    return new ApiRepository().getAllApis()
  }

  /**
   * Method to update api info
   * @param _id Id of the api to update
   * @param data Object containing data to update api info
   * @returns Returns api instance updated
   */
  public async updateApi (_id: TypeId, data: ApiUpdateData) {
    const validate = await new ApiValidator().updateApiValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    return new ApiRepository().updateApi(_id, data)
  }

  /**
   * Method to delete api info
   * @param _id Id of the api to delete
   * @returns Return boolean indicating the successfully or error
   */
  public deleteApi (_id: TypeId) {
    const validate = new ApiValidator().deleteApiValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ApiRepository().deleteApi(_id)
  }

  /**
   * Method to get a permission from the api info
   * @param route Route name of the api
   * @returns Return boolean
   */
  public getApiPermission (route: string) {
    const validate = new ApiValidator().getApiPermissionValidation(route)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ApiRepository().getApiPermission(route)
  }
}
