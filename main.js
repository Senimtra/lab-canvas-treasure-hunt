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
   // drawPlayer()
   // drawTreasure()
}

drawEverything();
