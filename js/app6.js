$(() => {

  //variables
  let gameOver = false
  const row = 6
  const column = 7
  const $board = $('.board')
  let player = 'red'
  let winRow = false
  let winColumn= false
  let winDiagonal = false



  //append grid & append coloumn to row & append row to board
  //loop to create grid
  //add class of 'none' to each circle so we will know which one is free - remove class once clicked on circle etc
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
    //must be able to locate the circle that doesnt have a "counter"
    function findEmptyCircle(c) {
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
        if (gameOver) return
        const c = $(this).data('column')
        const $lastCircle = findEmptyCircle(c)
        $lastCircle.removeClass('none')
        // alternate between two players
        if(player === 'red') {
          $lastCircle.addClass('red')
          player = 'yellow'
        } else {
          $lastCircle.addClass('yellow')
          player = 'red'
        }
        const winner = checkForWinner(
          $lastCircle.data('row'),
          $lastCircle.data('column')
        )
        if (winner) {
          gameOver = true
          alert('I win')
          $('.column.none').removeClass('none')
          return
        }
      })
    }
    // check for winner
    function checkForWinner(row, column) {

      function $getCell(i, j) {
        return $(`.column[data-row='${i}'][data-column='${j}']`)
      }

      function checkDirection(direction) {
        let total = 0
        let i = row + direction.i
        let j = column + direction.j
        let $next = $getCell(i, j)
        while (i >= 0 &&
          i < row &&
          j >= 0 &&
          j < column &&
          $next.data('player') === player
        ) {
          total++
          i += direction.i
          j += direction.j
          $next = $getCell(i, j)
        }
        return total
      }

      function checkWin(directionA, directionB) {
        const total = 1 +
        checkDirection(directionA) +
        checkDirection(directionB)
        if (total >= 4) {
          return player
        } else {
          return null
        }
      }

      function checkDiagonalBLtoTR() {
        return checkWin({i: 1, j: -1}, {i: 1, j: 1})
      }

      function checkDiagonalTLtoBR() {
        return checkWin({i: 1, j: 1}, {i: -1, j: -1})
      }

      function checkVerticals() {
        return checkWin({i: -1, j: 0}, {i: 1, j: 0})
      }

      function checkHorizontals() {
        return checkWin({i: 0, j: -1}, {i: 0, j: 1})
      }

      return checkVerticals() ||
        checkHorizontals() ||
        checkDiagonalBLtoTR() ||
        checkDiagonalTLtoBR()
    }
    // check rows


    // check coloumns

    // check diagonals
    // - TR to BL

    // - TL to BR
    game()
  }

  grid()

})
