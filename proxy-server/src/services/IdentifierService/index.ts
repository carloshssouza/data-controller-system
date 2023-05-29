import JwtService from '../../utils/jwt'
import { IPrivateDataList } from './privateDataList'

class Identifier {
  /**
   * Method to find personal and sensitive data inside the external server response
   * @param responseObject Object from the external server
   * @param privateDataList Array of the private data(personal and sensitive)
   * @returns Returns the list of personal and sensitive data
   */
  public async findPrivateData (responseObject: any, privateDataList: IPrivateDataList) {
    const result = new Set()
    if (Array.isArray(responseObject)) {
      for (const item of responseObject) {
        const children = this.findPrivateData(item, privateDataList)
        for (const child of await children) {
          result.add(JSON.stringify(child))
        }
      }
    } else {
      for (const key in responseObject) {
        for (const type in privateDataList) {
          if (privateDataList[type].includes(key)) {
            result.add(JSON.stringify({ name: key, type }))
          }
        }
        if (typeof responseObject[key] === 'object') {
          const children = this.findPrivateData(responseObject[key], privateDataList)
          for (const child of await children) {
            result.add(JSON.stringify(child))
          }
        }
      }
    }
    return Array.from(result).map(element => JSON.parse(element as string))
  }

  private async checkPrivateDataInJwtToken (authorization: string) {
    const token = JwtService.decode(authorization) as Object
    return {
      ...token
    }
  }
}

export default new Identifier()
