import React from "react";
import GridCell from "../views/GridCell";

class ScheduleGrid extends React.Component {
  constructor(props) {
    super(props);
    this.tableNode = React.createRef();
    this.state = {
      avoidHour: Array(0),
      isMouseDown: false
    };
  }
 
  trackExcludedTime = (id, isBlockedOut) => {
    const outputArr = this.state.avoidHour;
    if (isBlockedOut) {
      let removeIndex = outputArr.findIndex(
        elem => elem === id
      );
      outputArr.splice(removeIndex, 1);
    } else {
      outputArr.push(id);
    }
  };

  handleMouseDown = (id, setBlocked) => {
    if (this.props.draggable) {
      this.setState({ isMouseDown: true });
      this.trackExcludedTime(id, setBlocked);
    }
  };

  handleMouseOver = (id, setBlocked) => {
    if (this.props.draggable) {
      const outputArr = this.state.avoidHour;
      if (this.state.isMouseDown) {
        this.trackExcludedTime(id, setBlocked);
      }
    }
  };

  handleMouseUp = e => {
    if (this.props.draggable) {
      this.state.isMouseDown = false;
      this.props.onMouseUp(this.state.avoidHour);
    }
  };
  render() {
    let hour = [
      "8am",
      "9am",
      "10am",
      "11am",
      "12pm",
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
      "8pm",
      "9pm",
      "10pm"
    ];
    let dayOfWeek = ["Mon", "Tu", "Wed", "Thur", "Fri"];
    let hour_id = Array(30);

    let currTime = 800;
    for (var i = 0; i < 30; i++) {
      hour_id[i] = currTime;
      if (i % 2 === 0) {
        currTime += 30;
      } else {
        currTime += 70;
      }
    }

    return (
      <React.Fragment>
        <table ref={this.tableNode}>
          <thead>
            <tr>
              <th></th>
              <th>Mon</th>
              <th>Tu</th>
              <th>Wed</th>
              <th>Thus</th>
              <th>Fri</th>
            </tr>
          </thead>
          {hour.map((hr, i) => (
            <tbody>
              <tr>
                <th id={hr} key={hr}>
                  {hr}
                </th>
                {dayOfWeek.map(DOW => (
                  <GridCell
                    id={`${DOW}${hour_id[2 * i]}`}
                    key={`${DOW}${hour_id[2 * i]}`}
                    onMouseDown={this.handleMouseDown}
                    onMouseOver={this.handleMouseOver}
                    onMouseUp={this.handleMouseUp}
                    draggable={this.props.draggable}
                    isMouseDown={this.state.isMouseDown}
                  ></GridCell>
                ))}
              </tr>
              <tr>
                <th></th>
                {dayOfWeek.map(DOW => (
                  <GridCell
                    id={`${DOW}${hour_id[2 * i + 1]}`}
                    key={`${DOW}${hour_id[2 * i + 1]}`}
                    onMouseDown={this.handleMouseDown}
                    onMouseOver={this.handleMouseOver}
                    onMouseUp={this.handleMouseUp}
                    draggable={this.props.draggable}
                    isMouseDown={this.state.isMouseDown}
                  ></GridCell>
                ))}
              </tr>
            </tbody>
          ))}
        </table>
        <sectionDetail></sectionDetail>
      </React.Fragment>
    );
  }
}

export default ScheduleGrid;
