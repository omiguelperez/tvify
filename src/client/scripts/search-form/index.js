import $ from 'jquery'
import page from 'page'

$('#app-body')
  .find('form')
  .submit(function (e) {
    e.preventDefault()

    let query = $(this)
      .find('input[type="text"]')
      .val()

    page(`/search?query=${query}`)
  })
