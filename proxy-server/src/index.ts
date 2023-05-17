import { createProxyServer } from 'http-proxy'
import DataControlService from './services/DataControlService'
import { IncomingMessage, http } from './types/http'
import dotenv from 'dotenv'
import Grpc from './services/GrpcService/grpc'

const EventEmitter = require('events')

EventEmitter.defaultMaxListeners = 20

dotenv.config()

const PORT = process.env.PROXY_PORT || 8888
const proxy = createProxyServer()
const option = {
  target: '', // initialize with empty string
  selfHandleResponse: true
}

async function startProxyServer () {
  try {
    const config = await Grpc.getApplicationHost() as { applicationHost: string }
    const applicationHost = config.applicationHost
    option.target = applicationHost // set target after getting application host

    process.on('SIGINT', () => {
      console.log('Received SIGINT signal. Stopping server...')
      process.exit(0)
    })

    proxy.on('proxyRes', async function (proxyRes: IncomingMessage, req: IncomingMessage, res: http.ServerResponse) {
      try {
        let body: any = []
        proxyRes.on('data', function (chunk: any) {
          body.push(chunk)
        })
        proxyRes.on('end', async () => {
          if (proxyRes.statusCode === 404) {
            res.statusCode = 404
            return res.end(JSON.stringify({
              message: proxyRes.statusMessage
            }))
          }
          body = Buffer.concat(body).toString()
          const bodyResponse = await DataControlService.runController(req, JSON.parse(body))
          if (JSON.stringify(body) === bodyResponse) {
            res.statusCode = proxyRes.statusCode
            res.end(body)
          } else {
            res.statusCode = 500
            return res.end(JSON.stringify(bodyResponse))
          }
        })
      } catch (error) {
        console.log(error)
        return res.end(JSON.stringify(error))
      }
    })

    const server = http.createServer((req: any, res: any) => {
      proxy.web(req, res, option)
    })

    server.listen(PORT)
    console.log(applicationHost)
    console.log(`Proxy server listening on ${PORT} with target ${applicationHost}`)
  } catch (error) {
    console.error(error)
  }
}

startProxyServer()
