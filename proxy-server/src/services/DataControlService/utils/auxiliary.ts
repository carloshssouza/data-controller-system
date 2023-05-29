import { IErrorLogData, ILeakedData } from '../../../interfaces/errorLogData.interface'
import IApiData from '../../../interfaces/apiData.interface'

export default abstract class Auxiliary {
  /**
   * Method responsible for create a log error object with your properties
   * @param privateDataFound Array with the data leaked by the external server
   * @param apiResponse Response object from gRPC about api info
   * @returns Returns object with error log data
   */
  protected async createErrorLogData (privateDataFound: ILeakedData[], apiResponse: IApiData): Promise<IErrorLogData> {
    return {
      title: 'Leaking data',
      description: await this.getDescriptionErrorLog(privateDataFound),
      routeId: apiResponse._id,
      leakedData: privateDataFound,
      level: await this.getErrorLogLevel(privateDataFound.length)
    }
  }

  private async getDescriptionErrorLog (privateDataFound: ILeakedData[]) {
    const dataTypes = privateDataFound.map((element: ILeakedData) => element.type)
    let description = 'Your API is leaking '
    if (dataTypes.includes('personal') && !dataTypes.includes('sensitive')) {
      description += 'personal data'
    } else if (dataTypes.includes('personal') && dataTypes.includes('sensitive')) {
      description += 'personal and sensitive data'
    } else if (!dataTypes.includes('personal') && dataTypes.includes('sensitive')) {
      description += 'sensitive data'
    }

    return description
  }

  /**
   * Method responsible for get the error log level(low, medium or high)
   * @param privateDataFoundLength
   * @returns Returns the error log level(low, medium or high)
   */
  private async getErrorLogLevel (privateDataFoundLength: number) {
    if (privateDataFoundLength >= 1 && privateDataFoundLength <= 2) {
      return 'low'
    } else if (privateDataFoundLength >= 3 && privateDataFoundLength <= 4) {
      return 'medium'
    } else if (privateDataFoundLength >= 5) {
      return 'high'
    }
  }

  /**
   * Method responsible for check error from grpc response
   * @param responseFromGrpc Object from grpc server response
   * @returns Returns response with error object
   */
  protected async checkForError (responseFromGrpc: any, api: boolean) {
    if (responseFromGrpc && responseFromGrpc.constructor().toString() === 'Error') {
      const grpcError = {
        error: true,
        data: {
          message: 'Proxy error:' + responseFromGrpc.message,
          stack: JSON.stringify(responseFromGrpc.stack)
        }
      }
      return grpcError
    } else if (!responseFromGrpc._id && api) {
      const grpcError = {
        error: true,
        data: {
          message: 'Proxy error: API not found',
          stack: 'Api not found in the database, please add this API to be analyze.'
        }
      }
      return grpcError
    }
    return {
      error: false,
      data: {}
    }
  }
}
