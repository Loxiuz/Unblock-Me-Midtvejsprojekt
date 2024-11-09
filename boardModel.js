import {Grid} from './grid.js';
export {makeGrid};

let grid = [];

function makeGrid(row, col) {
    grid = new Grid(row, col);
    for (let i = 0; i < grid.rows(); i++) {
        for (let j = 0; j < grid.cols(); j++) {
            grid.set(i, j, 0)
        }  
    }
    return grid;
}