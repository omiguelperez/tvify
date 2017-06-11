'use strict'

import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import mongoose from 'mongoose'
import api from 'src/server/api'
import { incrementVote } from 'src/server/lib'

mongoose.connect('mongodb://localhost/tvify')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {
  console.log(`Connected: ${socket.id}`)

  socket.on('vote', id => {
    incrementVote(id, (err, vote) => {
      if (err) socket.emit('vote:error', err)

      socket.emit('vote:done', vote)
      socket.broadcast.emit('vote:done', vote)
    })
  })
})

app.use(express.static('public'))
app.use('/api', api)

server.listen(port, () => console.log(`Server running at http://localhost:${port}`))
