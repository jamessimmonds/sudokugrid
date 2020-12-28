import React from 'react';

import SudokuGridRow from './sudokugridrow.js'

class SudokuGrid extends React.Component {

    // Drawing functions and component functions

    constructor(props) {
        super(props);

        this.state = {
            status: "Ready to solve",
            grid: [
                [0,0,3,0,2,0,6,0,0],
                [9,0,0,3,0,5,0,0,1],
                [0,0,1,8,0,6,4,0,0],
                [0,0,8,1,0,2,9,0,0],
                [7,0,0,0,0,0,0,0,8],
                [0,0,6,7,0,8,2,0,0],
                [0,0,2,6,0,9,5,0,0],
                [8,0,0,2,0,3,0,0,9],
                [0,0,5,0,1,0,3,0,0]
            ],
        };
    }

    renderGrid() {
        return (<div className="sudokuGrid">
            {this.state.grid.map((values, i) => 
                this.renderRow(i, values))
            }
        </div>)
    }

    renderRow(i, values) {
        return <SudokuGridRow key={i} row={i} values={values} />
    }

    render() {
        return (
            <div>
                <h1>Sudoku puzzle</h1>
                {this.renderGrid()}
                <button className="solveButton" onClick={() => this.solve()}>Solve sudoku</button>
                <p>{this.state.status}</p>
            </div>);
    }

    updateState(currentState, status) {

        this.setState({
            status: status,
            grid: currentState,
        });
    }

    // Solving functions

    test() {

        let currentGridState = this.state.grid.slice();

        //let test = this.isSolved(currentGridState);
        //let test = this.testInsertionRow(currentGridState, 2, 8);
        //let test = this.testInsertionColumn(currentGridState, 1, 8);
        //let test = this.testInsertionBox(currentGridState, 6, 3, 1)
        let test = this.testInsertion(currentGridState, 0, 5, 1)

        this.setState({
            status: test ? "The test has passed" : "The test has failed",
            grid: currentGridState,
            history: this.state.history.slice(),
        })

    }

    isSolved(sudoku) {
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

    testInsertionRow(sudoku, row, candidate) {
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

    testInsertionColumn(sudoku, col, candidate) {
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

    testInsertionBox(sudoku, rowIndex, columnIndex, candidate) {
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

    testInsertion(sudoku, row, col, candidate) {
        let rowTest = this.testInsertionRow(sudoku, row, candidate);
        let colTest = this.testInsertionColumn(sudoku, col, candidate);
        let boxTest = this.testInsertionBox(sudoku, row, col, candidate);

        //console.log("Results for", row, col, candidate, rowTest, colTest, boxTest);

        if (rowTest && colTest && boxTest) {
            return true;
        } else {
            return false;
        }
    }

    solveOneSquare(squareNumber) {

        let row = Math.floor(squareNumber/9);
        let col = squareNumber % 9;

        let currentGridState = this.state.grid.slice()

        // Is the grid solved? Return true
        if (this.isSolved(currentGridState)) {
            
            this.updateState(this.state.grid.slice(), "The sudoku is solved");

            return true;
        
        // Has the box already been solved? Skip to next one
        } else if (currentGridState[row][col] !== 0) {
            return this.solveOneSquare(squareNumber + 1);

        // Have we already done 81 boxes? Failure
        } else if (squareNumber > 80) {
            return false;
        
        // All other cases - guess numbers in the box
        } else {

            // Try the numbers from 1 to 9
            for (let i = 1; i < 10; i++) {

                // Only try to put in a candidate if it works
                if (this.testInsertion(currentGridState, row, col, i) === true) {

                    //console.log("Trying to put a", i, "into", row, col)
                    
                    // Put the number into the grid and update image
                    currentGridState[row][col] = i;
                    this.updateState(currentGridState, "Solving...")

                    // If the next box also works, return true
                    if (this.solveOneSquare(squareNumber + 1)) {
                        return true;

                    // Otherwise, reset the box
                    } else {
                        currentGridState[row][col] = 0;
                        this.updateState(currentGridState, "Solving...")
                        
                    }
                }
            }

            // Backtrack if no numbers from 1 to 9 work
            // If there is a contradiction, backtrack
            return false;

        }
    }

    solve() {
        this.solveOneSquare(0);
    }

}

export default SudokuGrid;