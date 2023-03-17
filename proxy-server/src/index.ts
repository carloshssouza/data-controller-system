import { createProxyServer } from 'http-proxy'
import DataControlService from './services/DataControlService'
import { IncomingMessage, http } from './types/http'
import dotenv from 'dotenv'
import File from './utils/file'
import path from 'path'
const EventEmitter = require('events')

EventEmitter.defaultMaxListeners = 20

const configPath = path.resolve(__dirname, '../../configs/proxy.config.json')
const target = File.readFile(configPath)

process.on('SIGINT', () => {
  console.log('Received SIGINT signal. Stopping server...')
  process.exit(0)
})

dotenv.config()

const PORT = process.env.PROXY_PORT || 8888
const proxy = createProxyServer()
const option = {
  target: target.applicationHost,
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
      console.log('body', body)
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
console.log(`Proxy server listening on ${PORT} with target ${target}`)
