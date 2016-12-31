import $ from 'jquery'

const $tvShowsContainer = $('#app-body').find('.tv-shows')

$tvShowsContainer.on('click', 'button.like', function (e) {
  let $this = $(this)
  $this.closest('.tv-show').toggleClass('liked')
})

export default $tvShowsContainer
