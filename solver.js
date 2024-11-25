import * as model from "./boardModel.js";
export { isBlocked, moveBlock };

function moveBlock(block, grid) {
  const blocks = model.getBlocks();
}

function isBlocked(block) {
  const blockHead = block.cells.tail.data;
  const blockTail = block.cells.head.data;
  console.log("Block Head:", blockHead);
  console.log("Block Tail:", blockTail);

  if (block.direction === "horizontal") {
    if (blockHead.col < blockTail.col) {
      // LEFT
      console.log("LOOKING LEFT");
      return model.readFromCell(blockHead.row, blockHead.col - 1) != 0;
    } else {
      // RIGHT
      console.log("LOOKING RIGHT");
      return model.readFromCell(blockHead.row, blockHead.col + 1) != 0;
    }
  } else if (block.direction === "vertical") {
    if (blockHead.row < blockTail.row) {
      // UP
      console.log("LOOKING UP");
      return model.readFromCell(blockHead.row - 1, blockHead.col) != 0;
    } else {
      // DOWN
      console.log("LOOKING DOWN");
      //console.log("GRID: ", grid);
      //console.log("Row:", blockHead.row + 1);
      //console.log("Col:", blockHead.col);
      return model.readFromCell(blockHead.row + 1, blockHead.col) != 0;
    }
  }
}
