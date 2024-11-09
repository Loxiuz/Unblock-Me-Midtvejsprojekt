import * as model from './boardModel.js';
import * as view from './view.js';

window.addEventListener("load", start);

let row = 6;
let col = 6;


function start() {
    console.log(`Javascript kører`);
    
    model.makeGrid(row, col);
    view.createBoard(row, col);
    /* view.displayBoard(); */
}