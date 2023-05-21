import { ApiCreateData, ApiUpdateData } from '../interfaces/api'
import { TypeId } from '../types/mongoose'
import Api from './schemas/Api'
import ErrorLog from './schemas/ErrorLog'

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
   * Method to get all apis in the database returning the amount of errors
   * @returns Returns the api instance object
   */
  public async getAllApis () {
    const apis = await Api.find({})
    const routeIds = apis.map((api: any) => api._id)

    const errors = await ErrorLog.find({ routeId: { $in: routeIds } })

    const apisWithAmountErrors = apis.map((api: any) => {
      const errorsFiltered = errors.filter((error: any) => error.routeId.toString() === api._id.toString())
      return {
        ...api._doc,
        amountErrors: errorsFiltered.length
      }
    })

    return apisWithAmountErrors
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
    const endpointPathSplitted = endpointPath.split('/')
    endpointPathSplitted.shift()
    const firstItem = endpointPathSplitted[0]
    const endpointPathLength = endpointPathSplitted.length

    if (endpointPathLength === 1) {
      const api = await Api.find({
        endpointPath,
        requestType
      }).select('requestType endpointPath endpointPathLength dataReturnAllowed')

      if (api.length === 0) {
        return {
          _id: null,
          endpointPath: null,
          requestType: null,
          endpointPathLength: null
        }
      }
      return api[0]
    }

    const apisFirst = await Api.find({
      endpointPathLength,
      requestType
    })

    // eslint-disable-next-line array-callback-return
    const apis = apisFirst.filter((element: any) => {
      const elementSplitted = element.endpointPath.split('/')
      elementSplitted.shift()
      if (elementSplitted[0] === firstItem) {
        return element
      }
    })

    const api = this.getApiObject(endpointPath, apis)
    if (!api._id) {
      delete api.createdAt
      delete api.updatedAt
      delete api.routeName
    }
    return api
  }

  private getApiObject (request: any, apis: any) {
    const requestArr = request.split('/')
    for (let i = 0; i < apis.length; i++) {
      const endpointArr = apis[i].endpointPath.split('/')
      let match = true
      for (let j = 0; j < endpointArr.length; j++) {
        if (endpointArr[j].startsWith(':') || endpointArr[j].startsWith('{')) {
          continue
        }
        if (endpointArr[j] !== requestArr[j]) {
          match = false
          break
        }
      }
      if (match) {
        return apis[i]
      }
    }
    return {
      _id: null,
      endpointPath: null,
      requestType: null,
      endpointPathLength: null
    }
  }
}

export default new ApiRepository()
