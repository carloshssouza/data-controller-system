import ErrorRes from 'src/utils/error'
import GrpcClient from '../GrpcService/grpc'
import Response from 'src/utils/response'
import Identifier, { IFindPrivateData } from '../IdentifierService'
import { IncomingMessage, ServerResponse } from '../../types/http'
import Auxiliary from './utils/auxiliary'

export default class ControlDataService extends Auxiliary {
  public async runController (proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse, body: any) {
    const apiResponse = await new GrpcClient().getApiPermission(req.url, req.method)
    if (apiResponse && apiResponse.constructor().toString() === 'Error') {
      return new ErrorRes(proxyRes).errorResponse(res, apiResponse.message, apiResponse.stack)
    }

    if (apiResponse.dataReturnAllowed) {
      return new Response(proxyRes).responseServer(res, body)
    } else {
      const privateDataFound: IFindPrivateData[] = await new Identifier().findPrivateData(res)
      if (privateDataFound.length) {
        const result = await this.createLogErroData(privateDataFound, apiResponse, req)

        const logErrorCreate = await new GrpcClient().createLogError(result)
        if (logErrorCreate && logErrorCreate.constructor().toString() === 'Error') {
          return new ErrorRes(proxyRes).errorResponse(res, logErrorCreate.message, logErrorCreate.stack)
        }

        proxyRes.on('end', function () {
          res.statusCode = proxyRes.statusCode
          body = Buffer.concat(body).toString()
          res.end(body)
        })
      }
    }
  }
}
