const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const option = {
    target:'http://localhost:9000',
    selfHandleResponse : true
  };

proxy.on('proxyRes', function (proxyRes, req, res) {
    var body = [];
    proxyRes.on('data', function (chunk) {
        body.push(chunk);
    });
    proxyRes.on('end', function () {
        body = Buffer.concat(body).toString();
        res.end(JSON.stringify({body: "proxy", message: "Teste"}));
    });
});

const server = require('http').createServer((req, res) => {
    proxy.web(req, res, option);
  });

server.listen(3000);
console.log("Proxy server listening on 3000")
