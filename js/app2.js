$(() => {

  //variables
  let gameOver = false
  const row = 6
  const column = 7
  const $board = $('.board')
  const player1 = 'red'
  const player2 = 'blue'
  let currentTurn = 1


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

    // function findNoCircle(c) {
    //   const circle = $(`.c[data-column='${c}']`)
    //   console.log(circle.length)
    //   for (let i = circle.length - 1; i >= 0; i--) {
    //     const $cir = $(circle[i])
    //     if($cir.hasClass('none')) {
    //       return $cir
    //     }
    //     return null
    //   }
    // }

    $board.on('mouseenter', '.column.none', function(e) {
      $(e.target).addClass('shadow-red')
      // const c = $(this).data('column')
      // const $noCircle = findNoCircle(c)
      // $noCircle.addClass('shadow-red')
    })


    $board.on('mouseleave', '.column.none', function() {
      $('.column').removeClass('shadow-red')
    })
  }

  function game () {
    if(currentTurn === 1) {
      redClick()
      currentTurn++
    } else {
      yellowClick()
      currentTurn--
    }
  }

  // create an array out of divs and looop

  function redClick() {
    $board.on('click', '.column.none', function(e) {
      console.log(e.target)
      $(e.target).addClass('red')
    })
  }

  function yellowClick() {
    $board.on('click', '.column.none', function(e) {
      console.log(e.target)
      $(e.target).addClass('yellow')
    })
  }

  game()

  grid()

  // var myArray = new Array()
  // $('div.column.none').each(function(){
  //   myArray.push($(this))
  // })
  // console.log(myArray)


  //event listeners


  // // click & add class


  // alternate between two players
  // win condition



})
