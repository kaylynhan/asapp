import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

class GapSlider extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        // log the value in console temporarily
        function log(value){
            console.log(value);
        }
        let marks = {
            0:0,
            1:1,
            2:2,
            3:3,
            4:4
        }

        return(
            <div style={{ width: "100%"}}>
                <p> Min Gap</p>
                <Slider marks={marks} max={4} min={0} step={1} onChange={log}/>
            </div>
        )
    }
}

export default GapSlider