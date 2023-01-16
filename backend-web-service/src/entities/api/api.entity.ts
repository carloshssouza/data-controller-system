import ApiRepository from '../../repositories/api.repository'
import { TypeId } from '../../types/mongoose'
import { ApiCreateData, ApiUpdateData } from '../../interfaces/api'
import ApiValidator from './api.validator'
import ErrorRes from '../../utils/Erro'

export default class ApiEntity {
  public async createApi (data: ApiCreateData) {
    const validate = await new ApiValidator().createApiValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ApiRepository().createApi(data)
  }

  public getApi (_id: TypeId) {
    const validate = new ApiValidator().getApiValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ApiRepository().getApi(_id)
  }

  public getAllApis () {
    return new ApiRepository().getAllApis()
  }

  public async updateApi (_id: TypeId, data: ApiUpdateData) {
    const validate = await new ApiValidator().updateApiValidation(data)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }

    return new ApiRepository().updateApi(_id, data)
  }

  public deleteApi (_id: TypeId) {
    const validate = new ApiValidator().deleteApiValidation(_id)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ApiRepository().deleteApi(_id)
  }

  public getApiPermission (route: string) {
    const validate = new ApiValidator().getApiPermissionValidation(route)
    if (validate.error) {
      throw new ErrorRes(400, validate.error.message)
    }
    return new ApiRepository().getApiPermission(route)
  }
}
