'use strict'

import express from 'express'
import tvmaze from 'tv-maze'
import Vote from 'src/server/models'

const router = express.Router()
const client = tvmaze.createClient()

function addVotes (shows, callback) {
  Vote.find({}, (err, votes) => {
    if (err) votes = []

    shows = shows.map(show => {
      let vote = votes.filter(vote => vote.showId === show.id)[0]
      show.count = vote ? vote.count : 0
      return show
    })

    callback(shows)
  })
}

router.get('/shows', (req, res) => {
  client.shows((err, shows) => {
    if (err) return res.sendStatus(500).json(err)

    addVotes(shows, shows => {
      res.json(shows)
    })
  })
})

router.get('/search', (req, res) => {
  let query = req.query.q

  client.search(query, (err, shows) => {
    if (err) return res.sendStatus(500).json(err)

    shows = shows.map(show => show.show)

    addVotes(shows, shows => {
      res.json(shows)
    })
  })
})

router.get('/votes', (req, res) => {
  Vote.find({}, (err, docs) => {
    if (err) return res.status(500).json(err)
    res.json(docs)
  })
})

router.post('/vote/:id', (req, res) => {
  function onSave (vote) {
    return function (err) {
      if (err) return res.status(500).json(err)
      res.json(vote)
    }
  }

  let id = req.params.id

  Vote.findOne({ showId: id }, (err, doc) => {
    if (err) return res.status(500).json(err)

    if (doc) {
      doc.count += 1
      doc.save(onSave(doc))
    } else {
      let vote = new Vote()
      vote.showId = id
      vote.count = 1
      vote.save(onSave(vote))
    }
  })
})

export default router
