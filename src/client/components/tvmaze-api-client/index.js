import $ from 'jquery'

export function getShows (done) {
  $.ajax('/api/shows')
    .then((shows, textStatus, xhr) => {
      done(shows)
    })
}

export function searchShows (search, done) {
  $.ajax(`/api/search?q=${search}`)
    .then((response, textStatus, xhr) => {
      done(response)
    })
}
