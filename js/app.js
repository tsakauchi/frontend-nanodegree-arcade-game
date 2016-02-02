/**********************************************************
 * app.js
 * Contains class definitions and initialization routine
 **********************************************************/

 /**********************************************************
 * Constants
 **********************************************************/
var COL_WIDTH = 101;
var ROW_HEIGHT = 83;
var NUM_OF_ROWS = 6;
var NUM_OF_COLS = 5;

var NUM_OF_ENEMIES = 5;
var NUM_OF_PLAYABLE_CHARACTERS = 5;
var NUM_OF_OBSTACLES = 3;
var NUM_OF_ITEMS = 2;

var MIN_X = 0;
var MIN_X_ENEMY = MIN_X - COL_WIDTH;
var MIN_X_PLAYER = MIN_X;
var MIN_X_SELECTOR = MIN_X_PLAYER;
var MIN_X_OBSTACLE = MIN_X;
var MIN_X_ITEM = MIN_X;

var MIN_Y = 0;
var MIN_Y_ENEMY = MIN_Y + ROW_HEIGHT;
var MIN_Y_PLAYER = MIN_Y;
var MIN_Y_SELECTOR = MAX_Y - ROW_HEIGHT*3;
var MIN_Y_OBSTACLE = MIN_Y + ROW_HEIGHT*4;
var MIN_Y_ITEM = MIN_Y + ROW_HEIGHT;

var MAX_X = COL_WIDTH*NUM_OF_COLS;
var MAX_X_ENEMY = MAX_X;
var MAX_X_PLAYER = MAX_X - COL_WIDTH;
var MAX_X_SELECTOR = MAX_X_PLAYER;
var MAX_X_OBSTACLE = MAX_X;
var MAX_X_ITEM = MAX_X;

var MAX_Y = ROW_HEIGHT*NUM_OF_ROWS;
var MAX_Y_ENEMY = ROW_HEIGHT*4;
var MAX_Y_PLAYER = MAX_Y - ROW_HEIGHT;
var MAX_Y_SELECTOR = MAX_Y - ROW_HEIGHT*3;
var MAX_Y_OBSTACLE = MAX_Y - ROW_HEIGHT*2;
var MAX_Y_ITEM = ROW_HEIGHT*3;

var INI_X_PLAYER = Math.floor(NUM_OF_COLS / 2) * COL_WIDTH;
var INI_Y_PLAYER = MAX_Y_PLAYER;

var INI_X_SELECTOR = INI_X_PLAYER;
var INI_Y_SELECTOR = MAX_Y - ROW_HEIGHT*3;

var PLAYER_SPRITES = [];
PLAYER_SPRITES[0] = 'images/char-boy.png';
PLAYER_SPRITES[1] = 'images/char-cat-girl.png';
PLAYER_SPRITES[2] = 'images/char-horn-girl.png';
PLAYER_SPRITES[3] = 'images/char-pink-girl.png';
PLAYER_SPRITES[4] = 'images/char-princess-girl.png';

var GAME_MODE_MAIN_GAME = 'main-game';
var GAME_MODE_PLAYER_SELECTION = 'player-selection';

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
    if ((this.x + dx) > MAX_X_ENEMY) {
        this.x = MIN_X_ENEMY;
    } else if ((this.x + dx) < MIN_X_ENEMY) {
        this.x = MAX_X_ENEMY;
    } else {
        this.x += dx;
    }

    // collision detection
    if (this.y != player.y) return;

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
    if (this.y != MIN_Y_PLAYER) return;

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
    var dx = COL_WIDTH;
    var dy = ROW_HEIGHT;
    if (keyPressed == 'left') {
        if (this.x - dx >= MIN_X_PLAYER) {
            this.x -= dx;
        }
    } else if (keyPressed == 'right') {
        if (this.x + dx <= MAX_X_PLAYER) {
            this.x += dx;
        }
    } else if (keyPressed == 'up') {
        if (this.y - dy >= MIN_Y_PLAYER) {
            this.y -= dy;
        }
    } else if (keyPressed == 'down') {
        if (this.y + dy <= MAX_Y_PLAYER) {
            this.y += dy;
        }
    }
};

