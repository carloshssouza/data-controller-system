import { ServerResponse, IncomingMessage } from '../types/http'
class Response {
  public async responseServer (proxyRes: IncomingMessage, res: ServerResponse, body: any) {
    return proxyRes.on('end', function () {
      body = Buffer.concat(body).toString()
      res.end(body)
    })
  }
}

export default new Response()
