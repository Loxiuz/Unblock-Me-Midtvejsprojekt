//import Block from "./Block.js";
import * as model from "./boardModel.js";
import * as view from "./view.js";
import Queue from "./queue.js";

window.addEventListener("load", start);

let row = 6;
let col = 6;

async function start() {
  console.log(`Javascript kører`);

  model.makeGrid(row, col);
  view.createBoard(row, col);
  await setLevel();
  view.displayBoard(row, col);
}

async function setLevel() {
  const response = await fetch("level.json");
  const data = await response.json();

  for (let i = 0; i < data.blocks.length; i++) {
    const cells = data.blocks[i].cells;
    const queue = new Queue();

    for (let j = 0; j < cells.length; j++) {
      queue.enqueue(cells[j]);
    }

    data.blocks[i].cells = queue;

    model.writeBlockToCells(data.blocks[i]);
  }

  console.log(data.blocks);

  /* const cells = new Stack();
  cells.push({ row: 2, col: 3 });
  cells.push({ row: 2, col: 4 });

  const block = new Block("h", 1, cells);

  model.writeBlockToCell(block); */
}

//TODO - Main focus: Make the blocks move
/* 
    - Maybe convert the block cells into queues to get same functionallity as in snake to move blocks
    - Make the "goal"; a missing wall 
    - Note for how to move the blocks: Click on cell to move, click on where to move it = cell moves
*/
