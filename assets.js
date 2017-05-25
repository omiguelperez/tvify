'use strict'

const fs = require('fs')

function serveStatic (name, callback) {
  fs.readFile(`public/${name}`, function (err, content) {
    if (err) {
      return callback(err)
    }
    callback(err, content)
  })
}

module.exports.serveStatic = serveStatic
