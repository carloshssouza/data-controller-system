import JwtService from '../../utils/jwt'
import { IPrivateDataList } from './privateDataList'

class Identifier {
  /**
   * Method to find personal and sensible data inside the external server response
   * @param responseObject Object from the external server
   * @param privateDataList Array of the private data(personal and sensible)
   * @returns Returns the list of personal and sensible data
   */
  public findPrivateData (responseObject: any, privateDataList: IPrivateDataList) {
    let result = [] as any
    if (responseObject.hasOwnProperty('access_token') || responseObject.hasOwnProperty('token') || responseObject.hasOwnProperty('auth')) {
      const token = {}
      if (Array.isArray(responseObject)) {
        // token = this.checkPrivateDataInJwtToken()
        responseObject.push(token)
      } else {
        responseObject = {
          ...responseObject,
          ...token
        }
      }
    }

    if (Array.isArray(responseObject)) {
      for (const item of responseObject) {
        const children = this.findPrivateData(item, privateDataList)
        result = result.concat(children)
      }
    } else {
      for (const key in responseObject) {
        for (const type in privateDataList) {
          if (privateDataList[type].includes(key)) {
            result.push({ name: key, type })
          }
        }
        if (typeof responseObject[key] === 'object') {
          const children = this.findPrivateData(responseObject[key], privateDataList)
          result = result.concat(children)
        }
      }
    }
    return result
  }

  private async checkPrivateDataInJwtToken (authorization: string) {
    const token = JwtService.decode(authorization) as Object
    return {
      ...token
    }
  }
}

export default new Identifier()
