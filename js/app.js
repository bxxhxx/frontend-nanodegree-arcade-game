// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Setting the enemy initial location, defining x and y locations based on the allEnemies loop order
    this.x = -101;
    this.y = 135 + i * 83;

    //Setting the enemy speed based on allEnemies loop order
    this.speed = 200-50*i;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Calculating the updated x value based on the speed, position and the elapsed time
    //When the object moves off screen (right), then it immediately appears from left screen
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = -101;
    }
    //Collision checker
    //First condition checks to see if the enemey and the player are on the same row
    if (this.y === player.y) {
        //If a collision happens: meaning the enemy's image overlaps with the player's image
        if (this.x + 101 >= player.x && this.x <= player.x + 69) {
            //Subtract one life from the players total livesRemaining
            player.livesRemaining = player.livesRemaining - 1;
            //In case of collision, the player should move back to the start location
            reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Creating the player function and loading the image through this.sprite, also setting
//the x and y starting location
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 220;
    this.y = 467;
    //Giving the player five chances to play (lives) and setting the score to start from 0
    this.livesRemaining = 5;
    this.score = 0;
};

//Setting up the update method for the player: uses handleInput adjustments to update the
//player x and y
Player.prototype.update = function() {
    //Making codition for the player not to have the ability to move on the screen once
    //the LivesReamaining equals to 0
    if (this.livesRemaining === 0) {
    }
    //Otherwise process update position based on key strokes
        else {
        this.x = this.x + adjustX;
        adjustX = 0;
        this.y = this.y + adjustY;
        adjustY = 0;

        //A rule to reset the game when the player reaches the water
       if (this.y === 52) {
            this.score = this.score + 10;
            reset();
        }
        //A rule to prevent the player from going off the screen
        if (this.x < 18) {
            this.x = 18;
        }
        if (this.x > 422) {
            this.x = 422;
        }
        if (this.y > 467) {
            this.y = 467;
        }
    }
};

//Setting up the render method for the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Setting up handleInput method with block wide values to add to x and y for
// the player movement
Player.prototype.handleInput = function(input) {
    //NEED TO WRTIE CODE FOR THIS
    if (input === 'left') {
        adjustX = -101;
    } else if (input === 'right') {
        adjustX = 101;
    } else if (input === 'up') {
        adjustY = -83;
    } else if (input === 'down') {
        adjustY = 83;
    }
};

//Creating a reset function for the player start position
var reset = function () {
    player.x = 220;
    player.y = 467;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

//Creating three objects in our allEnemies array, making a for loop so each newInstance is
//pushed into the array
var enemyNumber = 3;
for (i = 0; i < enemyNumber; i++) {
    var enemyInstance = new Enemy();
    allEnemies.push(enemyInstance);
}
// Place the player object in a variable called player

var adjustX = 0;
var adjustY = 0;
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
