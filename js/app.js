$(() => {
  //---------------------------------------------------------------------VARIABLES------------------------------------------------------------------------------------

  const columns = 7
  const rows = 6
  let $col = 0
  let index = 0
  let player = 'red'
  const $turn = $('.turn')
  const width = 41
  const $startScreen = $('.start-screen')
  const $startButton = $('.start')
  let space
  let $space
  let $nextSpace
  let $availableSpace

  //---------------------------------------------------------------------MAKE GRID------------------------------------------------------------------------------------

  const $grid = $('.grid')
  $grid.attr('data-width', columns)
  for(let i = 0; i < columns * rows; i++) {
    $col = $('<div>')
      .addClass('column none')
      .attr('data-column', i)
    $grid.append($col)
  }

  const $cells = $grid.children()
  //---------------------------------------------------------------------FIND LAST SPACE------------------------------------------------------------------------------
  function findAvailableSpace(c) {
    space = $(`.column[data-column='${c}']`)
    for (let i =  c; i <= width ; i += columns) {
      $space = $(`.column[data-column='${i + columns}']`)
      $nextSpace = $(`.column[data-column='${i + columns + columns}']`)
      // console.log('for loop', $space, i + columns)
      if($nextSpace.hasClass('red') || $nextSpace.hasClass('yellow') || i + columns + columns > width) {
        if($space.hasClass('red') || $space.hasClass('yellow')) {
          console.log('match')
          return space
        }
        return $space
      }
    }
    return null
  }

  //------------------------------------------------------------------------ WIN-----------------------------------------------------------
  const vectors = [-1, +1, columns-1, columns, columns+1]

  function getStartIndex(index, vector) {
    const newIndex = index + vector
    if ($cells.eq(newIndex).hasClass(player)){
      return getStartIndex(newIndex, vector)
    }
    if (!($cells.eq(newIndex)).hasClass(player)) {
      return index
    }
  }

  function getFourCells(index, vector) {
    const cellsToCheck = []
    for (let i = 0; i < 4; i++) {
      cellsToCheck.push($cells.eq(index+(vector * i)))
    }
    return cellsToCheck
  }

  function checkForWin(index) {
    return vectors.some(vector => {
      const startIndex = getStartIndex(index, -vector)
      const $cellsToCheck = getFourCells(startIndex, vector)
      return $cellsToCheck.every($cell => $cell.hasClass(player))
    })

  }

  //-------------------------------------------------------------------------GAME-------------------------------------------------------------------------------------

  function game() {
    // $startButton.on('click', function() {
    //   $startButton.show()
    // })

    $turn.text(`${player}'s turn!'`)
    $grid.on('click', '.column.none', function() {
      const c = $(this).data('column')

      $availableSpace = findAvailableSpace(c)
      $availableSpace.removeClass('none')
      $availableSpace.addClass(player)

      //INDEX
      const index = $availableSpace.index()
      //VECTOR

      if(checkForWin(index)) {
        // do something to end the game...
        console.log(`Player ${player} has won!`)
        // stop the game
      }

      //ALTERNATE BETWEEN TWO PLAYERS
      if(player === 'red') {
        player = 'yellow'
      } else {
        player = 'red'
      }

      $turn.text(`${player}'s turn!`)
    })
  }

  game()

})
