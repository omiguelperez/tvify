const $ = require('jquery')

$(function () {

  var $tvShowsContainer = $('#app-body').find('.tv-shows')
  var template = '<article class="tv-show">' +
      '<div class="left img-container">' +
        '<img src=":img:" alt=":img alt:" />' +
      '</div>' +
      '<div class="right info">' +
        '<h3>:name:</h3>' +
        '<p>:summary:</p>' +
        '<button class="like">❤️</button>' +
      '</div>' +
    '</article>'

  $tvShowsContainer.on('click', 'button.like', function (e) {
    var $this = $(this)
    $this.closest('.tv-show').toggleClass('liked')
  })

  function renderShows (shows) {
    $tvShowsContainer.find('.loader').remove()
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

      $.ajax(`http://api.tvmaze.com/search/shows?q=${busqueda}`)
        .then(function (showsContainer, textStatus, xhr) {
          var shows = showsContainer.map(function (element) {
            return element.show
          })
          renderShows(shows)
        })
    })

  if (!localStorage.shows) {
    $.ajax('http://api.tvmaze.com/shows')
      .then(function (shows, textStatus, xhr) {
        console.log('shows', shows)
        localStorage.shows = JSON.stringify(shows)
        renderShows(shows)
      })
  } else {
    renderShows(JSON.parse(localStorage.shows))
  }
})
