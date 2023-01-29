import { createProxyServer } from 'http-proxy'
import DataControlService from './services/DataControlService'
import { IncomingMessage, http } from './types/http'
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
    let body: any = []
    proxyRes.on('data', function (chunk: any) {
      body.push(chunk)
    })
    proxyRes.on('end', async () => {
      body = Buffer.concat(body).toString()
      const bodyResponse = await DataControlService.runController(req, JSON.parse(body))
      if (JSON.stringify(body) === bodyResponse) {
        res.statusCode = proxyRes.statusCode
        res.end(body)
      } else {
        res.statusCode = 500
        res.end(JSON.stringify(bodyResponse))
      }
    })
  } catch (error) {
    console.log(error)
    res.end(JSON.stringify(error))
  }
})

const server = http.createServer((req: any, res: any) => {
  proxy.web(req, res, option)
})

server.listen(PORT)
console.log(`Proxy server listening on ${PORT}`)
