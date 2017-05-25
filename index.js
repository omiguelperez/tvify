'use strict'

const port = process.env.PORT || 3000

const http = require('http')
const assets = require('./assets')

const server = http.createServer(function (req, res) {
  switch (req.url) {
    case '/':
      assets.serveStatic('index.html', function (err, content) {
        res.end(content)
      })
      break
    case '/app.min.js':
      assets.serveStatic('app.min.js', function (err, content) {
        res.end(content)
      })
      break
    case '/app.min.css':
      assets.serveStatic('app.min.css', function (err, content) {
        res.end(content)
      })
      break
    default:
      res.end('')
  }
})

server.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`)
})
