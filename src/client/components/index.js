import $ from 'jquery'
import page from 'page'
import $tvShowsContainer from 'src/client/components/tv-shows-container'
import { getShows, searchShows } from 'src/client/components/tvmaze-api-client'
import renderShows from 'src/client/components/render'
import qs from 'qs'
import 'src/client/components/search-form'

page('/', function () {
  $tvShowsContainer.find('.tv-show').remove()
  getShows(shows => renderShows(shows))
})

page('/search', function (context, next) {
  let $loader = $('<div class="loader">')
  $loader.appendTo($tvShowsContainer)
  $tvShowsContainer.find('.tv-show').remove()

  let { query } = qs.parse(context.querystring)
  searchShows(query, shows => {
    renderShows(shows)
  })
})

page()
