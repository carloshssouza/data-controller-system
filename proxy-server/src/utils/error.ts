import { IncomingMessage, ServerResponse } from '../types/http'

export default class ErrorRes {
  private proxyRes: IncomingMessage

  constructor (proxyRes: IncomingMessage) {
    this.proxyRes = proxyRes
  }

  /**
   * Method responsible for generate internal server error with custom message
   * @param res Variable provided by the proxy lib in the method proxyOn(http response)
   * @param message Text message from error
   * @param stack Stack information about the error
   * @returns Returns response 500 with error details
   */
  public async internalServerError (res: ServerResponse, message: string, stack: any) {
    return this.proxyRes.on('end', function () {
      res.statusCode = 500
      res.end(JSON.stringify({
        error: {
          message: 'Proxy error:' + message,
          stack: JSON.stringify(stack)
        }
      }))
    })
  }

  public async proxyLeakedDataErrorResponse (res: ServerResponse, leakedData: any) {
    return this.proxyRes.on('end', function () {
      res.statusCode = 500
      res.end(JSON.stringify({
        ...leakedData
      }))
    })
  }
}
