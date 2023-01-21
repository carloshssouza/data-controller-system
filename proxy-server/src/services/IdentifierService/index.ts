import privateDataList from './privateDataList'

export interface IFindPrivateData {
  name: string
  type: string
}

export default class Identifier {
  /**
   * Method to find personal data
   * @param responseObject
   * @returns Returns the list of personal and sensible data
   */
  public async findPrivateData (responseObject: object): Promise<IFindPrivateData[]> {
    const personalDataFound = await this.findGeneric(responseObject, privateDataList.personal, 'personal')
    const sensibleDataFound = await this.findGeneric(responseObject, privateDataList.sensible, 'sensible')
    const unionDataFound = personalDataFound.resultDataFound.concat(sensibleDataFound.resultDataFound)
    return unionDataFound
  }

  /**
   * Method to iterate over the object, comparing the keys with the words of the array passed
   * @param responseData Object with response data from external server
   * @param privateDataList Array with the words to search
   * @returns Returns a object with result array and the responseData object with deleted keys
   */
  private async findGeneric (responseData: any, privateDataList: string[], type?: string) {
    const resultDataFound = []
    if (Array.isArray(responseData)) {
      return [...new Set(responseData.flatMap((subResponseData) => this.findGeneric(subResponseData, privateDataList)))]
    } else {
      const dataFound = new Map<string, boolean>()
      for (const data in responseData) {
        if (responseData.hasOwnProperty(data)) {
          if (privateDataList.indexOf(data) !== -1) {
            if (!dataFound.has(data)) {
              dataFound.set(data, true)
              resultDataFound.push({ name: data, type })
              delete responseData[data]
            }
          }
          if (typeof responseData[data] === 'object') {
            for (const key of this.findGeneric(responseData[data], privateDataList)) {
              if (!dataFound.has(key)) {
                dataFound.set(key, true)
              }
            }
          }
        }
      }
      return {
        responseData,
        resultDataFound
      }
    }
  }
}
