import React from "react";
import ReactDOM from "react-dom";

class GridCell extends React.Component {
  state = {
    isMouseDown: false
  };
  render() {
    return (
      <td
        id={this.props.id}
        onMouseDown={this.props.onMouseDown}
        onMouseOver={this.props.onMouseOver}
        onMouseUp={this.props.onMouseUp}
      >
        {this.props.id}
      </td>
    );
  }
}

export default GridCell;
