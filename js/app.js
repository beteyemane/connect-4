$(() => {
  //---------------------------------------------------------------------VARIABLES------------------------------------------------------------------------------------
  const columns = 7
  const rows = 6
  const $turn = $('.turn')
  const width = 41
  const $startScreen = $('.start-screen')
  const $startButton = $('.start')
  const $onload = $('.onload')
  const $playerScreen = $('.choose-player-screen')
  const $twoPlayerButton = $('.two-player')
  const $compPlayerButton = $('.computer-player')
  const $scoreScreen = $('.score-screen')
  const $restart = $('.restart')
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

  // $cells.each(cell => console.log(cell))
  // console.log()
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
      // console.log(randomNo)
      // adding length of columns(7) to consecutive number so we can find the circle a below in the column clicked
      $space = $(`.circle[data-circle='${i + columns}']`)

      //adding length of 'column' to length 'column' plus consec number. This is to find the circle two rows below
      $nextSpace = $(`.circle[data-circle='${i + columns + columns}']`)


      //if circle below has been played or nsdfn and circle two rows below has been played then put class circle clicked. if not just end
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
    //if any of the divs at the direction the player has played has been played, repeat the function those directions

    // if ($cells.eq(newIndex).hasClass('yellow') || $cells.eq(newIndex).hasClass('red')) {
    //   console.log('done')
    // }


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

      const startIndex = getStartIndex(index, -vector)
      const $cellsToCheck = getFourCells(startIndex, vector)
      return $cellsToCheck.every($cell => $cell.hasClass(player))
    })

  }

  //----------------------------------------------------------------GET RANDOM CHOICE----------------------------------------------------

  // function getRandomNo(items) {
  //   for(let i = 0; i <= columns; i++) {
  //     return items[Math.floor(Math.random() * columns)]
  //   }
  // }

  const items = [columns - 3, columns - 2, columns - 1, columns, columns + 1, columns + 2, columns + 3]
  console.log(items)

  //-------------------------------------------------------------------------GAME-------------------------------------------------------------------------------------

  function game() {

    //updates board on page load
    $turn.text(`${player}'s turn!`)

    $grid.on('click', '.circle.none', function() {
      //index number for cells

      const c = $(this).data('circle')
      $availableSpace = findAvailableSpace(c)
      $availableSpace.removeClass('none')
      $availableSpace.addClass(player)


      const index = $availableSpace.index()


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

  function main() {
    $onload.addClass('hide')
    $playerScreen.addClass('hide')
    $startButton.on('click', function() {
      $startScreen.addClass('hide')
      $playerScreen.removeClass('hide')
      $twoPlayerButton.on('click', function(){
        $playerScreen.addClass('hide')
        $onload.removeClass('hide')
      })
    })
    $restart.on('click', function() {
      restart()
    })
  }
  //offset for arrow


  function restart() {

    $cells.removeClass('Red') && $cells.removeClass('Yellow')
  }

  main()

})
