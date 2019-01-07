//horizontals finished
$(() => {

  //---------------------------------------------------------------------VARIABLES------------------------------------------------------------------------------------

  let player = 1
  const width = 7
  let $col = 0
  let index = 0
  const row = []

  //---------------------------------------------------------------------MAKE GRID------------------------------------------------------------------------------------


  const $grid = $('.grid')
  $grid.attr('data-width', width)
  for(let i = 0; i<width*6; i++) {
    $col = $('<div>')
      .addClass('column none')
      // .addClass('num' + i)
      .attr('data-column', i)
    $grid.append($col)
  }

  //---------------------------------------------------------------------FIND LAST SPACE------------------------------------------------------------------------------

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

  //-------------------------------------------------------------------------GAME-------------------------------------------------------------------------------------


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

  //---------------------------------------------------------------------WIN CONDITION--------------------------------------------------------------------------------

  //when you click on 0, 1, 2, 3 and they have class of red, display winner
  //click on circle
  $grid.on('click', '.column', function() {
    index = $(this).index()
    //push to array
    row.push(index)
    console.log(row)
    //-------------------------------------------------------------------check horizontal-----------------------------------------------------------------------------
    //---------------------------------------------------------------------row one------------------------------------------------------------------------------------

    if (row.includes(0) && row.includes(1) && row.includes(2) && row.includes(3)) {
      console.log('you win')
    } else if (row.includes(1) && row.includes(2) && row.includes(3) && row.includes(4)) {
      console.log('you win')
    } else if (row.includes(2) && row.includes(3) && row.includes(4) && row.includes(5)) {
      console.log('you win')
    } else if (row.includes(3) && row.includes(4) && row.includes(5) && row.includes(6)) {
      console.log('you win')
    } else if (row.includes(4) && row.includes(5) && row.includes(6) && row.includes(7)) {
      console.log('you win')
    } else if (row.includes(5) && row.includes(6) && row.includes(7) && row.includes(8)) {
      console.log('you win')
    } else if (row.includes(6) && row.includes(7) && row.includes(8) && row.includes(9)) {
      console.log('you win')

      //---------------------------------------------------------------------row two----------------------------------------------------------------------------------

    } else if (row.includes(7) && row.includes(8) && row.includes(9) && row.includes(10)) {
      console.log('you win')
    } else if (row.includes(8) && row.includes(9) && row.includes(10) && row.includes(11)) {
      console.log('you win')
    } else if (row.includes(9) && row.includes(10) && row.includes(11) && row.includes(12)) {
      console.log('you win')
    } else if (row.includes(10) && row.includes(11) && row.includes(12) && row.includes(13)) {
      console.log('you win')
    } else if (row.includes(11) && row.includes(12) && row.includes(13) && row.includes(14)) {
      console.log('you win')
    } else if (row.includes(12) && row.includes(13) && row.includes(14) && row.includes(15)) {
      console.log('you win')
    } else if (row.includes(13) && row.includes(14) && row.includes(15) && row.includes(16)) {
      console.log('you win')

      //---------------------------------------------------------------------row three--------------------------------------------------------------------------------

    } else if (row.includes(14) && row.includes(15) && row.includes(16) && row.includes(17)) {
      console.log('you win')
    } else if (row.includes(15) && row.includes(16) && row.includes(17) && row.includes(18)) {
      console.log('you win')
    } else if (row.includes(16) && row.includes(17) && row.includes(18) && row.includes(19)) {
      console.log('you win')
    } else if (row.includes(17) && row.includes(18) && row.includes(19) && row.includes(20)) {
      console.log('you win')
    } else if (row.includes(18) && row.includes(19) && row.includes(20) && row.includes(21)) {
      console.log('you win')
    } else if (row.includes(19) && row.includes(20) && row.includes(21) && row.includes(22)) {
      console.log('you win')
    } else if (row.includes(20) && row.includes(21) && row.includes(22) && row.includes(23)) {
      console.log('you win')

      //---------------------------------------------------------------------row four--------------------------------------------------------------------------------

    } else if (row.includes(21) && row.includes(22) && row.includes(23) && row.includes(24)) {
      console.log('you win')
    } else if (row.includes(22) && row.includes(23) && row.includes(24) && row.includes(25)) {
      console.log('you win')
    } else if (row.includes(23) && row.includes(24) && row.includes(25) && row.includes(26)) {
      console.log('you win')
    } else if (row.includes(24) && row.includes(25) && row.includes(26) && row.includes(27)) {
      console.log('you win')
    } else if (row.includes(25) && row.includes(26) && row.includes(27) && row.includes(28)) {
      console.log('you win')
    } else if (row.includes(26) && row.includes(27) && row.includes(28) && row.includes(29)) {
      console.log('you win')
    } else if (row.includes(27) && row.includes(28) && row.includes(29) && row.includes(30)) {
      console.log('you win')

      //---------------------------------------------------------------------row five--------------------------------------------------------------------------------

    } else if (row.includes(28) && row.includes(29) && row.includes(30) && row.includes(31)) {
      console.log('you win')
    } else if (row.includes(29) && row.includes(30) && row.includes(31) && row.includes(32)) {
      console.log('you win')
    } else if (row.includes(30) && row.includes(31) && row.includes(32) && row.includes(33)) {
      console.log('you win')
    } else if (row.includes(31) && row.includes(32) && row.includes(33) && row.includes(34)) {
      console.log('you win')
    } else if (row.includes(32) && row.includes(33) && row.includes(34) && row.includes(35)) {
      console.log('you win')
    } else if (row.includes(33) && row.includes(34) && row.includes(35) && row.includes(36)) {
      console.log('you win')
    } else if (row.includes(34) && row.includes(35) && row.includes(36) && row.includes(37)) {
      console.log('you win')

      //---------------------------------------------------------------------row six----------------------------------------------------------------------------------

    } else if (row.includes(35) && row.includes(36) && row.includes(37) && row.includes(38)) {
      console.log('you win')
    } else if (row.includes(36) && row.includes(37) && row.includes(38) && row.includes(39)) {
      console.log('you win')
    } else if (row.includes(37) && row.includes(38) && row.includes(39) && row.includes(40)) {
      console.log('you win')
    } else if (row.includes(38) && row.includes(39) && row.includes(40) && row.includes(41)) {
      console.log('you win')
    }
  })


  //---------------------------------------------------------------------check vertical-------------------------------------------------------------------------------

  //---------------------------------------------------------------------check diagonals------------------------------------------------------------------------------
  //------------------------------------------------------------------------TL to BR----------------------------------------------------------------------------------
  //------------------------------------------------------------------------TR to BL----------------------------------------------------------------------------------

  game()

})
