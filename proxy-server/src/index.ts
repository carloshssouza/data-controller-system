import { createProxyServer } from 'http-proxy'
import { http } from '../src/types/http'
import ControlDataService from './services/ControlDataService'
import { IncomingMessage } from './types/http'

const proxy = createProxyServer()
const option = {
  target: 'http://localhost:9000',
  selfHandleResponse: true
}

proxy.on('proxyRes', async function (proxyRes: IncomingMessage, req: IncomingMessage, res: http.ServerResponse) {
  const body: any = []
  proxyRes.on('data', function (chunk: any) {
    body.push(chunk)
  })

  await new ControlDataService().runController(proxyRes, req, res, body)
})

const server = http.createServer((req: any, res: any) => {
  proxy.web(req, res, option)
})

server.listen(3000)
console.log('Proxy server listening on 3000')
