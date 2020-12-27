import React from 'react'
import ReactDOM from 'react-dom'

import './index.css';

class SudokuGridSquare extends React.Component {

    render () {
        return <div className="sudokuGridSquare">
            {this.props.value==0 ? '' : this.props.value }
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
                [0,0,5,0,2,0,3,0,0]
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
            </div>);
    }

}

ReactDOM.render(
    <SudokuGrid />,
    document.getElementById('root')
);