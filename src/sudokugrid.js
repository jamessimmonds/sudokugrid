import React from 'react';

import SudokuGridRow from './sudokugridrow.js';
import deepcopy from './deepcopy.js';
import HistorySlider from './historyslider.js';
import isSolved from './issolved.js';
import testInsertion from './testinsertion.js';

class SudokuGrid extends React.Component {

    // Drawing functions and component functions

    constructor(props) {
        super(props);

        this.state = {
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
            history: [],
            isSliderHidden: true,
            sliderMax: null,
            sliderValue: 1,
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
                <button 
                    className="solveButton" 
                    onClick={() => this.solve()}
                    style={{display: this.state.isSliderHidden ? "inline" : "none"}}
                >Solve sudoku</button>
                <HistorySlider 
                    isHidden={this.state.isSliderHidden} 
                    sliderMax={this.state.sliderMax}
                    value={this.state.sliderValue}
                    handleSlide={(event) => this.handleSlide(event)}
                />
            </div>);
    }

    handleSlide(event) {
        this.setState(state => {

            const sliderValue = event.target.value;
            const snapshot = deepcopy(this.state.history[event.target.value]);
            
            return {
                grid: snapshot,
                sliderValue: sliderValue,
            }
        });
    }

    // Solving functions

    solveOneSquare(squareNumber) {

        let row = Math.floor(squareNumber/9);
        let col = squareNumber % 9;

        let currentGridState = this.state.grid.slice()

        // Is the grid solved? Return true
        if (isSolved(currentGridState)) {

            this.updateHistory(currentGridState);
            
            this.setState(state => {

                const historyLength = state.history.length;

                return {
                    grid: this.state.grid.slice(),
                    isSliderHidden: false,
                    sliderMax: historyLength,
                    sliderValue: historyLength
                }
            });

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

                this.updateHistory(deepcopy(currentGridState));

                // Only try to put in a candidate if it works
                if (testInsertion(currentGridState, row, col, i) === true) {

                    //console.log("Trying to put a", i, "into", row, col)
                    
                    // Put the number into the grid and update image
                    currentGridState[row][col] = i;

                    // If the next box also works, return true
                    if (this.solveOneSquare(squareNumber + 1)) {
                        return true;

                    // Otherwise, reset the box
                    } else {
                        currentGridState[row][col] = 0;
                        
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

    updateHistory(currentGridState) {

        this.setState(state => {
            const history = state.history.concat([currentGridState]);
            return {
                history,
            };
        });

    }

}

export default SudokuGrid;