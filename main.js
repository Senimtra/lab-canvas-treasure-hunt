const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const fieldSize = width / 10;

// ###################################
// ## Iteration 1: Drawing the Grid ##
// ###################################

function drawGrid() {
   context.lineWidth = 2;
   for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
         context.strokeRect(i * fieldSize, j * fieldSize, i * fieldSize + fieldSize, j * fieldSize + fieldSize);
      }
   }
   context.strokeRect(1, 1, width - 2, height - 2, 1);
   context.stroke();
}

function drawEverything() {
   context.clearRect(0, 0, width, height);
   drawGrid();
   drawPlayer();
   drawPlayer2();
   drawTreasure();
}

// ######################################
// ## Iteration 2: The Character Class ##
// ######################################

class Character {
   constructor(col, row) {
      this.col = col;
      this.row = row;
      this.direction = 'down';
      this.score = 0;
   }
   moveUp = () => (this.row === 0 ? this.row : this.row--);
   moveRight = () => (this.col === 9 ? this.col : this.col++);
   moveDown = () => (this.row === 9 ? this.row : this.row++);
   moveLeft = () => (this.col === 0 ? this.col : this.col--);
}

const player = new Character(0, 0); // (0,0) = Initial position

player.moveDown(); // Increase by 1 the value of player.row
player.moveDown(); // Increase by 1 the value of player.row
player.moveRight(); // Increase by 1 the value of player.col

console.log(player.col, player.row); // => 1,2

// #####################################
// ## Iteration 3: Drawing the Player ##
// #####################################

const playerImg = new Image();
playerImg.src = './images/character-down.png';

drawPlayer = () => {
   switch (player.direction) {
      case 'left':
         playerImg.src = './images/character-left.png';
         break;
      case 'right':
         playerImg.src = './images/character-right.png';
         break;
      case 'up':
         playerImg.src = './images/character-up.png';
         break;
      case 'down':
         playerImg.src = './images/character-down.png';
   }
   playerImg.addEventListener('load', () => {
      context.drawImage(playerImg, player.col * fieldSize, player.row * fieldSize);
   });
};

// #####################################
// ## Iteration 4: The Treasure Class ##
// #####################################

class Treasure {
   constructor(col, row) {
      this.col = col;
      this.row = row;
   }
   setRandomPosition() {
      this.col = Math.floor(Math.random() * 10);
      this.row = Math.floor(Math.random() * 10);
   }
}

const newTreasure = new Treasure();
newTreasure.setRandomPosition();

drawTreasure = () => {
   const treasureImg = new Image();
   treasureImg.src = './images/treasure.png';
   treasureImg.addEventListener('load', () => {
      context.drawImage(treasureImg, newTreasure.col * fieldSize, newTreasure.row * fieldSize, fieldSize, fieldSize);
   });
};

// ########################################
// ## Iteration 5: React to player input ##
// ########################################

window.addEventListener('keydown', (event) => {
   // Stop the default behavior (moving the screen to the left/up/right/down)
   event.preventDefault();

   // React based on the key pressed
   switch (event.key) {
      case 'ArrowLeft':
         player.moveLeft();
         player.direction = 'left';
         break;
      case 'ArrowUp':
         player.moveUp();
         player.direction = 'up';
         break;
      case 'ArrowRight':
         player.moveRight();
         player.direction = 'right';
         break;
      case 'ArrowDown':
         player.moveDown();
         player.direction = 'down';
         break;
   }
   // ### Check if player found the treasure ###
   if (player.col === newTreasure.col && player.row === newTreasure.row) {
      newTreasure.setRandomPosition();
      player.score++;
      drawScores();
   }
   drawEverything();
});

// ########################
// ## Bonus: Iteration 6 ##
// ########################

// Add a property direction to the player and display a different image based on the direction.
// Stop the player at the edges of the board.
// Add another player that can be controlled with different keys (WASD).
// Add a score property to the player and create a function drawScores.

const player2 = new Character(8, 7); // (0,0) = Initial position

const player2Img = new Image();
player2Img.src = './images/character-down2.png';

drawPlayer2 = () => {
   switch (player2.direction) {
      case 'left':
         player2Img.src = './images/character-left2.png';
         break;
      case 'right':
         player2Img.src = './images/character-right2.png';
         break;
      case 'up':
         player2Img.src = './images/character-up2.png';
         break;
      case 'down':
         player2Img.src = './images/character-down2.png';
   }
   player2Img.addEventListener('load', () => {
      context.drawImage(player2Img, player2.col * fieldSize, player2.row * fieldSize);
   });
};

window.addEventListener('keydown', (event) => {
   // Stop the default behavior (moving the screen to the left/up/right/down)
   event.preventDefault();

   // React based on the key pressed
   switch (event.key) {
      case 'w':
         player2.moveUp();
         player2.direction = 'up';
         break;
      case 'a':
         player2.moveLeft();
         player2.direction = 'left';
         break;
      case 's':
         player2.moveDown();
         player2.direction = 'down';
         break;
      case 'd':
         player2.moveRight();
         player2.direction = 'right';
   }

   // ### Check if player2 found the treasure ###
   if (player2.col === newTreasure.col && player2.row === newTreasure.row) {
      newTreasure.setRandomPosition();
      player2.score++;
      drawScores();
   }
   drawEverything();
});

// ### Get score elements ###
const redScoreElement = document.querySelector('#red span');
const blueScoreElement = document.querySelector('#blue span');

drawScores = () => {
   redScoreElement.innerHTML = (player.score * 0.01).toFixed(2).slice(-2);
   blueScoreElement.innerHTML = (player2.score * 0.01).toFixed(2).slice(-2);
};

drawEverything();
