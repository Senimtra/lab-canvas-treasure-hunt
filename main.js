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
   drawTreasure();
}

// ######################################
// ## Iteration 2: The Character Class ##
// ######################################

class Character {
   constructor(col, row) {
      this.col = col;
      this.row = row;
   }
   moveUp = () => this.row--;
   moveRight = () => this.col++;
   moveDown = () => this.row++;
   moveLeft = () => this.col--;
}

const player = new Character(0, 0); // (0,0) = Initial position

player.moveDown(); // Increase by 1 the value of player.row
player.moveDown(); // Increase by 1 the value of player.row
player.moveRight(); // Increase by 1 the value of player.col

console.log(player.col, player.row); // => 1,2

// #####################################
// ## Iteration 3: Drawing the Player ##
// #####################################

drawPlayer = () => {
   const playerImg = new Image();
   playerImg.src = './images/character-down.png';
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

drawEverything();

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
         break;
      case 'ArrowUp':
         player.moveUp();
         break;
      case 'ArrowRight':
         player.moveRight();
         break;
      case 'ArrowDown':
         player.moveDown();
         break;
   }
   if (player.col === newTreasure.col && player.row === newTreasure.row) {
      newTreasure.setRandomPosition();
   }
   drawEverything();
});
