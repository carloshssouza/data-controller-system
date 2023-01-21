
export default class ErrorRes {
  private proxyRes: any

  constructor (proxyRes: any) {
    this.proxyRes = proxyRes
  }

  public errorInternalServer (res: any, message: string, stack: any) {
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

  public errorProxyResponse (res: any, dataLeak: any) {
    return this.proxyRes.on('end', function () {
      res.statusCode = 500
      res.end(JSON.stringify({
        ...dataLeak
      }))
    })
  }
}
