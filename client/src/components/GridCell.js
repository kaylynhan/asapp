import React from "react";
import ReactDOM from "react-dom";
import SectionDetail from "./SectionDetail";

const TIME_EXCLUSION_COLOR = "red"
const TIME_COLOR = "green"
const DEFAULT_COLOR = "#c7ecfc"
const EXCLUSION_COLOR = "grey"

class GridCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeMode: false,
      isBlockedOut: false
    }

    this.getColor = this.getColor.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.draggable !== prevProps.draggable) {
      this.setState({timeMode: !this.state.timeMode})
    }
  }

  onMouseDown(e) {
    if (this.props.draggable) {
      this.props.onMouseDown(e)
      this.setState({
        isBlockedOut: !this.state.isBlockedOut,
      })
    }
  }

  onMouseOver(e) {
    if (this.props.draggable && this.props.isMouseDown) {
      this.props.onMouseOver(e)
      this.setState({isBlockedOut: !this.state.isBlockedOut})
    }
  }

  onMouseUp(e) {
    this.props.onMouseUp(e)
  }

  getColor() {
    return this.state.isBlockedOut ?
      (this.props.draggable ? TIME_EXCLUSION_COLOR : EXCLUSION_COLOR)
      :
      (this.props.draggable ? TIME_COLOR : DEFAULT_COLOR)
  }

  render() {
    return (
      <td style={{backgroundColor: this.getColor()}}
        id={this.props.id}
        onMouseDown={e => this.onMouseDown(e)}
        onMouseOver={e => this.onMouseOver(e)}
        onMouseUp={e => this.onMouseUp(e)}
      >
      </td>
    );
  }
}

export default GridCell;
