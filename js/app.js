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
  const $homeButton = $('.home')
  const $backButton = $('.back')
  const $soundButton = $('.sound')
  const $closeButton = $('.close')
  const $closeScoreScreen = $('.close-score-screen')
  const $time = $('.time')

  const $result = $('.result')
  const $score = $('.score')
  const $bonusWin = $('.bonus-win')
  const $bonusTime = $('.bonus-time')
  const $togglePlayerColor = $('.toggle-player-color')
  const myAudio = new Audio('./audio/music.wav')
  const audioMouseover = new Audio('./audio/mouseover.wav')
  const audioClick = new Audio('./audio/click.wav')

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

  let time = 0

  function getInterval() {
    const seconds = setInterval(function() {
      time++
      $time.text(time)
    }, 1000)
  }

  // -------------------------------------------------------------------AUDIO--------------------------------------------------------------

  $soundButton.on('click', myAudio.pause())

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
  function findAvailableSpace(circle) {
    // console.log(circle)
    space = $(`.circle[data-circle='${circle}']`)
    for (let i =  circle; i <= width ; i += columns) {
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
  // console.log(vectors)

  function getStartIndex(index, vector) {
    newIndex = index + vector
    if ($cells.eq(newIndex).hasClass(playerOneTurn ? player : player2)){
      return getStartIndex(newIndex, vector)
    }
    if (!($cells.eq(newIndex)).hasClass(playerOneTurn ? player : player2)) return index
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
      const player1Wins = $cellsToCheck.every($cell => $cell.hasClass(player))
      const player2wins = $cellsToCheck.every($cell => $cell.hasClass(player2))
      return player1Wins || player2wins
    })
  }

  //----------------------------------------------------------------GET RANDOM CHOICE----------------------------------------------------
  function getRandomNo(vectors) {
    const randomIndex = findAvailableSpace(vectors[Math.floor(Math.random() * vectors.length)])
    // if (!$cells.eq(randomIndex).hasClass('Yellow')){
    //   randomIndex.addClass('Yellow')
    // }
    // if ($cells.eq(items).hasClass('Red')) {
    // //if the cells have a class of red
    // //add a class of yellow next to it
    const newItems = index + vectors
    // console.log(vectors)
    if ($cells.eq(vectors).hasClass('Yellow')) {
      getStartIndex(newItems, vectors)
      //check if cell next to me is free and go
    } if ($cells.eq(newItems).hasClass('Yellow')) {
      $cells.eq(newItems).addClass('Yellow')
    } else {
      randomIndex.addClass('Yellow')
    }

    // if ($cells.eq(vector).hasClass('Yellow')){
    //   console.log(getStartIndex(randomIndex, vector))
    //
    //   // $cells.eq(vector).addClass('Yellow')
    // } else {
    //   randomIndex.addClass('Yellow')
    // }
    // function getStartIndex(index, vector) {
    //   newIndex = index + vector
    //   if ($cells.eq(newIndex).hasClass(player)){
    //     return getStartIndex(newIndex, vector)
    //   }
    //   if (!($cells.eq(newIndex)).hasClass(player)) return index
    // }
    //if items of yellow h
    //is cell next to me Yellow
    //if it isn't
    //get random square
    //wait till its free ANDD square next is yellow
  }


  //-------------------------------------------------------------------------GAME----------------------------------------------------------
  function game() {

    toggleShadow()
    $grid.on('click', '.circle.none', function() {
      audioClick.play()
      const circle = $(this).data('circle')
      $availableSpace = findAvailableSpace(circle)
      $availableSpace.removeClass('none')
      $availableSpace.removeClass('shadow-yellow')
      $availableSpace.removeClass('shadow-red')

      index = $availableSpace.index()

      if(!computerPlayer) {
        twoPlayer()
      } else {
        computer()
      }
      checkForWin(index)

      if(checkForWin(index)) {
        $onloadScreen.removeClass('hide')
        $scoreScreen.css('display', 'flex')
        $result.text(`${playerOneTurn ? player2 : player} wins!`)
        scores()
      }
    })
  }

  function scores() {
    if(time < 20) {
      $bonusTime.text(time + 1722)
      $bonusWin.text(1000)
      $score.text(Math.round(12730 / time + 1722))
    } else  {
      $bonusTime.text(0)
      $bonusWin.text(0)
      clearInterval()
      $score.text(Math.round(12730 / time))
    }
  }

  function twoPlayer() {
    $availableSpace.addClass(playerOneTurn ? player : player2)
    playerOneTurn = !playerOneTurn
    console.log('this is player', player )
  }

  function computer() {
    $availableSpace.addClass(player)
    const computerChoice = getRandomNo(vectors)
    findAvailableSpace(computerChoice)
  }

  function toggleShadow() {
    $grid.on('mouseenter', '.circle.none', function() {
      audioMouseover.play()
      const circle = $(this).data('circle')
      $availableSpace = findAvailableSpace(circle)
      if(!playerOneTurn) {
        $availableSpace.addClass('shadow-yellow')
      } else {
        $availableSpace.addClass('shadow-red')
      }
    })
    $grid.on('mouseleave', '.circle.none', function() {
      const circle = $(this).data('circle')
      $availableSpace = findAvailableSpace(circle)
      if(!playerOneTurn) {
        $availableSpace.removeClass('shadow-yellow')
      } else {
        $availableSpace.removeClass('shadow-red')
      }
    })
  }

  function main() {
    myAudio.play()
    $onloadScreen.addClass('hide')
    $playerScreen.addClass('hide')
    $startButton.on('click', function() {
      $startScreen.addClass('hide')
      $playerScreen.removeClass('hide')
      $compPlayerButton.on('click', function(){
        computerPlayer = true
        game()
        getInterval()
        $playerScreen.addClass('hide')
        $onloadScreen.removeClass('hide')
      })
      $twoPlayerButton.on('click', function(){
        game()
        getInterval()
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
      restart()
    })
    $closeScoreScreen.on('click', function() {
      $scoreScreen.css('display', 'none')
      restart()
    })
    $homeButton.on('click', function() {
      $startScreen.removeClass('hide')
      $onloadScreen.addClass('hide')
      restart()

    })
    $backButton.on('click', function() {
      $onloadScreen.addClass('hide')
      $playerScreen.removeClass('hide')
    })
  }

  function restart() {
    $cells.removeClass(player) && $cells.removeClass(player2)
    $availableSpace.removeClass('shadow-yellow')
    $availableSpace.removeClass('shadow-red')
  }

  main()

})
