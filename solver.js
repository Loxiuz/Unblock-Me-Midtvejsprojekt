import * as model from "./boardModel.js";
export { isBlocked, solve };

function solve(block, grid) {
  // const blocks = model.getBlocks();
}

function isBlocked(block, direction) {
  const blockHead = block.cells.tail.data;
  const blockTail = block.cells.head.data;

  switch (direction) {
    case "left":
      console.log("LOOKING LEFT");
      return model.readFromCell(blockTail.row, blockTail.col - 1) != 0;
    case "right":
      console.log("LOOKING RIGHT");
      return model.readFromCell(blockHead.row, blockHead.col + 1) != 0;
    case "up":
      console.log("LOOKING UP");
      return model.readFromCell(blockTail.row - 1, blockTail.col) != 0;
    case "down":
      console.log("LOOKING DOWN");
      return model.readFromCell(blockHead.row + 1, blockHead.col) != 0;
  }
}
