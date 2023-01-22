import GrpcClient from '../GrpcService/grpc'
import Response from '../../utils/response'
import Identifier from '../IdentifierService'
import { IncomingMessage, ServerResponse } from '../../types/http'
import Auxiliary from './utils/auxiliary'
import privateDataList from '../IdentifierService/privateDataList'
import ErrorRes from '../../utils/error'
import { ILeakedData } from '../../interfaces/errorLogData.interface'

export default class DataControlService extends Auxiliary {
  /**
   * Method responsible for run all the functions to control the data response from external server
   * @param proxyRes Variable provided by the proxy lib
   * @param req Variable provided by the proxy in the method proxyOn(http request)
   * @param res Variable provided by the proxy in method proxyOn(http response)
   * @param body Response object from the external server intercepted by the proxy
   * @returns Returns the response to the client request
   */
  public async runController (proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse, body: any) {
    const apiResponse = await new GrpcClient().getApiPermission(req.url, req.method)
    await this.checkForError(apiResponse, proxyRes, res)

    if (!apiResponse.dataReturnAllowed) {
      const privateDataFound = await new Identifier().findPrivateData(body, privateDataList) as ILeakedData[]
      if (privateDataFound.length) {
        const errorLogData = await this.createErrorLogData(privateDataFound, apiResponse)

        const errorLogCreateResponse = await new GrpcClient().createErrorLog(errorLogData)
        await this.checkForError(errorLogCreateResponse, proxyRes, res)

        return await new ErrorRes(proxyRes).proxyLeakedDataErrorResponse(res, errorLogData)
      }
    }

    return await new Response(proxyRes).responseServer(res, body)
  }
}
