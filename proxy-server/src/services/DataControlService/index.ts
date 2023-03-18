import GrpcClient from '../GrpcService/grpc'
import Identifier from '../IdentifierService'
import { IncomingMessage } from '../../types/http'
import Auxiliary from './utils/auxiliary'
import { ILeakedData } from '../../interfaces/errorLogData.interface'
import fs from 'fs'
import path from 'path'
class DataControlService extends Auxiliary {
  /**
   * Method responsible for run all the functions to control the data response from external server
   * @param req Variable provided by the proxy in the method proxyOn(http request)
   * @param body Response object from the external server intercepted by the proxy
   * @returns Returns the response to the client request
   */
  public async runController (req: IncomingMessage, body: any) {
    const apiResponse = await GrpcClient.getApiPermission(req.url, req.method)

    const grpcApiService = await this.checkForError(apiResponse)
    if (grpcApiService.error) {
      return grpcApiService.data
    }

    if (apiResponse && !apiResponse.dataReturnAllowed) {
      const pathConfig = path.resolve(__dirname, '../../../../configs/proxy.config.json')
      const configuration = JSON.parse(fs.readFileSync(pathConfig, 'utf8')) as any
      const privateDataFound = await Identifier.findPrivateData(body, configuration.restrictDataList) as ILeakedData[]
      if (privateDataFound.length) {
        const errorLogData = await this.createErrorLogData(privateDataFound, apiResponse)

        const errorLogCreateResponse = await GrpcClient.createErrorLog(errorLogData)
        const grpcErrorLogService = await this.checkForError(errorLogCreateResponse)
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
