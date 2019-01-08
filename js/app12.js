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
    const space = $(`.column[data-column='${c}']`)
    let $id = c

    const directions = [- columns - 1, - columns, - columns + 1, - 1, 0, + 1, + columns - 1, + columns, + columns + 1  ]
    // console.log(directions)

    // console.log($id - columns - 1, $id - columns, $id - columns + 1, $id -1,  17, $id + 1, $id + columns - 1, $id + columns, $id + columns + 1)


    function checkWin(c) {
      const space = $(`.column[data-column='${c}']`)
      let $id = c
      for (let i = 0; i < directions.length; i++) {
        const list = []
        console.log(list)
        const $newID = $id + directions[i]
        console.log($newID)
        const $newData = $(`.column[data-column='${$newID}']`)
        console.log($newData)
        if(player === 'Red' && $newData.hasClass('red') || player === 'Yellow' && $newData.hasClass('yellow')) {
          list.push(player)
        } else {
          return
        }
        if(list.length === 4) {
          console.log('game over')
        }
      }
    }
    checkWin(c)
    // for (let j =  0; j <= width[j] ; j++) {
    //   // console.log(player)
    //     // console.log('hey')
    //   }
    //   }
    // }

    // function checkWin(c) {
    //   const space = $(`.column[data-column='${c}']`)
    //   let $id = c
    //   console.log($id)
    //   for(let i = $id; i <= width; i++) {
    //     const $newID = $id + directions[i]
    //     console.log($newID)
    //     const $newData = $(`.column[data-column='${$newID}']`)
    //     // console.log($newData)
    //   }
    //   for (let i = 0; i < directions.length; i++) {
    //     let list = []
    //   }
    // }
    //
    // checkWin(c)
    for (let i =  c; i <= width ; i += columns) {

      const $space = $(`.column[data-column='${i + columns}']`)
      const $nextSpace = $(`.column[data-column='${i + columns + columns}']`)
      // console.log('for loop', $space, i + columns)
      if($nextSpace.hasClass('red') || $nextSpace.hasClass('yellow') || i + columns + columns > width) {
        if($space.hasClass('red') || $space.hasClass('yellow')) {

          return space
        }
        return $space
      }
    }
    return null
  }
  //---------------------------------------------------------------------------

  //-------------------------------------------------------------------------GAME-------------------------------------------------------------------------------------

  function game() {
    $turn.text(`${player}'s turn!'`)
    $grid.on('click', '.column.none', function() {
      const c = $(this).data('column')

      const $availableSpace = findAvailableSpace(c)
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
      // if ((c - (columns - 1 - 1)).hasClass('red || yellow')) {
      //   console.log('HI')
      //
      // }
    })
  }

  game()

})
