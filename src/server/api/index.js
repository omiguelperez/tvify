'use strict'

import express from 'express'

const router = express.Router()

let votes = {}

router.get('/votes', (req, res) => {
  res.json(votes)
})

router.post('/votes/:id', (req, res) => {
  let id = req.params.id
  votes[id] = (votes[id] || 0) + 1
  res.json({ votes: votes[id] })
})

export default router
