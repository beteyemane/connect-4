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

    function game() {
      $board.on('click', '.column.none', function() {
        const c = $(this).data('column')
        const $lastCell = findNoCircle(c)
        $lastCell.removeClass('none')
        // alternate between two players
        if(player === 1) {
          $lastCell.addClass('red')
          player++
        } else {
          $lastCell.addClass('yellow')
          player--
        }
      })
    }
    game()


    // win condition



    // check direction

  }

  grid()

})
