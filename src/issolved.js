function isSolved(sudoku) {
    let noZeroes = true;

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudoku[row][col] === 0) {
                noZeroes = false;
            }
        }
    }

    return noZeroes
}

export default isSolved;