import React, { Component } from "react";
import ReactDOM from "react-dom";
class TimeCell extends Component {
    state = {  }
    render() { 
        return ( 
            <li id={this.props.id}>
                {this.props.id}
            </li>
         );
    }
}
 
export default TimeCell;

