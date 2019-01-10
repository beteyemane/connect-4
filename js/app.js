$(() => {
  //---------------------------------------------------------------------VARIABLES------------------------------------------------------------------------------------
  const columns = 7
  const rows = 6
  const width = 41

  const $onloadScreen = $('.onload')
  const $startScreen = $('.start-screen')
  const $playerScreen = $('.choose-player-screen')
  const $scoreScreen = $('.score-screen')
  const $infoScreen = $('.info-screen')

  const $startButton = $('.start')
  const $twoPlayerButton = $('.two-player')
  const $compPlayerButton = $('.computer-player')
  const $restartButton = $('.restart')
  const $infoButton = $('.info')
  const $soundButton = $('.sound')
  const $closeButton = $('.close')
  const $closeScoreScreen = $('.close-score-screen')

  const $result = $('.result')
  const $togglePlayerColor = $('.toggle-player-color')
  const myAudio = new Audio('./audio/music.wav')

  const player = 'Red'
  const player2 = 'Yellow'

  let playerOneTurn = true
  let computerPlayer = false

  let space
  let $space
  let $nextSpace
  let $availableSpace
  let index
  let newIndex

  // -------------------------------------------------------------------AUDIO--------------------------------------------------------------
  function audio () {
    myAudio.play()
    $soundButton.on('click', function(){
      myAudio.pause()
    })
  }

  //---------------------------------------------------------------------MAKE GRID---------------------------------------------------------
  const $grid = $('.grid')
  for(let i = 0; i < columns * rows; i++) {
    const $div = $('<div>')
      .addClass('circle none')
      .attr('data-circle', i)
    $grid.append($div)
  }
  const $cells = $grid.children()
  //---------------------------------------------------------------------FIND LAST SPACE---------------------------------------------------
  function findAvailableSpace(c) {
    space = $(`.circle[data-circle='${c}']`)
    for (let i =  c; i <= width ; i += columns) {
      $space = $(`.circle[data-circle='${i + columns}']`)
      $nextSpace = $(`.circle[data-circle='${i + columns + columns}']`)
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
  const vectors = [-1, +1, columns-1, columns, columns+1]

  function getStartIndex(index, vector) {
    newIndex = index + vector
    if ($cells.eq(newIndex).hasClass(player)){
      return getStartIndex(newIndex, vector)
    }
    if (!($cells.eq(newIndex)).hasClass(player)) return index
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

  //----------------------------------------------------------------GET RANDOM CHOICE----------------------------------------------------
  const items = [columns - 3, columns - 2, columns - 1, columns, columns + 1, columns + 2, columns + 3]

  function getRandomNo(items) {
    const randomIndex = findAvailableSpace(items[Math.floor(Math.random() * columns)])
    if (!$cells.eq(randomIndex).hasClass('Yellow')){
      randomIndex.addClass('Yellow')
    }
  }
  //-------------------------------------------------------------------------GAME----------------------------------------------------------

  function game() {
    $grid.on('click', '.circle.none', function() {
      if(!computerPlayer) {
        const c = $(this).data('circle')
        $availableSpace = findAvailableSpace(c)
        $availableSpace.removeClass('none')
        $togglePlayerColor.addClass(playerOneTurn ? player : player2)
        $availableSpace.addClass(playerOneTurn ? player : player2)
        playerOneTurn = !playerOneTurn
        index = $availableSpace.index()
        checkForWin(index)
      } else {
        const c = $(this).data('circle')
        $availableSpace = findAvailableSpace(c)
        console.log($availableSpace)
        $availableSpace.removeClass('none')
        $availableSpace.addClass(player)
        index = $availableSpace.index()
        checkForWin(index)
        const computerChoice = getRandomNo(items)
        findAvailableSpace(computerChoice)
      }

      if(checkForWin(index)) {
        // do something to end the game...
        $onloadScreen.removeClass('hide')
        $scoreScreen.css('display', 'flex')

        console.log(`Player ${playerOneTurn ? player : player2 } has won!`)
        // stop the game
      }
      $togglePlayerColor.text(`${player}'s turn!`)
    })
  }

  function main() {
    audio()
    $onloadScreen.addClass('hide')
    $playerScreen.addClass('hide')
    $startButton.on('click', function() {
      $startScreen.addClass('hide')
      $playerScreen.removeClass('hide')
      $compPlayerButton.on('click', function(){
        computerPlayer = true
        game()
        $playerScreen.addClass('hide')
        $onloadScreen.removeClass('hide')
      })
      $twoPlayerButton.on('click', function(){
        game()
        $playerScreen.addClass('hide')
        $onloadScreen.removeClass('hide')
      })
    })
    $restartButton.on('click', function() {
      restart()
    })
    $infoButton.on('click', function() {
      $infoScreen.css('display', 'flex')
    })

    $closeButton.on('click', function() {
      $infoScreen.css('display', 'none')
    })
    $closeScoreScreen.on('click', function() {
      $scoreScreen.css('display', 'none')
    })
  }

  function restart() {
    $cells.removeClass('Red') && $cells.removeClass('Yellow')
    $availableSpace.removeClass('shadow-yellow')
    $availableSpace.removeClass('shadow-red')
  }

  main()

})






    //updates board on page load


    // $grid.on('mouseenter', '.circle.none', function() {
    //   const c = $(this).data('circle')
    //   const $availableSpace = findAvailableSpace(c)
    //   if(player2 === 'Yellow') {
    //     $availableSpace.addClass('shadow-red')
    //   } else {
    //     $availableSpace.addClass('shadow-yellow')
    //   }
    // })
    //
    // $grid.on('mouseleave', '.circle.none', function() {
    //   const c = $(this).data('circle')
    //   const $availableSpace = findAvailableSpace(c)
    //   if(player2 === 'Yellow') {
    //     $availableSpace.removeClass('shadow-red')
    //   } else {
    //     $availableSpace.removeClass('shadow-yellow')
    //   }
    // })
