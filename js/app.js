$(() => {

  const $world = $('.world')
  const $square = $('div .square')
  const $empty = $('.empty')

  const group = [
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
  ]

  //add shapes


  function checkW () {
    $world.text('')
    group.forEach(function(y){
      console.log(y)
      y.forEach(function(x){
        console.log(x)
        if(y, x === 0) {
          $world.append($square.clone())
        } else {
          $world.append($empty.clone())
        }
      })
    })
  }

  checkW()

  //add event listener to move the shapes down

  //win condition
  // - if line is filled then remove line
  // - shift tetrimidos down
  // - add scores

})
