// Important constants that describe the game board and tuning parameters
    var STONE_TOP = 64;
    var STONE_ROWS = 3;
    var ROW_HEIGHT = 82;
    var COLUMN_WIDTH = 101;
    var LEFT_BOUNDARY = -80;
    var RIGHT_BOUNDARY = 501;
    var TOP_BOUNDARY = 0;
    var BOTTOM_BOUNDARY = 450;
    var SPEED_MULTIPLIER = 150;
    var PLAYER_START_X = 200;
    var PLAYER_START_Y = 400;
    var PLAYER_SPEED = 100;
    var ALLOWED_OVERLAP = 50;
    var MOVES = ['up', 'down', 'left', 'right'];
    var WIN_POINTS = 10;
    var COLLIDE_POINTS = -5;

// Utility functions

// Assign the speed of this enemy
var setSpeed = function () {
    var speed = SPEED_MULTIPLIER*(1+Math.random());
    return (speed);
};

// Randomly assign the row for this enemy to travel on
var setYPos = function () {
    var row = 1 + Math.floor(Math.random() * STONE_ROWS);
    var yPos = STONE_TOP + ROW_HEIGHT * (row - 1);
    return (yPos);
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Start on the far left
    this.x = LEFT_BOUNDARY;
    // Choose the row the enemy will travel on
    this.y = setYPos();
    // Assign a speed
    this.speed = setSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt*this.speed;
    if (this.x > RIGHT_BOUNDARY) {
        this.x = LEFT_BOUNDARY;
        this.speed = setSpeed();
        this.y = setYPos();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
    this.speed = PLAYER_SPEED;
    this.move = 'stay';
    this.score = 0;
};

Player.prototype.update = function() {

    // Determines whether two things occupy the same square on the game board
    var onSameSquare = function(thing1,thing2) {
        var same = false;
        var row1 = Math.floor(thing1.y / ROW_HEIGHT);
        var row2 = Math.floor(thing2.y / ROW_HEIGHT);
        var midline1 = Math.floor(thing1.x + COLUMN_WIDTH/2);
        var midline2 = Math.floor(thing2.x + COLUMN_WIDTH/2);

        if (row1 == row2) {
            if (Math.abs(midline1 - midline2) < ALLOWED_OVERLAP) {
                same = true;
            }
        }
        return ( same );
    };

    // Returns the player to the starting square
    var toStartSquare = function(player) {
        player.x = PLAYER_START_X;
        player.y = PLAYER_START_Y;
    };

    // Returns the player to the starting square if it collides with an enemy
    var resolveCollisions = function(player) {
        allEnemies.forEach( function(enemy) {
            if (onSameSquare(player, enemy)) {
                toStartSquare(player);
                player.score = player.score + COLLIDE_POINTS;
                console.log("Collision detected...score is now " + player.score);
            }
        } );
    };

    switch (this.move) {
    case 'left':
        if ((this.x - COLUMN_WIDTH) > LEFT_BOUNDARY)  {
            this.x = this.x - COLUMN_WIDTH;
        }
        break;
    case 'right':
        if ((this.x + COLUMN_WIDTH) < RIGHT_BOUNDARY ) {
            this.x = this.x + COLUMN_WIDTH;
        }
        break;
    case 'up':
        if ((this.y - ROW_HEIGHT) > TOP_BOUNDARY) {
            this.y = this.y - ROW_HEIGHT;
        } else {
            toStartSquare(player);
            this.score = this.score + WIN_POINTS;
            console.log("Player reached water...score is now " + this.score);
        }
        break;
    case 'down':
        if ((this.y + ROW_HEIGHT) < BOTTOM_BOUNDARY) {
            this.y = this.y + ROW_HEIGHT;
        }
        break;
    }
    this.move = 'stay';
    // Resolve collisions with enemies
    resolveCollisions(this);
};



// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.handleInput = function(keyCode) {
    this.move = keyCode;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    document.getElementById("score").innerHTML = "Score = " + this.score;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];


// Place the player object in a variable called player
var player = new Player();


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
