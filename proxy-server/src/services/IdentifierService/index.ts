import { IPrivateDataList } from './privateDataList'

export interface IFindPrivateData {
  name: string
  type: string
}

export default class Identifier {
  /**
   * Method to find personal and sensible data inside the external server response
   * @param responseObject Object from the external server
   * @param privateDataList Array of the private data(personal and sensible)
   * @returns Returns the list of personal and sensible data
   */
  public findPrivateData (responseObject: any, privateDataList: IPrivateDataList) {
    let result = [] as any
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
}
