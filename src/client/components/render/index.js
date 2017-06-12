import $ from 'jquery'
import $tvShowsContainer from 'src/client/components/tv-shows-container'

const template = `<article data-id=:id: class="tv-show">
    <div class="left img-container">
      <img src=":img:" alt=":img alt:" />
    </div>
    <div class="right info">
      <h3>:name:</h3>
      <p>:summary:</p>
      <button class="like">❤️</button>
      <button class="chat">Chat</button>
      <span class="count">:count:</span>
    </div>
  </article>`

const chatTemplate = `<article data-id=:id: class="chat-container">
    <div class="left img-container">
      <img src=":img:" alt=":img alt:" />
    </div>
    <div class="right chat-window">
      <h1>:name:</h1>
      <div class="chat-body"></div>
      <input type="text" name="nickname" class="chat-nick" placeholder="Enter your nickname..." />
      <input type="text" name="message" class="chat-input" disabled />
    </div>
  </article>`

export function renderShows (shows) {
  $tvShowsContainer.find('.loader').remove()
  shows.forEach(show => {
    let article = template
      .replace(':name:', show.name)
      .replace(':img:', show.image ? show.image.medium : '')
      .replace(':img alt:', show.name + ' Logo')
      .replace(':summary:', show.summary)
      .replace(':id:', show.id)
      .replace(':count:', show.count)
    $tvShowsContainer.append($(article))
  })
}

export function renderChat (showId) {
  $.ajax('/api/show/' + showId, {
    success: function (show, textStatus, xhr) {
      let chat = chatTemplate
        .replace(':id:', showId)
        .replace(':name:', show.name)
        .replace(':img:', show.image ? show.image.medium : '')
        .replace(':img alt:', show.name + ' Logo')

      let $chat = $(chat)
      $tvShowsContainer.append($chat.fadeIn(1000))
    }
  })
}
