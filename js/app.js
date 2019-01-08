$(() => {

  const setIndicies = [
    //row one
    [0,1,2,3],
    [1,2,3,4],
    [2,3,4,5],
    [3,4,5,6],
    //row two
    [7,8,9,10],
    [8,9,10,11],
    [9,10,11,12],
    [10,11,12,13],
    //row three
    [14,15,16,17],
    [15,16,17,18],
    [16,17,18,19],
    [17,18,19,20],
    //row four
    [21,22,23,24],
    [22,23,24,25],
    [23,24,25,26],
    [24,25,26,27],
    //row five
    [27,28,29,30],
    [28,29,30,31],
    [29,30,31,32],
    [30,31,32,33],
    //row six
    [34,35,36,37],
    [35,36,37,38],
    [36,37,38,39],
    [37,38,39,40],
    [38,39,40,41]
  ]

  function checkForWin(player) {
    // loop through the setIndicies array
    // get each set of DOMElements,
    // check whether there are 4 of a kind

    //check if -1, 1 etc have class of red and yellow


    setIndicies.forEach(set => {
      const colors = set.map(index => $('.grid div').eq(index).attr('class').replace('column ', ''))
      // console.log(set)
      const toggle = colors.every(color => color === player)
      // console.log(toggle)
      if (toggle === true) {
        $turn.text(`${player} wins!`)
      }

    })
  }

  //---------------------------------------------------------------------VARIABLES------------------------------------------------------------------------------------

  const columns = 7
  const rows = 6
  let $col = 0
  let index = 0
  let player = 'Red'
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
      //ALTERNATE BETWEEN TWO PLAYERS
      if(player === 'Red') {
        $availableSpace.addClass('red')
        player = 'Yellow'
        $turn.text(`${player}'s turn!`)
        checkForWin('red')
      } else {
        $availableSpace.addClass('yellow')
        player = 'Red'
        $turn.text(`${player}'s turn!`)
        checkForWin('yellow')
      }
      //INDEX
      const index = $availableSpace.index()
      //VECTOR
      const vector = [- 1, + 1, + columns - 1, + columns, + columns + 1]

      function getStartCell(index, vector) {

        for (let i = 0; i < vector.length; i++) {
          const newIndex = index + vector[i]
          console.log(newIndex)
          if(newIndex && index !== player) {
            console.log('check')
          }
        }

        console.log('THE INDEX', index)
        console.log('THE VECTOR', vector)


        // if(the cell at index + vector is not the players color) {
        //return index } else return getStartCell(index + vector, vector)
        // }
      }
      console.log(getStartCell(index, vector))

      function getFourCells(index, vector) {
        const cells = []
        for (let i = 0; i < 4; i++) {
          cells.push(index+(vector * i))
        }
      }
    })
  }

  game()

})
