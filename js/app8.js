$(() => {

  // -------------------------------------------------------VARIABLES-----------------------------------------------------------

  let gameOver = false
  //size of board
  const columns = 7
  const rows = 6
  //board from DOM
  const $board = $('.board')
  let player = 1


  $board.attr('data-width', columns)


  // -------------------------------------------------------GRID--------------------------------------------------------------

  //CREATE A 7 X 6 GRID
  function grid() {
    for (let i = 0; i < columns*rows; i++) {
      const $col = $('<div>')
        .addClass('column none')
        .attr('data-column', i)
      $board.append($col)
    }
  }
  // --------------------------------------------------FIND NEXT AVAILABLE SPACE-------------------------------------------------

  //must be able to locate the circle that doesnt have a "counter" - and to drop counter and lowest available space
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
    $board.on('click', '.column.none', function() {
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

  grid()

})
