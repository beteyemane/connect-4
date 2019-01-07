//new grid

$(() => {

  let player = 1
  const width = 7

  const $grid = $('.grid')

  $grid.attr('data-width', width)

  for(let i = 0; i<width*6; i++) {
    const $col = $('<div>')
      .addClass('column none')
      .attr('data-column', i)
    $grid.append($col)
  }


  function findAvailableSpace(c) {
    const space = $(`.column[data-column='${c}']`)
    //loop backwards
    for (let i = space.length - 1; i >= 0; i--) {
      const $space= $(space[i])
      if($space.hasClass('none')) {
        return $space
      }
    }
    return null
  }

  // -------------------------------------------------------GAME--------------------------------------------------------------

  function game() {
    $grid.on('click', '.column.none', function() {
      const c = $(this).data('column')
      const $availableSpace = findAvailableSpace(c)
      $availableSpace.removeClass('none')
      //ALTERNATE BETWEEN TWO PLAYERS
      if(player === 1) {
        $availableSpace.addClass('red')
        player++
      } else {
        $availableSpace.addClass('yellow')
        player--
      }
    })
  }

  // -------------------------------------------------------WIN CONDITION-------------------------------------------------------

  // check direction

  // check horizontal

  // check vertical

  // check diagonals
  // - TR to BL

  // - TL to BR

  game()

})
