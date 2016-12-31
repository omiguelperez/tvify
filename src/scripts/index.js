import $ from 'jquery'
import page from 'page'
import $tvShowsContainer from 'src/scripts/tv-shows-container'
import { getShows, searchShows } from 'src/scripts/tvmaze-api-client'
import renderShows from 'src/scripts/render'
import qs from 'qs'
import 'src/scripts/search-form'

page('/', function () {
  $tvShowsContainer.find('.tv-show').remove()

  if (!localStorage.shows) {
    getShows(shows => {
      localStorage.shows = JSON.stringify(shows)
      renderShows(shows)
    })
  } else {
    renderShows(JSON.parse(localStorage.shows))
  }
})

page('/search', function (context, next) {
  let $loader = $('<div class="loader">')
  $loader.appendTo($tvShowsContainer)
  $tvShowsContainer.find('.tv-show').remove()

  let { query } = qs.parse(context.querystring)
  searchShows(query, response => {
    let shows = response.map(element => element.show)
    renderShows(shows)
  })
})

page()
