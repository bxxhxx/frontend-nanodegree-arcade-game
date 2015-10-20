// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    /*Sets the enemy initial location, defining x and y locations based
    on the allEnemies loop order */
    this.x = -101;
    this.y = 135 + i * 83;

    /*Sets the enemy speed as maximum of 300 but
    reduced by increments of 2 based on random number/random floor selection
    between 0 - 99 */
    this.speed = 300 - 2*(Math.floor(Math.random() *100));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    /*Calculates the updated x value based on the speed, position and the elapsed time.
    When the object moves off screen (right), then it immediately reappears from left screen */
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = -101;
        this.speed = 300 - 2 * (Math.floor(Math.random() * 100));
    }
    //Collision checker
    /*Checks to see if the enemey and the player are on the same row (y val)
    and it checks to see if their x values overlap, indicating a collision */
    if (this.y === player.y && this.x + 101 >= player.x && this.x <= player.x + 69) {
        //Subtracts one life from the player's total livesRemaining
        player.livesRemaining = player.livesRemaining - 1;
        //In case of collision, moves player back to the start location
        reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/*Creates the player function and loading the image through this.sprite, also setting
the x and y starting locations */
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 220;
    this.y = 467;
    //Gives the player five chances to play (lives) and sets the score to start from 0
    this.livesRemaining = 5;
    this.score = 0;
};

/*Sets up the update method for the player: uses handleInput adjustments to update the
player x and y */
Player.prototype.update = function() {
    /*If livesRemaining greater than 0, uspdate player position with key stroke values
    from handleInput adjust x and y. This means when livesRemaining equals 0, the
    player doesn't move */
    if (this.livesRemaining >0) {
        this.x = this.x + adjustX;
        adjustX = 0;
        this.y = this.y + adjustY;
        adjustY = 0;

        //A rule to reset the game when the player reaches the water
       if (this.y === 52) {
            this.score = this.score + 10;
            reset();
        }
        //Rules to prevent the player from going off the screen
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

//Sets up the render method for the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*Sets up handleInput method with "block wide" values to add to x and y for
the player movement */
Player.prototype.handleInput = function(input) {
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

/*writes the Gem class, loading the image, calculates for the gem to appear randomly
on screen (in the stones rows and columns only), and finally sets up a timer
that update method will use */
var Gem = function () {
    this.sprite = 'images/Gem Orange.png';
    this.x = 18 + (101* Math.floor(Math.random()* 5));
    this.y = 135 + (83 * Math.floor(Math.random() *3));
    this.timer = Date.now();
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function() {
    //Checks for player reaching gem; awards "life" & takes gem offscreen
    if (this.x === player.x && this.y === player.y) {
        player.livesRemaining = player.livesRemaining + 1;
        this.x = -70;
        this.timer = Date.now();
    }
    //Takes gem off screen if on screen for 4 secs
    if (this.x > -70 && (Date.now() - gem.timer)/1000 > 4) {
        this.x = -70;
        this.timer = Date.now();
    }
    //if gem offscreen 8 secs, puts gem back on screen
    if (this.x === -70 && ((Date.now() - gem.timer)/1000 > 8)  ) {
        this.x = 18 + (101* Math.floor(Math.random()* 5));
        this.y = 135 + (83 * Math.floor(Math.random() *3));
        this.timer = Date.now();
    }
};

//Creates a reset function for the player start position
var reset = function () {
    player.x = 220;
    player.y = 467;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

/*Creates three objects in allEnemies array, making a for loop so each newInstance is
pushed into the array */
var enemyNumber = 3;
for (i = 0; i < enemyNumber; i++) {
    var enemyInstance = new Enemy();
    allEnemies.push(enemyInstance);
}

// Places the player object in a variable called player
var adjustX = 0;
var adjustY = 0;
var player = new Player();
//Makes the gem
var gem = new Gem();

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
