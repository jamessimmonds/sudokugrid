import React from 'react';

class HistorySlider extends React.Component {

    render () {
        return <div>
            <input 
                type="range" 
                min="0" 
                max={this.props.sliderMax} 
                style={{display: this.props.isHidden ? "none" : "inline"}}
            ></input>
        </div>
    }

}

export default HistorySlider;