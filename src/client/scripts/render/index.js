import $ from 'jquery'
import $tvShowsContainer from 'src/client/scripts/tv-shows-container'

const template = `<article class="tv-show">
    <div class="left img-container">
      <img src=":img:" alt=":img alt:" />
    </div>
    <div class="right info">
      <h3>:name:</h3>
      <p>:summary:</p>
      <button data-id=:id: class="like">❤️</button>
    </div>
  </article>`

export default function renderShows (shows) {
  $tvShowsContainer.find('.loader').remove()
  shows.forEach(show => {
    let article = template
      .replace(':name:', show.name)
      .replace(':img:', show.image ? show.image.medium : '')
      .replace(':img alt:', show.name + ' Logo')
      .replace(':summary:', show.summary)
      .replace(':id:', show.id)
    $tvShowsContainer.append($(article))
  })
}
