'use strict'

import express from 'express'
import Vote from 'src/server/models'

const router = express.Router()

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
