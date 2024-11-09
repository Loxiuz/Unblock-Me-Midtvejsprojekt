//import * as model from './model.js';
import * as view from './view.js';

window.addEventListener("load", start);

let row = 6;
let col = 6;

function start() {
    console.log(`Javascript kører`);
    
    view.createBoard(row, col);
    /* view.displayBoard(); */
}