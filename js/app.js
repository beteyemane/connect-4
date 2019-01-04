$(() => {

  //variables
  let gameOver = false
  const row = 6
  const column = 7
  const $board = $('.board')

  //append grid & append coloumn to row & append row to board
  //loop to create grid
  function grid() {
    for (let r = 0; r < row; r++) {
      const $row = $('<div>')
        .addClass('row')
      for (let c = 0; c < column; c++) {
        const $col = $('<div>')
          .addClass('column')
        $row.append($col)
      }
      $board.append($row)
    }
  }

  grid()


  //event listeners
  //mouseenter & add class
  //mouseleave & remove class
  //alternate between two players
  //win condition

})
