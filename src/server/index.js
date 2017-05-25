'use strict'

import express from 'express'
import http from 'http'

const port = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))

app.get('/shows', (req, res) => {

})

app.post('/show', (req, res) => {

})

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
