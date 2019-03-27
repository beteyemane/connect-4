# WDI Project 1

## General Assembly Project 1: Front-End Game

### Timeframe
7 days

### Technologies used
* Javascript (ES6) & jQuery
* HTML
* CSS
* Git | Github

## My game - Connect 4

![Screenshot 2019-03-27 at 12 56 05](https://user-images.githubusercontent.com/44004811/55077560-fefc3e00-508f-11e9-84eb-c16cebfc8e90.png)

## Hosted version --> beteyemane.com/connect-4

### Game Overview
The game is encompasses the basic Connect 4 aim where the player must be the first to get four in a row either horizontally, vertically or diagonally. The player will also obtain points depending on how quick they win.

### Game Journey
1. The game starts with an introductionary page where you have the option to view the instructions on the top left hand corner.

![Screenshot 2019-03-27 at 16 10 09](https://user-images.githubusercontent.com/44004811/55092898-53f97d80-50ab-11e9-9e0d-741feaf2861e.png)

2. The next page gives you the option to play against the computer or with another player.

![Screenshot 2019-03-27 at 16 10 28](https://user-images.githubusercontent.com/44004811/55092903-565bd780-50ab-11e9-988b-a2289d19c8be.png)

3. As soon as you press either of the options, the timer starts and the game is ready to play.

![Screenshot 2019-03-27 at 16 10 40](https://user-images.githubusercontent.com/44004811/55092906-58259b00-50ab-11e9-8d90-146aeb3d80dd.png)

4. Once a player wins, a pop up appears displaying the winner and their score.

![Screenshot 2019-03-27 at 16 13 12](https://user-images.githubusercontent.com/44004811/55092911-59ef5e80-50ab-11e9-921a-ddb84f9b0e4f.png)

### Process
The first step was to create a basic grid layout with jQuery. As Connect-4 traditionally is a 7 X 6 game, I opted to append 42 divs as the 'slots' onto a main div that displayed as the board. After this was set up, the next functionality I needed to add was a toggle between the 2 players. I did this by creating a function that adds a class of Red for Player One and Yellow for Player Two which would then get fired on click (on the divs). These classes reflect the colour of 'counters' that get added to diffrenciate between the two players.
 
 ```  function twoPlayer() {
    $availableSpace.addClass(playerOneTurn ? player : player2)
    playerOneTurn = !playerOneTurn
    $result.text(`${playerOneTurn ? player2 : player} wins!`)
  }
 ```
The next step was to ensure that the players can only add the counters on the lowest available space. To do so I had to create a function that takes the index of the current space that the user has clicked on and loops through that column to find a 'circle' that has a class of either Red or Yellow. If so, then the counter will be added to the next space above it.

I then moved onto the win condition. This was done by first checking if the space that has been selected has another counter of the same class in all the directions next to it. To check the directions I created an array with sums that are placed against the current space index```  const vectors = [-1, +1, columns-1, columns, columns+1]```. If it does, it then checks that counter. This is done by pushing the player's counter in an empty array which then loops 4 times. When there are four counters of the same class in the array, the winner is determined.

```
  function getFourCells(index, vector) {
    cellsToCheck = []
    for (let i = 0; i < 4; i++) {
      cellsToCheck.push($cells.eq(index+(vector * i)))
    }
    return cellsToCheck
  }
 ```

##Features

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
