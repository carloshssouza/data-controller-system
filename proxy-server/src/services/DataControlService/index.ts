import GrpcClient from '../GrpcService/grpc'
import Identifier from '../IdentifierService'
import { IncomingMessage } from '../../types/http'
import Auxiliary from './utils/auxiliary'
import { ILeakedData } from '../../interfaces/errorLogData.interface'
import { IRestrictDataList } from 'src/interfaces/configuration.interface'
class DataControlService extends Auxiliary {
  /**
   * Method responsible for run all the functions to control the data response from external server
   * @param req Variable provided by the proxy in the method proxyOn(http request)
   * @param body Response object from the external server intercepted by the proxy
   * @returns Returns the response to the client request
   */
  public async runController (req: IncomingMessage, body: any) {
    const apiResponse = await GrpcClient.getApiPermission(req.url, req.method)

    const grpcApiService = await this.checkForError(apiResponse, true)

    if (grpcApiService.error) {
      return grpcApiService.data
    }

    if (apiResponse && !apiResponse.dataReturnAllowed) {
      const restrictDataList = await GrpcClient.getRestrictDataList() as IRestrictDataList
      const privateDataFound = await Identifier.findPrivateData(body, restrictDataList) as ILeakedData[]
      if (privateDataFound.length) {
        const errorLogData = await this.createErrorLogData(privateDataFound, apiResponse)

        const errorLogCreateResponse = await GrpcClient.createErrorLog(errorLogData)
        const grpcErrorLogService = await this.checkForError(errorLogCreateResponse, false)
        if (grpcErrorLogService.error) {
          return grpcErrorLogService.data
        }
        return errorLogCreateResponse
      }
    }

    return body
  }
}

export default new DataControlService()
