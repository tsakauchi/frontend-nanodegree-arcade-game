// Constants
var colWidth = 101;
var rowHeight = 83;
var numRows = 6;
var numCols = 5;

var numOfEnemies = 5;

var minX = 0;
var minXEnemy = minX - colWidth;
var minXPlayer = minX;

var minY = 0;
var minYEnemy = minY + rowHeight;
var minYPlayer = minY - rowHeight;

var maxX = colWidth*numCols;
var maxXEnemy = maxX;
var maxXPlayer = maxX - colWidth;

var maxY = rowHeight*numRows;
var maxYEnemy = rowHeight*4;
var maxYPlayer = maxY - rowHeight;

var iniXPlayer = Math.floor(numCols / 2) * colWidth;
var iniYPlayer = maxYPlayer;


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

    if (xMPlayer < x0Enemy || x0Player > xMEnemy) return;

    player.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // ctx globally provided by engine.js
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = iniXPlayer;
    this.y = iniYPlayer;
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
    if (player.y === minYPlayer) {
        player.reset();
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
}

Player.prototype.reset = function() {
    this.x = iniXPlayer;
    this.y = iniYPlayer;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [];
for (var i=0; i<numOfEnemies; i++) {
    var row = (i % 3) + 1;
    var multiplier = (i % 5) + 1;
    allEnemies[i] = new Enemy();
    allEnemies[i].y = row * rowHeight;
    allEnemies[i].speed *= multiplier;
}

player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
