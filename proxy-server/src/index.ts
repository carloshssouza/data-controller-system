import { createProxyServer } from 'http-proxy'
import DataControlService from './services/DataControlService'
import { IncomingMessage, http } from './types/http'
import ErrorRes from './utils/error'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PROXY_PORT || 8888
const proxy = createProxyServer()
const option = {
  target: process.env.TARGET,
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
    return await new ErrorRes(proxyRes).internalServerError(res, error.message, error.stack)
  }
})

const server = http.createServer((req: any, res: any) => {
  proxy.web(req, res, option)
})

server.listen(PORT)
console.log(`Proxy server listening on ${PORT}`)
