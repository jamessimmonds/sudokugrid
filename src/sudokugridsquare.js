import React from 'react';

class SudokuGridSquare extends React.Component {

    render () {
        return <div className="sudokuGridSquare">
            {this.props.value===0 ? '' : this.props.value }
        </div>
    }

}

export default SudokuGridSquare;