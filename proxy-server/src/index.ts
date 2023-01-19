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
  proxyRes.on('data', function (chunk: any) {
    body.push(chunk)
  })
  const personalData = await new Identifier().findPersonalData(res)
  const sensibleData = await new Identifier().findSensibleData(res)
  if (personalData.length) {
    // gerar erro
  }
  if (sensibleData.length) {
    // gerar erro
  }
  // Conectar com backend service

  proxyRes.on('end', function () {
    body = Buffer.concat(body).toString()
    res.end(JSON.stringify({ body: 'proxy', message: 'Teste' }))
  })
})

const server = http.createServer((req: any, res: any) => {
  proxy.web(req, res, option)
})

server.listen(3000)
console.log('Proxy server listening on 3000')
