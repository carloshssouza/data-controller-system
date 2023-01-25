import { IncomingMessage, ServerResponse } from '../../../types/http'
import ErrorRes from '../../../utils/error'
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
      endpointPath: apiResponse.endpointPath,
      routeName: apiResponse.routeName,
      leakedData: privateDataFound,
      level: await this.getErrorLogLevel(privateDataFound.length)
    }
  }

  private async getDescriptionErrorLog (privateDataFound: ILeakedData[]) {
    const dataTypes = privateDataFound.map((element: ILeakedData) => element.type)
    let description = 'Your API is leaking '
    if (dataTypes.includes('personal') && !dataTypes.includes('sensible')) {
      description += 'personal data'
    } else if (dataTypes.includes('personal') && dataTypes.includes('sensible')) {
      description += 'personal and sensible data'
    } else if (!dataTypes.includes('personal') && dataTypes.includes('sensible')) {
      description += 'sensible data'
    }

    return description
  }

  /**
   * Method responsible for get the error log level(low, medium or high)
   * @param privateDataFoundLength
   * @returns Returns the error log level(low, medium or high)
   */
  private async getErrorLogLevel (privateDataFoundLength: number) {
    if (privateDataFoundLength >= 1 || privateDataFoundLength <= 2) {
      return 'low'
    } else if (privateDataFoundLength >= 3 || privateDataFoundLength <= 4) {
      return 'medium'
    } else if (privateDataFoundLength >= 5) {
      return 'high'
    }
  }

  /**
   * Method responsible for check error from grpc response
   * @param responseFromGrpc Object from grpc server response
   * @param proxyRes Variable provided by the proxy lib
   * @param res Variable provided by the proxy lib in method proxyOn
   * @returns Returns response with error
   */
  protected async checkForError (responseFromGrpc: any, proxyRes: IncomingMessage, res: ServerResponse) {
    if (responseFromGrpc && responseFromGrpc.constructor().toString() === 'Error') {
      return ErrorRes.internalServerError(proxyRes, res, responseFromGrpc.message, responseFromGrpc.stack)
    }
  }
}
