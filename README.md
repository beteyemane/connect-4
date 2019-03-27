# WDI Project 1

## General Assembly Project 1: Front-End Game

### Timeframe
7 days

### Technologies used
* Javascript (ES6) & jQuery
* HTML
* CSS

## My game - Connect 4

![Screenshot 2019-03-27 at 12 56 05](https://user-images.githubusercontent.com/44004811/55077560-fefc3e00-508f-11e9-84eb-c16cebfc8e90.png)

### Game Overview
The game is encompasses the basic Connect 4 aim where the player must be the first to get four in a row either horizontally, vertically or diagonally. The player will also obtain points depending on how quick they win.

### Game Journey
1. The game starts with an introductionary page where you have the option to view the instructions on the top left hand corner.
2. The next page gives you the option to play against the computer or with another player.
3. As soon as you press either of the options, the timer starts and the game is ready to play.
4. Once a player wins, a pop up appears displaying the winner and their score.

### Process
The first step was to create a basic grid layout with jQuery. As Connect-4 traditionally is a 7 X 6 game, I opted to append 42 divs as the 'slots' onto a main div that displayed as the board. After this was set up, the next functionality I needed to add was a toggle between the 2 players. I did this by creating a function that adds a class of Red for Player One and Yellow for Player Two which would then get fired on click (on the divs). These classes reflect the colour of 'counters' that get added to diffrenciate between the two players.
 
 ```  function twoPlayer() {
    $availableSpace.addClass(playerOneTurn ? player : player2)
    playerOneTurn = !playerOneTurn
    $result.text(`${playerOneTurn ? player2 : player} wins!`)
  }
 ```
The next step was to ensure that the players can only add the counters on the lowest available space. To do so 
```
  function findAvailableSpace(circle) {
    // console.log(circle)
    space = $(`.circle[data-circle='${circle}']`)
    for (let i =  circle; i <= width ; i += columns) {
      $space = $(`.circle[data-circle='${i + columns}']`)
      $nextSpace = $(`.circle[data-circle='${i + columns + columns}']`)
      if (circle >= 35) {
        return space
      }
      if($nextSpace.hasClass('Red') || $nextSpace.hasClass('Yellow') || i + columns + columns > width) {
        if($space.hasClass('Red') || $space.hasClass('Yellow')) {
          return space
        }
        return $space
      }
    }
    return null
  }
```

For the win condition, I created a function which checks if the counter placed has another counter of the same player, next to it. If it does, it then checks that counter. This is done by pushing the player's countter in an empty array which then loops 4 times. When there are four players of the same class, the winner is announced.

```
  function getFourCells(index, vector) {
    cellsToCheck = []
    for (let i = 0; i < 4; i++) {
      cellsToCheck.push($cells.eq(index+(vector * i)))
    }
    return cellsToCheck
  }
 ```

Features

Scores
```
  function scores() {
    if(time < 20) {
      $bonusTime.text(--time + 1722)
      $bonusWin.text(1000)
      $score.text(Math.round(12730 / --time + 1722))
    } else  {
      $bonusTime.text(--time + 1722)
      $bonusWin.text(0)
      clearInterval(seconds)
      $score.text(Math.round(12730 / --time + 1722))
    }
  }
 ```
 
 Player vs Computer
 ```
  function getComputerNo(vectors) {
    //getting a random free space
    const randomIndex = findAvailableSpace(vectors[Math.floor(Math.random() * vectors.length)])
    setTimeout(function() {
      randomIndex.addClass(player2)
    }, 1000)
    randomIndex.removeClass('none')
    $result.text(`${playerOneTurn ? player : player2} wins!`)
    checkForWin(index)
  }
```

### Future features
If I had more time, I would have liked to add a scoreboard and possibly different levels where the game is played against the clock. I would have also like to have added a home and back button.
