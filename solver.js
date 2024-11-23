import { grid } from "./boardModel.js";
import * as model from "./boardModel.js";
export {isBlocked};

function moveBlock(block, grid) {
    if (block.id === 0 ) {
        isBlocked(block, grid);
    }
}

function isBlocked(block, grid) {
    const blockHead = block.cells.head;
    const blockTail = block.cells.tail;

    if (block.direction === 'horizontal') {
        if (blockHead.col < blockTail.col) {
            // LEFT
            console.log("LOOKING LEFT")
            return model.readFromCell(blockHead.row, blockHead.col-1) != 0;
        } else {
            // RIGHT
            console.log("LOOKING RIGHT")
            return model.readFromCell(blockHead.row, blockHead.col+1) != 0;
        }
        
    } else {
        if (blockHead.row < blockTail.row) {
            // UP
            console.log("LOOKING UP")
            return model.readFromCell(blockHead.row-1, blockHead.col) != 0;
        } else {
            // DOWN
            console.log("LOOKING DOWN")
            console.log("GRID: " + grid);
            return model.readFromCell(blockHead.row+1, blockHead.col) != 0;
        }
    }
}
