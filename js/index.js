$(function () {

  $('#app-body')
    .find('form')
    .submit(function (e) {
      e.preventDefault()

      var busqueda = $(this)
        .find('input[type="text"]')
        .val()
      alert(`Se ha buscado ${busqueda}`)
    })

  var template = '<article class="tv-show">' +
      '<div class="left img-container">' +
        '<img src=":img:" alt=":img alt:" />' +
      '</div>' +
      '<div class="right info">' +
        '<h3>:name:</h3>' +
        '<p>:summary:</p>' +
      '</div>' +
    '</article>' +

  $.ajax({
    url: 'http://api.tvmaze.com/shows',
    method: 'get',
    success: function (shows, textStatus, xhr) {
      var tvShowsContainer = $('#app-body').find('.tv-shows')
      shows.forEach(function (show) {
        var article = template
          .replace(':name:', show.name)
          .replace(':img:', show.image.medium)
          .replace(':img alt:', show.name + ' Logo')
          .replace(':summary:', show.summary)
        tvShowsContainer.append($(article))
      })
    }
  })
})
