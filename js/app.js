// Constants
var colWidth = 101;
var rowHeight = 83;
var numRows = 6;
var numCols = 5;

var numOfEnemies = 5;
var numOfPlayerCharacters = 5;
var numOfObstacles = 3;
var numOfItems = 2;

var minX = 0;
var minXEnemy = minX - colWidth;
var minXPlayer = minX;
var minXSelector = minXPlayer;
var minXObstacle = minX;
var minXItem = minX;

var minY = 0;
var minYEnemy = minY + rowHeight;
var minYPlayer = minY;
var minYSelector = maxY - rowHeight*3;
var minYObstacle = minY + rowHeight*4;
var minYItem = minY + rowHeight;

var maxX = colWidth*numCols;
var maxXEnemy = maxX;
var maxXPlayer = maxX - colWidth;
var maxXSelector = maxXPlayer;
var maxXObstacle = maxX;
var maxXItem = maxX;

var maxY = rowHeight*numRows;
var maxYEnemy = rowHeight*4;
var maxYPlayer = maxY - rowHeight;
var maxYSelector = maxY - rowHeight*3;
var maxYObstacle = maxY - rowHeight*2;
var maxYItem = rowHeight*3;

var iniXPlayer = Math.floor(numCols / 2) * colWidth;
var iniYPlayer = maxYPlayer;

var iniXSelector = iniXPlayer;
var iniYSelector = maxY - rowHeight*3;

var playerSprites = [];
playerSprites[0] = 'images/char-boy.png';
playerSprites[1] = 'images/char-cat-girl.png';
playerSprites[2] = 'images/char-horn-girl.png';
playerSprites[3] = 'images/char-pink-girl.png';
playerSprites[4] = 'images/char-princess-girl.png';

// Game Mode
// player-selection = player selection screen
// main-game = main game screen

/**********************************************************
 * Enemy Class
 **********************************************************/
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 0;
    this.speed = 20;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var dx = this.speed * dt;
    if (this.x + dx > maxXEnemy) {
        this.x = minXEnemy;
    } else if (this.x + dx < minXEnemy) {
        this.x = maxXEnemy;
    } else {
        this.x += dx;
    }

    // collision detection here
    if (this.y !== player.y) return;

    var spriteEnemy = Resources.get(this.sprite);
    var spritePlayer = Resources.get(player.sprite);
    var x0Enemy = this.x;
    var xMEnemy = x0Enemy + spriteEnemy.width;
    var x0Player = player.x;
    var xMPlayer = x0Player + spritePlayer.width;

    if (xMPlayer <= x0Enemy || x0Player >= xMEnemy) return;

    gameScore -= 50;
    if (gameScore < 0) gameScore = 0;
    
    isGameReset = true;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // ctx globally provided by engine.js
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**********************************************************
 * Player Class
 **********************************************************/
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 0;
    this.reset();
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
    if (player.y === minYPlayer) {

        gameScore += 200;
    
        isGameReset = true;
    }
};

Player.prototype.render = function() {
    // ctx globally provided by engine.js
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
    var dx = colWidth;
    var dy = rowHeight;
    if (keyPressed == 'left') {
        if (this.x - dx >= minXPlayer) {
            this.x -= dx;
        }
    } else if (keyPressed == 'right') {
        if (this.x + dx <= maxXPlayer) {
            this.x += dx;
        }
    } else if (keyPressed == 'up') {
        if (this.y - dy >= minYPlayer) {
            this.y -= dy;
        }
    } else if (keyPressed == 'down') {
        if (this.y + dy <= maxYPlayer) {
            this.y += dy;
        }
    }
};

Player.prototype.reset = function() {
    this.x = iniXPlayer;
    this.y = iniYPlayer;
};

/**********************************************************
 * Selector Class
 **********************************************************/
// Defines selector object
// used during player selection
var Selector = function() {
    this.sprite = 'images/selector.png';
    this.x = iniXSelector;
    this.y = iniYSelector;
};

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Selector.prototype.handleInput = function(keyPressed) {
    var dx = colWidth;
    var dy = rowHeight;
    if (keyPressed == 'left') {
        if (this.x - dx >= minXSelector) {
            this.x -= dx;
        }
    } else if (keyPressed == 'right') {
        if (this.x + dx <= maxXSelector) {
            this.x += dx;
        }
    } else if (keyPressed == 'up') {
        if (this.y - dy >= minYSelector) {
            this.y -= dy;
        }
    } else if (keyPressed == 'down') {
        if (this.y + dy <= maxYSelector) {
            this.y += dy;
        }
    }
};

Selector.prototype.reset = function() {
    this.x = iniXSelector;
    this.y = iniYSelector;
};

