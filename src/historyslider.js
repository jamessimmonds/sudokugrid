import React from 'react';

class HistorySlider extends React.Component {

    render () {
        return <div>
            <br></br><br></br>
            <label 
                style={{display: this.props.isHidden ? "none" : "inline"}}
                htmlFor="slider"
            >Jump to state: {this.props.value}</label><br></br><br></br>
            <input 
                type="range" 
                min="1"
                id="slider" 
                max={this.props.sliderMax-1} 
                style={{display: this.props.isHidden ? "none" : "inline"}}
                onChange={this.props.handleSlide}
                value={this.props.value}
            ></input>
        </div>
    }

}

export default HistorySlider;