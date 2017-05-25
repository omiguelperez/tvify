import $ from 'jquery'
import page from 'page'
import $tvShowsContainer from 'src/client/scripts/tv-shows-container'

$('#app-body')
  .find('form')
  .submit(function(e) {
    e.preventDefault()

    let query = $(this)
      .find('input[type="text"]')
      .val()

    page(`/search?query=${query}`)
  })
