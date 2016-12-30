$(function () {

  var $tvShowsContainer = $('#app-body').find('.tv-shows')
  var template = '<article class="tv-show">' +
      '<div class="left img-container">' +
        '<img src=":img:" alt=":img alt:" />' +
      '</div>' +
      '<div class="right info">' +
        '<h3>:name:</h3>' +
        '<p>:summary:</p>' +
      '</div>' +
    '</article>'

  function renderShows (shows) {
    shows.forEach(function (show) {
      var article = template
        .replace(':name:', show.name)
        .replace(':img:', show.image ? show.image.medium : '')
        .replace(':img alt:', show.name + ' Logo')
        .replace(':summary:', show.summary)
      $tvShowsContainer.append($(article))
    })
  }

  $('#app-body')
    .find('form')
    .submit(function (e) {
      e.preventDefault()

      var busqueda = $(this)
        .find('input[type="text"]')
        .val()

      $tvShowsContainer.find('.tv-show').remove()
      var $loader = $('<div class="loader">')
      $loader.appendTo($tvShowsContainer)

      $.ajax({
        url: `http://api.tvmaze.com/search/shows?q=${busqueda}`,
        success: function (showsContainer, textStatus, xhr) {
          $loader.remove()
          var shows = showsContainer.map(function (element) {
            return element.show
          })
          renderShows(shows)
        }
      })
    })

  $.ajax({
    url: 'http://api.tvmaze.com/shows',
    success: function (shows, textStatus, xhr) {
      $tvShowsContainer.find('.loader').remove()
      renderShows(shows)
    }
  })
})
