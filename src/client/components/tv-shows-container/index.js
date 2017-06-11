import $ from 'jquery'
import io from 'socket.io-client'

const $tvShowsContainer = $('#app-body').find('.tv-shows')

let socket = io.connect()

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
