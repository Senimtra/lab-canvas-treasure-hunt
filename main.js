// main.js
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
   drawGrid();
   drawPlayer();
   // drawTreasure()
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

const playerImg = new Image();
playerImg.src = './images/character-down.png';

drawPlayer = () => {
   playerImg.addEventListener('load', () => {
      context.drawImage(playerImg, player.col * fieldSize, player.row * fieldSize);
   });
};

drawEverything();
