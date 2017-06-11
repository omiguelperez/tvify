'use strict'

import Vote from 'src/server/models'

export function addVotes (shows, callback) {
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

export function incrementVote (id, callback) {
  Vote.findOne({ showId: id }, (err, vote) => {
    if (err) return callback(err)

    if (vote) {
      vote.count++
      vote.save(err => {
        if (err) return callback(err)
        callback(null, vote)
      })
    } else {
      let vote = new Vote()
      vote.showId = id
      vote.count = 1
      vote.save(err => {
        if (err) return callback(err)
        callback(null, vote)
      })
    }
  })
}

export function getVotes (callback) {
  Vote.find({}, (err, votes) => {
    if (err) return callback(err)
    callback(null, votes)
  })
}
