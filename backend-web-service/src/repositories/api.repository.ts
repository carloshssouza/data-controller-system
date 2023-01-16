import { ApiCreateData, ApiUpdateData } from '../interfaces/api'
import { TypeId } from '../types/mongoose'
import Api from './schemas/Api'

export default class ApiRepository {
  public createApi (data: ApiCreateData) {
    return Api.create(data)
  }

  public getApi (_id: TypeId) {
    return Api.findOne({ _id })
  }

  public getAllApis () {
    return Api.find({})
  }

  public updateApi (_id: TypeId, data: ApiUpdateData) {
    return Api.findOneAndUpdate({ _id }, data)
  }

  public deleteApi (_id: TypeId) {
    return Api.findOneAndDelete({ _id })
  }

  public getApiPermission (route: string) {
    return Api.findOne({ route }).select('dataReturnAllowed')
  }
}
