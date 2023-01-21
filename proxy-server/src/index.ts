import { createProxyServer } from 'http-proxy'
import { http } from '../src/types/http'
import DataControlService from './services/DataControlService'
import { IncomingMessage } from './types/http'
import ErrorRes from './utils/error'

const proxy = createProxyServer()
const option = {
  target: 'http://localhost:9000',
  selfHandleResponse: true
}

proxy.on('proxyRes', async function (proxyRes: IncomingMessage, req: IncomingMessage, res: http.ServerResponse) {
  try {
    const body: any = []
    proxyRes.on('data', function (chunk: any) {
      body.push(chunk)
    })

    await new DataControlService().runController(proxyRes, req, res, body)
  } catch (error) {
    return await new ErrorRes(proxyRes).errorInternalServer(res, error.message, error.stack)
  }
})

const server = http.createServer((req: any, res: any) => {
  proxy.web(req, res, option)
})

server.listen(3000)
console.log('Proxy server listening on 3000')
