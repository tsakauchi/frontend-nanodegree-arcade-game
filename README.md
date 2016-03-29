#frontend-nanodegree-arcade-game
This repository contains a website for Udacity Frontend Nanodegree Project 3 Arcade Game.

## About this project
The objective of this project is to learn Object Oriented JavaScript techniques (class declaration, inheritance, delegation, and instantiation of objects) and use them to manipulate HTML5 canvas images (via requestAnimationFrame) and implement a simple arcade game clone.

## How do I run this project?
You can run the game by simply opening index.html. Alternatively, you can visit the [GitHub project page for this project](http://tsakauchi.github.io/frontend-nanodegree-arcade-game/).

## How do I play the game?
1. Simply open index.html with Chrome Web Browser.
2. Once you open index.html, you are presented with 5 playable characters.
3. Select one character by moving the cursor left and right using
   [LEFT] and [RIGHT] keys.
4. To confirm selection press [ENTER].
5. Once the character is chosen, the game starts.
6. The objective of the game is to move the character to the water seen
at the top of the window while avoiding the rocks and ladybugs that
appear on the screen while collecting as much points as possible.

## Hint
* You can move the character using [LEFT], [RIGHT], [UP], or [DOWN] keys.
* Touching the rocks will SUBTRACT 25 points from the total score.
* Touching the ladybugs will SUBTRACT 50 points from the total score.
* Touching the rocks or ladybugs will RESET the game so that your
  character will return to its initial position.
* Collecting gems will ADD 100 points to the total score.
* Reaching the water will ADD 200 points to the total score.

## About the features implemented
This project implements the following features:
* Uses requestAnimationFrame to update HTML5 canvas images to display and animate game sprites.
* Uses object-oriented JavaScript to define and use classes such as Enemy, Player, Obstacle, Item etc...
* Uses key press event handler to detect to user input via key press.
