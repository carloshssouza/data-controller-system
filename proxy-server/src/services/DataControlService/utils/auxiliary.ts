import { IFindPrivateData } from '../../IdentifierService'
import { IncomingMessage, ServerResponse } from '../../../types/http'
import ErrorRes from 'src/utils/error'

export default abstract class Auxiliary {
  /**
   * Method responsible for create a log error object with your properties
   * @param privateDataFound Array with the data leaked by the external server
   * @param apiResponse Response object from gRPC about api info
   * @param req Variable provided by the proxy lib in the method proxyOn(http request)
   * @returns Returns object with error log data
   */
  protected async createErrorLogData (privateDataFound: IFindPrivateData[], apiResponse: any, req: IncomingMessage) {
    return {
      title: 'Leaking data',
      description: await this.getDescriptionErrorLog(privateDataFound),
      routeId: apiResponse._id,
      endpointPath: req.url,
      routeName: apiResponse.routeName,
      leakData: privateDataFound,
      level: await this.getErrorLogLevel(privateDataFound.length)
    }
  }

  private async getDescriptionErrorLog (privateDataFound: IFindPrivateData[]) {
    const dataTypes = privateDataFound.map((element: IFindPrivateData) => element.type)
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
      return new ErrorRes(proxyRes).errorInternalServer(res, responseFromGrpc.message, responseFromGrpc.stack)
    }
  }
}
