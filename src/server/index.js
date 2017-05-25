'use strict'

import express from 'express'
import http from 'http'

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

let votes = {}

app.use(express.static('public'))

app.get('/votes', (req, res) => {
  res.json(votes)
})

app.post('/votes/:id', (req, res) => {
  let id = req.params.id
  votes[id] = (votes[id] || 0) + 1
  res.json({ votes: votes[id] })
})

server.listen(port, () => console.log(`Server running at http://localhost:${port}`))