/**
* @description Reset player state.
*/
Player.prototype.reset = function() {
    this.x = INI_X_PLAYER;
    this.y = INI_Y_PLAYER;
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
    this.x = INI_X_SELECTOR;
    this.y = INI_Y_SELECTOR;
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
    var dx = COL_WIDTH;
    var dy = ROW_HEIGHT;
    if (keyPressed == 'left') {
        if (this.x - dx >= MIN_X_SELECTOR) {
            this.x -= dx;
        }
    } else if (keyPressed == 'right') {
        if (this.x + dx <= MAX_X_SELECTOR) {
            this.x += dx;
        }
    } else if (keyPressed == 'up') {
        if (this.y - dy >= MIN_Y_SELECTOR) {
            this.y -= dy;
        }
    } else if (keyPressed == 'down') {
        if (this.y + dy <= MAX_Y_SELECTOR) {
            this.y += dy;
        }
    }
};

/**
* @description Reset selector state.
*/
Selector.prototype.reset = function() {
    this.x = INI_X_SELECTOR;
    this.y = INI_Y_SELECTOR;
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
    this.x = INI_X_SELECTOR;
    this.y = INI_Y_SELECTOR;
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
            gameMode = GAME_MODE_MAIN_GAME;
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
    var minC = MIN_X_OBSTACLE/COL_WIDTH;
    var minR = MIN_Y_OBSTACLE/ROW_HEIGHT;
    var maxC = MAX_X_OBSTACLE/COL_WIDTH;
    var maxR = MAX_Y_OBSTACLE/ROW_HEIGHT;

    var rndC = Math.floor((Math.random() * (maxC - minC + 1)) + minC);
    var rndR = Math.floor((Math.random() * (maxR - minR + 1)) + minR);

    this.x = rndC*COL_WIDTH;
    this.y = rndR*ROW_HEIGHT;
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
    var minC = MIN_X_ITEM/COL_WIDTH;
    var minR = MIN_Y_ITEM/ROW_HEIGHT;
    var maxC = MAX_X_ITEM/COL_WIDTH;
    var maxR = MAX_Y_ITEM/ROW_HEIGHT;

    var rndC = Math.floor((Math.random() * (maxC - minC + 1)) + minC);
    var rndR = Math.floor((Math.random() * (maxR - minR + 1)) + minR);

    this.x = rndC*COL_WIDTH;
    this.y = rndR*ROW_HEIGHT;

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
gameMode = GAME_MODE_PLAYER_SELECTION;

allSelectees = [];
for (var i=0; i<NUM_OF_PLAYABLE_CHARACTERS; i++) {
    allSelectees[i] = new Selectee();
    allSelectees[i].x = i * COL_WIDTH;
    allSelectees[i].sprite = PLAYER_SPRITES[i];
}

selector = new Selector();

allItems = [];
for (var i=0; i<NUM_OF_ITEMS; i++) {
    allItems[i] = new Item();
}

allEnemies = [];
for (var i=0; i<NUM_OF_ENEMIES; i++) {
    var row = (i % 3) + 1;
    var multiplier = (i % 5) + 1;
    allEnemies[i] = new Enemy();
    allEnemies[i].y = MIN_Y_ENEMY + (row * ROW_HEIGHT);
    allEnemies[i].speed *= multiplier;
}

allObstacles = [];
for (var i=0; i<NUM_OF_OBSTACLES; i++) {
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

    if (gameMode == GAME_MODE_PLAYER_SELECTION)
    {
        selector.handleInput(allowedKeys[e.keyCode]);
        allSelectees.forEach(function(selectee) {
            selectee.handleInput(allowedKeys[e.keyCode]);
        });
    }
    else if (gameMode == GAME_MODE_MAIN_GAME)
    {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
