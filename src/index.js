import React from 'react'
import ReactDOM from 'react-dom'

import './index.css';

class SudokuGridSquare extends React.Component {

    render () {
        return <div className="sudokuGridSquare">
            {this.props.value===0 ? '' : this.props.value }
        </div>
    }

}

class SudokuGridRow extends React.Component {

    render() {
        const numbers = this.props.values;

        return <div className="sudokuGridRow">
            {numbers.map((number, i) => 
                <SudokuGridSquare key={i} row={this.props.row} col={i} value={number} />)
            }
        </div>
    }

}

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
                <button className="solveButton" onClick={() => this.test()}>Solve sudoku</button>
                <p>{this.state.status}</p>
            </div>);
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

        if (rowTest && colTest && boxTest) {
            return true;
        } else {
            return false;
        }
    }

}

ReactDOM.render(
    <SudokuGrid />,
    document.getElementById('root')
);