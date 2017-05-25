'use strict'

import express from 'express'
import http from 'http'
import api from 'src/server/api'

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use(express.static('public'))
app.use('/api', api)

server.listen(port, () => console.log(`Server running at http://localhost:${port}`))
