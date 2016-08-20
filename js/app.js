// Important constants that describe the game board tuning parameters
    const stoneTop = 64;
    const stoneRows = 3;
    const rowHeight = 82;
    const columnWidth = 101;
    const leftBoundary = -80;
    const rightBoundary = 505;
    const enemySpeedMultiplier = 80;
    const playerStartX = 200;
    const playerStartY = 400;
    const playerSpeed = 100;
    const moves = ["up", "down", "left", "right"];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Start on the far left
    this.x = leftBoundary;
    // Choose the row the enemy will travel on
    this.y = setYPos();
    // Assign a speed
    this.speed = setSpeed();
};

// Assign the speed of this particular enemy
var setSpeed = function () {
    var speed = enemySpeedMultiplier*(1+Math.random());
    return (speed);
}

// Assign the row for the enemy to travel on
var setYPos = function () {
    var row = 1 + Math.floor(Math.random() * stoneRows);
    var yPos = stoneTop + rowHeight * (row - 1);
    return (yPos);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt*this.speed;
    if (this.x > rightBoundary) {
        this.x = leftBoundary;
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
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = playerStartX;
    this.y = playerStartY;
    this.speed = playerSpeed;
    this.move = "stay";
};

Player.prototype.update = function() {
    console.log("In Player.update...this.move is " + this.move);
    switch (this.move) {
    case 'left':
        this.x = this.x - columnWidth;
        console.log("Going left...");
        break;
    case 'right':
        this.x = this.x + columnWidth;
        console.log("Going right...");
        break;
    case 'up':
        this.y = this.y - rowHeight;
        console.log("Going up...");
        break;
    case 'down':
        this.y = this.y + rowHeight;
        console.log("Going down...");
        break;
    }
    console.log("this.x is now " + this.x + " and this.y is now " + this.y);
    this.move = 'stay';

    // Resolve collisions with enemies
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.handleInput = function(keyCode) {
    this.move = keyCode;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
