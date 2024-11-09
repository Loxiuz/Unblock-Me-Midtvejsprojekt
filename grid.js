export class Grid {
    constructor (rows, cols) {
        this.grid = [];
        for (let i = 0; i < rows; i++) {
            let rowArr = new Array(cols).fill(0);
            this.grid.push(rowArr)
        } 
    }

    isObject(input1, input2, input3) { 
        if (typeof input1 === 'object') {
            return {row: input1.row, col: input1.col, value: input2};
        } else {
            return {row: input1, col: input2, value: input3};
        }
    }

    set(inputRow, inputCol, inputValue) {// Sæt value på den angivne plads
        const {row, col, value} = this.isObject(inputRow, inputCol, inputValue)
        this.grid[row][col] = value;
    }

    get(inputRow, inputCol) { // returnere value på den angivne plads
        const {row, col} = this.isObject(inputRow, inputCol)
        return this.grid[row][col];
    }

    indexFor(inputRow, inputCol) { // returnerer index (nummeret) på cellen i denne række+kolonne
        const {row, col} = this.isObject(inputRow, inputCol)
        return row * this.cols() + col;
    }

    rowColFor(index) {  // returnere et {row, col} objekt for cellen med dette index (nummer)
        const row = Math.floor(index/this.cols());
        const col = index % this.cols();
        return {
            row,
            col
        }
    }

    neighbours(inputRow, inputCol) {
        const {row, col} = this.isObject(inputRow, inputCol)
        let neighbours = [];
        for (let rows = -1; rows <= 1; rows++) {
            for (let cols = -1; cols <= 1; cols++) {
                if (rows === 0 && cols === 0) {
                    continue;
                }

                const neighbourRow = row + rows;
                const neighbourCol = col + cols;

                if(neighbourRow >= 0 && neighbourRow < this.rows() && neighbourCol >= 0 && neighbourCol < this.cols()) {
                    neighbours.push({
                        row: neighbourRow,
                        col: neighbourCol
                    });
                }
            }
        }
        return neighbours;
    }

    neighbourValues(inputRow, inputCol) { // returnerer en liste over alle nabocellers values.
        const {row, col} = this.isObject(inputRow, inputCol)
        let neighbourValues = [];
        let neighbours = this.neighbours(row, col);

        for (let i = 0; i < neighbours.length; i++) {
            neighbourValues.push(this.get(neighbours[i]));
        }

        return neighbourValues;
    }

    nextInRow(inputRow, inputCol) {
        const {row, col} = this.isObject(inputRow, inputCol)
        let nextCol = col+1;

        if (nextCol < this.cols()) {
            let value = this.get({row: row, col: nextCol});
            return {row, nextCol, value}
        } else {
            console.log("There is no nextInRow - out of bounds");
            return null;
        }
    }

    nextInCol(inputRow, inputCol) {
        const {row, col} = this.isObject(inputRow, inputCol)
        let nextRow = row+1;

        if (nextRow < this.rows()) {
            let nextValue = this.get({row: nextRow, col: col});
            return {nextRow, col, nextValue}
        } else {
            console.log("There is no nextInCol - out of bounds");
            return null;
        }
    }

    north(inputRow, inputCol) { // returnere cellen over denne
        const {row, col} = this.isObject(inputRow, inputCol)
        let prevRow = row-1;

        if (prevRow > 0) {
            let value = this.get({row: prevRow, col: col});
            return {prevRow, col, value}
        } else {
            console.log("There is no north - out of bounds");
            return null;
        }
    }

    // todo: south(row, col) BUT DOESN'T THAT DO THE SAME AS nextInCol??

    west (inputRow, inputCol) {
        const {row, col} = this.isObject(inputRow, inputCol)
        let prevCol = col-1;

        if (prevCol > 0) {
            let value = this.get({row: row, col: prevCol});
            return {row, prevCol, value}
        } else {
            console.log("There is no west - out of bounds");
            return null;
        }
    }

    // todo: east(row, col) BUT DOESN'T THAT DO THE SAME AS nextInRow??

    rows() { // returnere antallet af rækker
        return this.grid.length > 0 ? this.grid.length : 0;
    }
    
    cols() {
        return this.grid.length > 0 ? this.grid[0].length : 0;
    }

    size() { // returnere det samlede antal celler 
        return this.rows() * this.cols();
    }

    fill(value) { // skriver den angivne value ind i alle celler
        for (let i = 0; i < this.rows(); i++) {
            for (let j = 0; j < this.cols(); j++) {
                this.grid[i][j] = value;
            }
        }
    }

}