// Selectee Class
// Defines selectee (player to be selected) object
// used during player selection
var Selectee = function() {
    this.sprite = 'images/star.png';
    this.x = iniXSelector;
    this.y = iniYSelector;
};

Selectee.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Selectee.prototype.handleInput = function(keyPressed) {
    var dx = colWidth;
    var dy = rowHeight;
    if (keyPressed == 'enter') {
        if (this.x === selector.x && this.y === selector.y)
        {
            player.sprite = this.sprite;
            gameMode = 'main-game';
        }
    }
};

/**********************************************************
 * Obstacle Class
 **********************************************************/
 // represents obstacles that cause loss of points
 // when touched by player
var Obstacle = function() {
    this.sprite = 'images/rock.png';
    this.x = 0;
    this.y = 0;
    this.reset();
};

// Collision detection
Obstacle.prototype.update = function() {

    if (this.y !== player.y) return;

    var spriteObstacle = Resources.get(this.sprite);
    var spritePlayer = Resources.get(player.sprite);
    var x0Obstacle = this.x;
    var xMObstacle = x0Obstacle + spriteObstacle.width;
    var x0Player = player.x;
    var xMPlayer = x0Player + spritePlayer.width;

    if (xMPlayer <= x0Obstacle || x0Player >= xMObstacle) return;

    gameScore -= 25;
    if (gameScore < 0) gameScore = 0;

    isGameReset = true;
};

Obstacle.prototype.reset = function() {
    var minC = minXObstacle/colWidth;
    var minR = minYObstacle/rowHeight;
    var maxC = maxXObstacle/colWidth;
    var maxR = maxYObstacle/rowHeight;

    var rndC = Math.floor((Math.random() * (maxC - minC + 1)) + minC);
    var rndR = Math.floor((Math.random() * (maxR - minR + 1)) + minR);

    this.x = rndC*colWidth;
    this.y = rndR*rowHeight;
};

Obstacle.prototype.render = function() {
    // ctx globally provided by engine.js
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**********************************************************
 * Item Class
 **********************************************************/
 // represents items that increase points when
 // touched by the player
var Item = function() {
    this.sprite = 'images/gem-blue.png';
    this.x = 0;
    this.y = 0;
    this.isVisible = true;
    this.reset();
};

// Collision detection
Item.prototype.update = function() {

    if (!this.isVisible) return;

    if (this.y !== player.y) return;

    var spriteItem = Resources.get(this.sprite);
    var spritePlayer = Resources.get(player.sprite);
    var x0Item = this.x;
    var xMItem = x0Item + spriteItem.width;
    var x0Player = player.x;
    var xMPlayer = x0Player + spritePlayer.width;

    if (xMPlayer <= x0Item || x0Player >= xMItem) return;

    gameScore += 100;

    this.isVisible = false;
};

Item.prototype.reset = function() {
    var minC = minXItem/colWidth;
    var minR = minYItem/rowHeight;
    var maxC = maxXItem/colWidth;
    var maxR = maxYItem/rowHeight;

    var rndC = Math.floor((Math.random() * (maxC - minC + 1)) + minC);
    var rndR = Math.floor((Math.random() * (maxR - minR + 1)) + minR);

    this.x = rndC*colWidth;
    this.y = rndR*rowHeight;

    this.isVisible = true;
};

Item.prototype.render = function() {
    if (!this.isVisible) return;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**********************************************************
 * Game Initialization
 **********************************************************/

// game initialization
gameMode = 'player-selection';

// game state
// active - game is running
// 
gameState = 'active';

allSelectees = [];
for (var i=0; i<numOfPlayerCharacters; i++) {
    allSelectees[i] = new Selectee();
    allSelectees[i].x = i * colWidth;
    allSelectees[i].sprite = playerSprites[i];
}

selector = new Selector();

allItems = [];
for (var i=0; i<numOfItems; i++) {
    allItems[i] = new Item();
}

allEnemies = [];
for (var i=0; i<numOfEnemies; i++) {
    var row = (i % 3) + 1;
    var multiplier = (i % 5) + 1;
    allEnemies[i] = new Enemy();
    allEnemies[i].y = row * rowHeight;
    allEnemies[i].speed *= multiplier;
}

allObstacles = [];
for (var i=0; i<numOfObstacles; i++) {
    allObstacles[i] = new Obstacle();
}

player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'p'
    };

    if (gameMode == 'player-selection')
    {
        selector.handleInput(allowedKeys[e.keyCode]);
        allSelectees.forEach(function(selectee) {
            selectee.handleInput(allowedKeys[e.keyCode]);
        });
    }
    else if (gameMode == 'main-game')
    {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
