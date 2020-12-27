import React from 'react'
import ReactDOM from 'react-dom'

import './index.css';

class SudokuGridSquare extends React.Component {

    render () {
        return <div class="sudokuGridSquare" />
    }

}

class SudokuGridRow extends React.Component {

    render() {
        return <div class="sudokuGridRow">
            <SudokuGridSquare />
            <SudokuGridSquare />
            <SudokuGridSquare />
            <SudokuGridSquare />
            <SudokuGridSquare />
            <SudokuGridSquare />
            <SudokuGridSquare />
            <SudokuGridSquare />
            <SudokuGridSquare />
        </div>
    }

}

class SudokuGrid extends React.Component {

    render() {
        return <div class="sudokuGrid">
            <SudokuGridRow />
            <SudokuGridRow />
            <SudokuGridRow />
            <SudokuGridRow />
            <SudokuGridRow />
            <SudokuGridRow />
            <SudokuGridRow />
            <SudokuGridRow />
            <SudokuGridRow />
        </div>
    }

}

ReactDOM.render(
    <SudokuGrid />,
    document.getElementById('root')
);