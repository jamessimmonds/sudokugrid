import React from 'react';

import SudokuGridSquare from './sudokugridsquare.js'

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

export default SudokuGridRow;