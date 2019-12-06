import React from "react";
import ReactDOM from "react-dom";
import SectionDetail from "./SectionDetail";

const TIME_EXCLUSION_COLOR = "#c56"
const TIME_COLOR = "#5eb"
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

  onMouseDown(e, isBlockedOut) {
    let id = e.target.getAttribute("id")
    if (this.props.draggable) {
      this.setState({
        isBlockedOut: !this.state.isBlockedOut,
      }, () => {
        this.props.onMouseDown(id, isBlockedOut)
      })
    }
  }

  onMouseOver(e, isBlockedOut) {
    let id = e.target.getAttribute("id")
    if (this.props.draggable && this.props.isMouseDown) {
      this.setState({
        isBlockedOut: !this.state.isBlockedOut
      }, () => {
        this.props.onMouseOver(id, isBlockedOut)
      })
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
        onMouseDown={e => this.onMouseDown(e,this.state.isBlockedOut)}
        onMouseOver={e => this.onMouseOver(e,this.state.isBlockedOut)}
        onMouseUp={e => this.onMouseUp(e)}
      >
      </td>
    );
  }
}

export default GridCell;
