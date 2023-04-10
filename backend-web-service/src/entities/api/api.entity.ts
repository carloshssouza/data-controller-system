import ApiRepository from '../../repositories/api.repository'
import { TypeId } from '../../types/mongoose'
import { ApiCreateData, ApiUpdateData } from '../../interfaces/api'
import ApiValidator from './api.validator'
import ErrorRes from '../../utils/Erro'

class ApiEntity {
  /**
   * Method to create a new api instance
   * @param data Object containing the data to create the new api instance
   * @returns Returns the new api instance
   */
  public async createApi (data: ApiCreateData) {
    const validate = await ApiValidator.createApiValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    const routeSplitted = data.endpointPath.split('/')
    routeSplitted.shift()
    data.endpointPathLength = routeSplitted.length

    if (!data.endpointPath.includes(':') || !data.endpointPath.includes('{')) {
      return ApiRepository.createApi(data)
    } else {
      const parameters = []
      for (const item of routeSplitted) {
        if (item.includes(':')) {
          parameters.push({
            name: item.split(':')[1],
            position: routeSplitted.indexOf(item)
          })
        } else if (item.includes('{')) {
          parameters.push({
            name: item.split('{')[1].split('}')[0],
            position: routeSplitted.indexOf(item)
          })
        }
      }

      data.routeParameters = parameters
    }

    return ApiRepository.createApi(data)
  }

  /**
   * Method to get a api info
   * @param _id Id of the api to get
   * @returns Returns the data about the api specified
   */
  public getApi (_id: TypeId) {
    const validate = ApiValidator.getApiValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return ApiRepository.getApi(_id)
  }

  /**
   * Method to get all api info
   * @returns Returns array of all api info
   */
  public getAllApis () {
    return ApiRepository.getAllApis()
  }

  /**
   * Method to update api info
   * @param _id Id of the api to update
   * @param data Object containing data to update api info
   * @returns Returns api instance updated
   */
  public async updateApi (_id: TypeId, data: ApiUpdateData) {
    const validate = await ApiValidator.updateApiValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    if (data.endpointPath && (!data.endpointPath.includes(':') || !data.endpointPath.includes('{'))) {
      return ApiRepository.updateApi(_id, data)
    } else {
      const routeSplitted = data.endpointPath.split('/')
      routeSplitted.shift()
      const parameters = []
      for (const item of routeSplitted) {
        if (item.includes(':')) {
          parameters.push({
            name: item.split(':')[1],
            position: routeSplitted.indexOf(item)
          })
        } else if (item.includes('{')) {
          parameters.push({
            name: item.split('{')[1].split('}')[0],
            position: routeSplitted.indexOf(item)
          })
        }
      }

      data.routeParameters = parameters
      return ApiRepository.updateApi(_id, data)
    }
  }

  /**
   * Method to delete api info
   * @param _id Id of the api to delete
   * @returns Return boolean indicating the successfully or error
   */
  public deleteApi (_id: TypeId) {
    const validate = ApiValidator.deleteApiValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return ApiRepository.deleteApi(_id)
  }

  /**
   * Method to get a permission from the api info
   * @param route Route name of the api
   * @returns Return object with _id and dataReturnAllowed
   */
  public async getApiPermission (endpointPath: string, requestType: string) {
    const validate = ApiValidator.getApiPermissionValidation(endpointPath, requestType)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return ApiRepository.getApiPermission(endpointPath, requestType)
  }
}

export default new ApiEntity()
