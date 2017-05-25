'use strict'

const port = process.env.PORT || 3000

const express = require('express')
const http = require('http')

const app = express()

app.use(express.static('public'))

app.get('/shows', function (req, res) {

})

app.post('/show', function (req, res) {

})

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`)
})
