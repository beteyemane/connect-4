$(() => {

  //variables
  let gameOver = false
  const row = 6
  const column = 7
  const $board = $('.board')
  let player = 1


  //append grid & append coloumn to row & append row to board
  //loop to create grid
  //add class of 'none' to column for styling when there isn't a counter
  function grid() {
    for (let r = 0; r < row; r++) {
      const $row = $('<div>')
        .addClass('row')
      for (let c = 0; c < column; c++) {
        const $col = $('<div>')
          .addClass('column none')
          .attr('data-column', c)
          .attr('data-row', r)
        $row.append($col)
      }
      $board.append($row)
    }

    function findNoCircle(c) {
      const circle = $(`.column[data-column='${c}']`)
      for (let i = circle.length - 1; i >= 0; i--) {
        const $cir = $(circle[i])
        if($cir.hasClass('none')) {
          return $cir
        }
      }
      return null
    }
    //create shadow to show next move
    // $board.on('mouseenter', '.column.none', function() {
    //   const c = $(this).data('column')
    //   const $noCircle = findNoCircle(c)
    //   $noCircle.addClass('shadow-red')
    // })
    //
    // $board.on('mouseleave', '.column.none', function() {
    //   $('.column').removeClass('shadow-red')
    // })

    // --------------
    // //create shadow to show next move
    // $board.on('mouseenter', '.column.none', function() {
    //   const c = $(this).data('column')
    //   const $noCircle = findNoCircle(c)
    //   //alternate between two players
    //   if(player === 1) {
    //     $noCircle.addClass('shadow-red')
    //   } else {
    //     $noCircle.addClass('shadow-yellow')
    //   }
    // })
    //
    // $board.on('mouseleave', '.column.none', function() {
    //   //alternate between two players
    //   if(player === 1) {
    //     $('.column').removeClass('shadow-red')
    //   } else {
    //     $('.column').removeClass('shadow-yellow')
    //   }
    // })

    function redClick() {
      $board.on('click', '.column.none', function() {
        const c = $(this).data('column')
        const $lastCell = findNoCircle(c)
        $lastCell.removeClass('none')
        $lastCell.addClass('red')
      })
    }
    function yellowClick() {
      $board.on('click', '.column.none', function() {
        const c = $(this).data('column')
        const $lastCell = findNoCircle(c)
        $lastCell.removeClass('none')
        $lastCell.addClass('yellow')
      })
    }
    // alternate between two players
    function game () {
      if(player === 1) {
        redClick()
        player++
      } else {
        yellowClick()
        player--
      }
    }

    // win condition

    // check direction

    game()
  }

  grid()

})
