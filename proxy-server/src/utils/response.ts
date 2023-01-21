
export default class Response {
  private proxyRes: any

  constructor (proxyRes: any) {
    this.proxyRes = proxyRes
    this.proxyRes.statusCode = proxyRes.statusCode
  }

  public responseServer (res: any, body: any) {
    return this.proxyRes.on('end', function () {
      body = Buffer.concat(body).toString()
      res.end(body)
    })
  }
}
