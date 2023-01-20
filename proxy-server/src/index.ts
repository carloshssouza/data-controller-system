import { createProxyServer } from 'http-proxy'
import http from 'http'
import Identifier from './services/IdentifierService/identifier'

const proxy = createProxyServer()
const option = {
  target: 'http://localhost:9000',
  selfHandleResponse: true
}

proxy.on('proxyRes', async function (proxyRes: any, req: any, res: any) {
  let body: any = []
  // get the route name in the request
  // call the grpc method to get api permission
  // if the permission is false, check the response

  proxyRes.on('data', function (chunk: any) {
    body.push(chunk)
  })

  const personalData = await new Identifier().findPersonalData(res)
  const sensibleData = await new Identifier().findSensibleData(res)
  const result = {}
  if (personalData.length || sensibleData.length) {
    result = {
      title: '',
      description: '',
      routeId: '',
      routeName: '',
      leakData: []
    }
  }

  // Conectar com backend service

  proxyRes.on('end', function () {
    body = Buffer.concat(body).toString()
    res.end(JSON.stringify({ body: 'Your api is returning unauthorized data' }))
  })
})

const server = http.createServer((req: any, res: any) => {
  proxy.web(req, res, option)
})

server.listen(3000)
console.log('Proxy server listening on 3000')
