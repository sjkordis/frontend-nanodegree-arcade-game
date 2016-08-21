# Arcade Game Project

This assignment implements a game similar to Frogger, where a player must make his way to the water at the
top of the game board without colliding with an enemy. The game is implemented in object-oriented Javascript
using prototypal classes.

## How to Run the Game

To run the game, download the files in this repository, and open the **index.html** file in a browser.
The game will loop continuously until you close the browser.

To make the enemies move faster, increase the value of the SPEED_MULTIPLIER variable.

## How to Play the Game

The objective is to move the player from the grassy area to the water at the top of the game board. You can
move the player up, down, left, or right using the keyboard arrow keys.

Enemies will try to impede your progress. They move from left to right at random speeds.

## Scoring

Each time the player reaches the water, he earns 10 points and returns to the starting position.

Each time the player collides with an enemy, he loses 5 points and returns to the starting position.
