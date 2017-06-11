import $ from 'jquery'
import page from 'page'
import $tvShowsContainer from 'src/client/scripts/tv-shows-container'
import { getShows, searchShows } from 'src/client/scripts/tvmaze-api-client'
import renderShows from 'src/client/scripts/render'
import qs from 'qs'
import 'src/client/scripts/search-form'

page('/', function () {
  $tvShowsContainer.find('.tv-show').remove()
  getShows(shows => renderShows(shows))
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
