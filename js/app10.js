$(() => {
//horizontal win condition working
  // -----------------------------------------------------VARIABLES--------------------------------------------------------------

  let player = 1
  const width = 7
  let $col = 0

  // -----------------------------------------------------MAKE GRID--------------------------------------------------------------

  const $grid = $('.grid')
  $grid.attr('data-width', width)
  for(let i = 0; i<width*6; i++) {
    $col = $('<div>')
      .addClass('column none')
      // .addClass('num' + i)
      .attr('data-column', i)
    $grid.append($col)
  }

  // -----------------------------------------------------FIND LAST SQUARE-------------------------------------------------------

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

  // check horizontal

  //when you click on 0, 1, 2, 3 and they have class of red, display winner
  let index = 0
  const row = []

  console.log(row)

  //empty array
  const row1 = []

  //click on circle
  $grid.on('click', '.column', function() {
    index = $(this).index()
    //push to array
    row.push(index)
    if (row.includes(0) && row.includes(1) && row.includes(2) && row.includes(3)) {
      console.log('you win')
    } else {
      return null
    }
  })




  // $grid.on('click', '.column', function() {
  //   $('div.column').each(function(index) {
  //     const i = $(this).index()
  //     if (i === 0) {
  //       console.log('winner')
  //     }
  //   })
  // })
  // check vertical

  // check diagonals
  // - TR to BL

  // - TL to BR

  game()

})
