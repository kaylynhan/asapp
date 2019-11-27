import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import GridCell from "./GridCell";

class ScheduleGridReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avoidHour: Array(0),
      isMouseDown: false
    };
  }

  handleMouseDown = e => {
    const outputArr = this.state.avoidHour;
    this.setState({ isMouseDown: true });
    console.log(e.target.style);
    if (e.target.style.backgroundColor == "grey") {
      e.target.style.backgroundColor = "white";
      let removeIndex = outputArr.findIndex(
        elem => elem == e.target.getAttribute("id")
      );
      outputArr.splice(removeIndex, 1);
    } else {
      e.target.style.backgroundColor = "grey";
      outputArr.push(e.target.getAttribute("id"));
    }
    this.props.onMouseUp();
    console.log(outputArr);
  };

  handleMouseOver = e => {
    const outputArr = this.state.avoidHour;
    if (this.state.isMouseDown) {
      // if the grid is grey, change it to white
      if (e.target.style.backgroundColor == "grey") {
        e.target.style.backgroundColor = "white";
        let removeIndex = outputArr.findIndex(
          elem => elem == e.target.getAttribute("id")
        );
        outputArr.splice(removeIndex, 1);
      } else {
        e.target.style.backgroundColor = "grey";
        outputArr.push(e.target.getAttribute("id"));
      }
      this.props.onMouseUp();
      console.log(outputArr);
    }
  };

  handleMouseUp = e => {
    this.state.isMouseDown = false;
    this.props.onMouseUp();
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
      <table>
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
                ></GridCell>
              ))}
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}

export default ScheduleGridReact;
