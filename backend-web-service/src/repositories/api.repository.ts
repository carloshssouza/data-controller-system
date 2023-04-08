import { ApiCreateData, ApiUpdateData } from '../interfaces/api'
import { TypeId } from '../types/mongoose'
import Api from './schemas/Api'

class ApiRepository {
  /**
   * Method to insert a new api in the database
   * @param data Object containing data about api
   * @returns Returns the api instance object
   */
  public createApi (data: ApiCreateData) {
    return Api.create(data)
  }

  /**
   * Method to get an api in the database
   * @param _id Id of the api to get
   * @returns Returns the api instance object
   */
  public getApi (_id: TypeId) {
    return Api.findOne({ _id })
  }

  /**
   * Method to get all apis in the database
   * @returns Returns the api instance object
   */
  public getAllApis () {
    return Api.find({})
  }

  /**
   * Method to get an api in the database
   * @param _id Id of the api to update
   * @returns Returns the api instance object
   */
  public updateApi (_id: TypeId, data: ApiUpdateData) {
    return Api.findOneAndUpdate({ _id }, data)
  }

  /**
   * Method to delete an api in the database
   * @param _id Id of the api to delete
   * @returns Returns the api instance object
   */
  public deleteApi (_id: TypeId) {
    return Api.findOneAndDelete({ _id })
  }

  /**
   * Method to get permission about an api in the database
   * @param _id Id of the api to get permission
   * @returns Returns the api data
   */
  public async getApiPermission (endpointPath: string, requestType: string) {
    let apiResponse = {
      _id: null,
      dataReturnAllowed: null
    } as any
    const api = await Api.findOne({ endpointPath, requestType }).select('_id dataReturnAllowed')

    if (api) {
      apiResponse = {
        _id: api._id,
        dataReturnAllowed: api.dataReturnAllowed
      }
    }
    return apiResponse
  }
}

export default new ApiRepository()
