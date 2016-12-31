import $ from 'jquery'

export function getShows (done) {
  $.ajax('http://api.tvmaze.com/shows')
    .then((shows, textStatus, xhr) => {
      done(shows)
    })
}

export function searchShows (search, done) {
  $.ajax(`http://api.tvmaze.com/search/shows?q=${search}`)
    .then((response, textStatus, xhr) => {
      done(response)
    })
}
