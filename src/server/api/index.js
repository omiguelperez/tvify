'use strict'

import express from 'express'
import tvmaze from 'tv-maze'
import { addVotes, incrementVote, getVotes } from 'src/server/lib'

const router = express.Router()
const client = tvmaze.createClient()

router.get('/shows', (req, res) => {
  client.shows((err, shows) => {
    if (err) return res.status(500).json(err)

    addVotes(shows, shows => {
      res.json(shows)
    })
  })
})

router.get('/search', (req, res) => {
  let query = req.query.q

  client.search(query, (err, shows) => {
    if (err) return res.status(500).json(err)

    shows = shows.map(show => show.show)

    addVotes(shows, shows => {
      res.json(shows)
    })
  })
})

router.get('/votes', (req, res) => {
  getVotes((err, docs) => {
    if (err) return res.status(500).json(err)
    res.json(docs)
  })
})

router.post('/vote/:id', (req, res) => {
  let id = req.params.id

  incrementVote(id, (err, vote) => {
    if (err) return res.status(500).json(err)
    res.json(vote)
  })
})

export default router
