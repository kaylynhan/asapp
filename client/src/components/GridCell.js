import React from "react";
import ReactDOM from "react-dom";
import SectionDetail from "./SectionDetail";

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
      </td>
    );
  }
}

export default GridCell;
