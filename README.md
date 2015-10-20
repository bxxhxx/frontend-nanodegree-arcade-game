#Introduction:

Working off the classic-arcade-game platform, I’ve added some code to engine.js to accommodate some additional functionality. I have also made some minor changes to the style.css file. But the majority of my work was focused on running the basic game and meeting Udacity requirements for this project via app.js.

#How To Access The Game:

You can download the game files at: https://github.com/bxxhxx/frontend-nanodegree-arcade-game
Then you need to open the index.html in your browser.

#How The Game Works:

Using the key up, down, left, and right, the player can move across the screen. The goal is to avoid collision with the enemy (the bug) and make it to the top water area. Every time the player successfully reaches the water, it gets ten points which is recorded on the score line.

The player is given five opportunities (lives) to do this task.

Every time theres is a collision, the player loses one life and the “Lives Remaining” is adjusted accordingly.

As a bonus, every eight seconds, there is a gem that randomly appears on screen and stays for four seconds. If the player reaches/intersects with the gem, it adds one life to the player.

There is one enemy per stone row, and the speed for each is set randomly. The speed also changes each time the enemy leaves the screen.

Once the player loses all five lives, the message “GAME OVER!” appears on the bottom and the player can no longer play!