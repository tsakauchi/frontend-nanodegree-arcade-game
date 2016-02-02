/**********************************************************
 * app.js
 * Contains class definitions and initialization routine
 **********************************************************/

 /**********************************************************
 * Constants
 **********************************************************/
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

/**********************************************************
 * Enemy Class
 **********************************************************/

/**
 * @description Represents an enemy our player must avoid
 * @constructor
 */
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 0;
    this.speed = 20;
};

/**
* @description Update the enemy's position based on time delta.
* Responsible for calculating current position, collision detection,
* game score manipulation, and triggering game reset.
* @param {number} dt, time delta between ticks
*/
Enemy.prototype.update = function(dt) {

    // calculate current position
    var dx = this.speed * dt;
    if (this.x + dx > maxXEnemy) {
        this.x = minXEnemy;
    } else if (this.x + dx < minXEnemy) {
        this.x = maxXEnemy;
    } else {
        this.x += dx;
    }

    // collision detection
    if (this.y !== player.y) return;

    var spriteEnemy = Resources.get(this.sprite);
    var spritePlayer = Resources.get(player.sprite);
    var x0Enemy = this.x;
    var xMEnemy = x0Enemy + spriteEnemy.width;
    var x0Player = player.x;
    var xMPlayer = x0Player + spritePlayer.width;

    if (xMPlayer <= x0Enemy || x0Player >= xMEnemy) return;

    // game score manipulation
    gameScore -= 50;
    if (gameScore < 0) gameScore = 0;
    
    // trigger game reset
    isGameReset = true;
};

/**
* @description Draw the enemy on the screen.
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**********************************************************
 * Player Class
 **********************************************************/

/**
 * @description Represents a player controlled by the user
 * @constructor
 */
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 0;
    this.reset();
};


/**
* @description Evaluates player state based on its position.
* Responsible for collision detection, game score manipulation,
* and triggering game reset.
*/
Player.prototype.update = function() {

    // collision detection
    // (did I 'collide' with the goal?)
    if (this.y != minYPlayer) return;

    // game score manipulation
    gameScore += 200;

    // trigger game reset
    isGameReset = true;
};

/**
* @description Draw the player on the screen.
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Handle user input
* Responsible for calculating current position based on
* user input.
* @param {string} keyPressed, string that describes key pressed
*/
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

/**
* @description Reset player state.
*/
Player.prototype.reset = function() {
    this.x = iniXPlayer;
    this.y = iniYPlayer;
};

/**********************************************************
 * Selector Class
 **********************************************************/

/**
 * @description Represents a selector controlled by the user
 * used during player selection
 * @constructor
 */
var Selector = function() {
    this.sprite = 'images/selector.png';
    this.x = iniXSelector;
    this.y = iniYSelector;
};

/**
* @description Draw the player on the screen.
*/
Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Handle user input
* Responsible for calculating current position based on
* user input.
* @param {string} keyPressed, string that describes key pressed
*/
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

/**
* @description Reset selector state.
*/
Selector.prototype.reset = function() {
    this.x = iniXSelector;
    this.y = iniYSelector;
};

/**********************************************************
 * Selectee Class
 **********************************************************/

/**
 * @description Represents a selectee (player to be selected)
 * by the selector. Used during player selection.
 * @constructor
 */
var Selectee = function() {
    this.sprite = 'images/star.png';
    this.x = iniXSelector;
    this.y = iniYSelector;
};

/**
* @description Draw the player on the screen.
*/
Selectee.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Handle user input
* Responsible for calculating current position based on
* user input.
* @param {string} keyPressed, string that describes key pressed
*/
Selectee.prototype.handleInput = function(keyPressed) {
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
 
 /**
 * @description Represents an obstacle that causes loss of
 * points when touched by the player.
 * @constructor
 */
var Obstacle = function() {
    this.sprite = 'images/rock.png';
    this.x = 0;
    this.y = 0;
    this.reset();
};

/**
* @description Responsible for collision detection,
* game score manipulation, and triggering game reset.
*/
Obstacle.prototype.update = function() {

    // collision detection
    if (this.y !== player.y) return;

    var spriteObstacle = Resources.get(this.sprite);
    var spritePlayer = Resources.get(player.sprite);
    var x0Obstacle = this.x;
    var xMObstacle = x0Obstacle + spriteObstacle.width;
    var x0Player = player.x;
    var xMPlayer = x0Player + spritePlayer.width;

    if (xMPlayer <= x0Obstacle || x0Player >= xMObstacle) return;

    // game score manipulation
    gameScore -= 25;
    if (gameScore < 0) gameScore = 0;

    // game reset trigger
    isGameReset = true;
};

/**
* @description Reset obstacle state.
* This also calculates the initial position of the obstacle
* using random number.
*/
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

/**
* @description Draw the obstacle on screen
*/
Obstacle.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**********************************************************
 * Item Class
 **********************************************************/
 
 /**
 * @description Represents an item that causes points
 * to increase when touched by the player.
 * @constructor
 */
var Item = function() {
    this.sprite = 'images/gem-blue.png';
    this.x = 0;
    this.y = 0;
    this.isVisible = true;
    this.reset();
};

/**
* @description Responsible for collision detection,
* game score manipulation, and object visibility.
*/
Item.prototype.update = function() {

    // collision detection
    if (!this.isVisible) return;

    if (this.y !== player.y) return;

    var spriteItem = Resources.get(this.sprite);
    var spritePlayer = Resources.get(player.sprite);
    var x0Item = this.x;
    var xMItem = x0Item + spriteItem.width;
    var x0Player = player.x;
    var xMPlayer = x0Player + spritePlayer.width;

    if (xMPlayer <= x0Item || x0Player >= xMItem) return;

    // game score manipulation
    gameScore += 100;

    // update visibility
    this.isVisible = false;
};

/**
* @description Reset item state.
* This also calculates the initial position of the item
* using random number.
*/
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

/**
* @description Draw the item on screen if visible
*/
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
    allEnemies[i].y = minYEnemy + (row * rowHeight);
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
