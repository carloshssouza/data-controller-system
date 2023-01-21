import GrpcClient from '../GrpcService/grpc'
import Response from 'src/utils/response'
import Identifier, { IFindPrivateData } from '../IdentifierService'
import { IncomingMessage, ServerResponse } from '../../types/http'
import Auxiliary from './utils/auxiliary'
import privateDataList from '../IdentifierService/privateDataList'
import ErrorRes from '../../utils/error'

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
      const privateDataFound = await new Identifier().findPrivateData(body, privateDataList) as IFindPrivateData[]
      if (privateDataFound.length) {
        const errorLogData = await this.createErrorLogData(privateDataFound, apiResponse, req)

        const errorLogCreateResponse = await new GrpcClient().createErrorLog(errorLogData)
        await this.checkForError(errorLogCreateResponse, proxyRes, res)

        return new ErrorRes(proxyRes).errorProxyResponse(res, errorLogData)
      }
    }

    return new Response(proxyRes).responseServer(res, body)
  }
}
