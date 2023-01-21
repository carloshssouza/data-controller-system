import privateDataList from './privateDataList'

export default class Identifier {
  /**
   * Method to find personal data
   * @param responseObject
   * @returns Returns the list of personal data founded
   */
  public async findPersonalData (responseObject: object): Promise<string[]> {
    return await this.findGeneric(responseObject, privateDataList.personal)
  }

  /**
   * Method to find sensible data
   * @param responseObject
   * @returns Returns the list of sensible data founded
   */
  public async findSensibleData (responseObject: object): Promise<string[]> {
    return await this.findGeneric(responseObject, privateDataList.sensible)
  }

  /**
   * Method to iterate over the object, comparing the keys with the words of the array passed
   * @param object Object with response data from external server
   * @param array Array with the words to search
   * @returns Returns the search results with the words found
   */
  private async findGeneric (responseData: any, privateDataList: string[]) {
    if (Array.isArray(responseData)) {
      return [...new Set(responseData.flatMap((subResponseData) => this.findGeneric(subResponseData, privateDataList)))]
    } else {
      const dataFound = new Map<string, boolean>()
      for (const prop in responseData) {
        if (responseData.hasOwnProperty(prop)) {
          if (privateDataList.indexOf(prop) !== -1) {
            if (!dataFound.has(prop)) {
              dataFound.set(prop, true)
            }
          }
          if (typeof responseData[prop] === 'object') {
            for (const key of this.findGeneric(responseData[prop], privateDataList)) {
              if (!dataFound.has(key)) {
                dataFound.set(key, true)
              }
            }
          }
        }
      }
      return [...dataFound.keys()]
    }
  }
}
