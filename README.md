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

### Challenges 

The biggest challenge was how to approach the win condition. I initially created conditional statments to determine the wins but I found that not only was the code far from DRY, but due to the length this caused issues when firing up the text editor. So I took a visual approach to figure out this problem and drew out a connect-4 board on a white board. I then had a clearer understanding on how to check for classes that are four in a row.

### Wins

Once the basic functionality was up and running, I would like to make the game a bit more fun and give players a chance to win points. I did this by firstly adding a setInterval function when the game loads which counts up every second, and if the player wins in under 20 seconds, the receive a points as 'bonus time' of 1722 points plus the time it took them to win. This is then divided from the standard points of 12730.

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

### Future features
If I had more time, I would've like to expand on my AI version of my game. Currently on the player vs computer mode, the computer generates a random move. I would like to make it so that the computer 

I would have liked to add a scoreboard and possibly different levels where the game is played against the clock. I would have also like to have added a home and back button.
