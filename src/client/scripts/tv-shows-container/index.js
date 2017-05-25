import $ from 'jquery'

const $tvShowsContainer = $('#app-body').find('.tv-shows')

$tvShowsContainer.on('click', 'button.like', function (e) {
  let $this = $(this)
  let id = $this.data('id')

  $.post(`/votes/${id}`, () => {
    $this.closest('.tv-show').toggleClass('liked')
  })
})

export default $tvShowsContainer
