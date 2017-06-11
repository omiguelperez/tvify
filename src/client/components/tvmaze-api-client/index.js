import $ from 'jquery'

export function getShows (done) {
  $.ajax('http://api.tvmaze.com/shows')
    .then((shows, textStatus, xhr) => {
      $.get('/api/votes', (votes) => {
        shows = shows.map(show => {
          let vote = votes.filter(vote => vote.showId === show.id)[0]
          show.count = vote ? vote.count : 0
          return show
        })
        done(shows)
      })
    })
}

export function searchShows (search, done) {
  $.ajax(`http://api.tvmaze.com/search/shows?q=${search}`)
    .then((response, textStatus, xhr) => {
      done(response)
    })
}
