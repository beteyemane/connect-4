# WDI Project 1

## General Assembly Project 1: Front-End Game

### Timeframe
7 days

### Technologies used
* Javascript (ES6) & jQuery
* HTML
* CSS

## My game - Connect 4

### Game Overview
The game is encompasses the basic Connect 4 aim where the player must be the first to get four in a row either horizontally, vertically or diagonally. However, the player will also obtain points depending on how quick they win.

### Game Instructions
1. The game starts with an introductionary page where you have the option to view the instructions on the top left hand corner.
2. The next page gives you the option to play against the computer or with another player.
3. As soon as you press either of the options, the timer starts and the game is ready to play.
4. Once a player wins, a pop up appears displaying the winner and their score.

### Process
I created a basic grid layout with jQuery; 42 divs appened onto one div as the board. The player can click anywhere on the board and a class will be added to the div of the lowest available space in the column selected. The 'counters' have either a class of Red for Player One and Yellow for Player Two. For the win condition, I created a function which checks if the counter placed has another counter of the same player, next to it. If it does, it then checks that counter. This is done by pushing the player's countter in an empty array which then loops 4 times. When there are four players of the same class, the winner is announced.

### Future features
If I had more time, I would have liked to add a scoreboard and possibly different levels where the game is played against the clock. I would have also like to have added a home and back button.
