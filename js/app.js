$(() => {
  //---------------------------------------------------------------------VARIABLES------------------------------------------------------------------------------------
  const columns = 7
  const rows = 6
  const $turn = $('.turn')
  const width = 41
  const $startScreen = $('.start-screen')
  const $startButton = $('.start')
  let player = 'Red'
  let space
  let $space
  let $nextSpace
  let $availableSpace
  //---------------------------------------------------------------------MAKE GRID------------------------------------------------------------------------------------
  //create a 7 x 6 grid of divs and add a class of 'circle' to style. Also add a class of 'none' so we can later replace the class with the players' colored counter (either classs of red or yellow) to show it has been played.
  //add atrribute of data-circle and give them consecutive numbers so we can have them all numbered.
  const $grid = $('.grid')
  for(let i = 0; i < columns * rows; i++) {
    $div = $('<div>')
      .addClass('circle none')
      .attr('data-circle', i)
    $grid.append($div)
  }

  //get the divs with classes from grid (children of the grid)
  const $cells = $grid.children()
  //---------------------------------------------------------------------FIND LAST SPACE------------------------------------------------------------------------------
  //create a function which will fill the class of player on the last available counter on the column that is clicked
  //add argument of c so we can call it when we call function
  function findAvailableSpace(c) {
  //finds divs with classes from grid
  // consecutive number from data-circle (that has been clicked on)
  //the back ticks data circle info has been taken. the consecutive number has been changed to this functions parameter's and added to a variable 'space'
  //space is the circle you click on
    space = $(`.circle[data-circle='${c}']`)
    //loops for width length (42) then plus the consecutive numbers to columns
    for (let i =  c; i <= width ; i += columns) {
      // adding length of columns(7) to consecutive number so we can find the circle a below in the column clicked
      $space = $(`.circle[data-circle='${i + columns}']`)
      //adding length of 'column' to length 'column' plus consec number. This is to find the circle two rows below
      $nextSpace = $(`.circle[data-circle='${i + columns + columns}']`)
      //if circle below has been played or nsdfn and circle two rows belop has been played then put class circle clicked. if not just end
      if($nextSpace.hasClass('Red') || $nextSpace.hasClass('Yellow') || i + columns + columns > width) {
        if($space.hasClass('Red') || $space.hasClass('Yellow')) {
          return space
        }
        return $space
      }
    }
    return null
  }

  //------------------------------------------------------------------------ WIN-----------------------------------------------------------
  //create and array of "directions"
  const vectors = [-1, +1, columns-1, columns, columns+1]
  //create a function that takes in the index of played counter and the directions
  function getStartIndex(index, vector) {
  //variable that addes each direction to the played counter
    const newIndex = index + vector
    //if the divs at the direction the player has played has been played, repeat the function the those directions
    if ($cells.eq(newIndex).hasClass(player)){
      return getStartIndex(newIndex, vector)
    }
    //if none of the directions that the played counter have also been played, tnen play counter
    if (!($cells.eq(newIndex)).hasClass(player)) {
      return index
    }
  }

  //this function will check for four in a row
  function getFourCells(index, vector) {
    const cellsToCheck = []
    for (let i = 0; i < 4; i++) {
    //index + vector * i are an array of four that have the indecies of each direction of played counter
    //add to empty array
      cellsToCheck.push($cells.eq(index+(vector * i)))
    }
    return cellsToCheck
  }


  function checkForWin(index) {
  //loop through the directions
    return vectors.some(vector => {
      //dont understand
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
    //updates board on page load
    $turn.text(`${player}'s turn!`)

    $grid.on('click', '.circle.none', function() {
      const c = $(this).data('circle')
      $availableSpace = findAvailableSpace(c)
      $availableSpace.removeClass('none')
      //getting index of the next available space
      const index = $availableSpace.index()
      $availableSpace.addClass(player)

      if(checkForWin(index)) {
        // do something to end the game...
        console.log(`Player ${player} has won!`)
        // stop the game
      }
      //alternate between two players
      if(player === 'Red') {
        player = 'Yellow'
      } else {
        player = 'Red'
      }
      $turn.text(`${player}'s turn!`)
    })
  }

  game()

})
