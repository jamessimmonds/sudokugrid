function testInsertionRow(sudoku, row, candidate) {
    let testResult = true;

    for (let col = 0; col < 9; col++) {
        
        //console.log("Currently testing (", row, ",", col, ")for candidate", candidate);
        //console.log("This square has a ", sudoku[row][col]);
        
        if (sudoku[row][col] === candidate) {
            testResult = false;
        }
    }

    return testResult;

}

function testInsertionColumn(sudoku, col, candidate) {
    let testResult = true;

    for (let row = 0; row < 9; row++) {
        
        //console.log("Currently testing (", row, ",", col, ")for candidate", candidate);
        //console.log("This square has a ", sudoku[row][col]);
        
        if (sudoku[row][col] === candidate) {
            testResult = false;
        }
    }

    return testResult;

}

function testInsertionBox(sudoku, rowIndex, columnIndex, candidate) {
    let testResult = true;

    let rowBox = Math.floor(rowIndex/3);
    let colBox = Math.floor(columnIndex/3);

    // Determine which row indices need to be checked
    let rowIndices = [];

    for (let rowNumber = 0; rowNumber < 9; rowNumber++) {
        if (Math.floor(rowNumber/3) === rowBox) {
            rowIndices.push(rowNumber)
        }
    }

    // Determine which column indices need to be checked
    let colIndices = [];

    for (let colNumber = 0; colNumber < 9; colNumber++) {
        if (Math.floor(colNumber/3) === colBox) {
            colIndices.push(colNumber)
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            let row = rowIndices[i];
            let col = colIndices[j];
        
            //console.log("Currently testing (", row, ",", col, ")for candidate", candidate);
            //console.log("This square has a ", sudoku[row][col]);
            
            if (sudoku[row][col] === candidate) {
                testResult = false;
            }

        }
    }

    return testResult;

}

function testInsertion(sudoku, row, col, candidate) {
    let rowTest = testInsertionRow(sudoku, row, candidate);
    let colTest = testInsertionColumn(sudoku, col, candidate);
    let boxTest = testInsertionBox(sudoku, row, col, candidate);

    //console.log("Results for", row, col, candidate, rowTest, colTest, boxTest);

    if (rowTest && colTest && boxTest) {
        return true;
    } else {
        return false;
    }
}

export default testInsertion;