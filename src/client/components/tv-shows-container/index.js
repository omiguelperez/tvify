import $ from 'jquery'
import page from 'page'
import io from 'socket.io-client'

const $tvShowsContainer = $('#app-body').find('.tv-shows')
const $appContainer = $tvShowsContainer.closest('#app-container')

let socket = io.connect()

$appContainer.on('click', '.app-title', function (e) {
  let $chatContainer = $appContainer.find('.chat-container')
  $chatContainer.fadeOut(500)
})

$tvShowsContainer.on('click', 'button.chat', function (e) {
  let $this = $(this)
  let $article = $this.closest('.tv-show')
  let showId = $article.data('id')

  page('/chat/' + showId)
})

$tvShowsContainer.on('keypress', '.chat-nick', function (e) {
  let $this = $(this)
  let $chatInput = $('.chat-input')

  $chatInput.prop('disabled', $this.val().length === 0)
})

$tvShowsContainer.on('click', 'button.like', function (e) {
  let $this = $(this)
  let $article = $this.closest('.tv-show')
  let id = $article.data('id')

  socket.emit('vote', id)
})

socket.on('vote:done', vote => {
  let $show = $tvShowsContainer.find('.tv-show[data-id=' + vote.showId + ']')
  let $counter = $show.find('.count')
  $counter.html(vote.count)

  $show.toggleClass('liked')
})
export default $tvShowsContainer
