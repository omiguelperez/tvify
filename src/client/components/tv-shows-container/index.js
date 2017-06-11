import $ from 'jquery'

const $tvShowsContainer = $('#app-body').find('.tv-shows')

$tvShowsContainer.on('click', 'button.like', function (e) {
  let $this = $(this)
  let $article = $this.closest('.tv-show')
  let id = $article.data('id')

  $.post(`/api/vote/${id}`, () => {
    let $counter = $article.find('.count')
    let content = $counter.html()
    let count = Number(content)
    count += 1
    $counter.html(count)
    $article.toggleClass('liked')
  })
})

export default $tvShowsContainer
