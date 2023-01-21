import { ServerResponse, IncomingMessage } from '../types/http'
export default class Response {
  private proxyRes: IncomingMessage

  constructor (proxyRes: IncomingMessage) {
    this.proxyRes = proxyRes
    this.proxyRes.statusCode = proxyRes.statusCode
  }

  public responseServer (res: ServerResponse, body: any) {
    return this.proxyRes.on('end', function () {
      body = Buffer.concat(body).toString()
      res.end(body)
    })
  }
}
