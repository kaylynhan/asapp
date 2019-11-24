import React, { Component } from "react";
import ReactDOM from "react-dom";
import TimeCell from "./TimeCell";

class ScheduleGrid extends Component {
  constructor(props) {
    super(props);
    this.grid_generate = this.grid_generate.bind(this);
    this.state = {
      dayOfWeek: ["Mon", "Tu", "Wed", "Thur", "Fri"]
    };
  }
  // This function is used for generating grid
  grid_generate() {
    let all_data = Array(0);
    let outputArr = Array(0);
    let isMouseDown = false;
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

    var table = document.createElement("table"),
      th,
      tr,
      e,
      row,
      cell;
    for (row = 0; row < 30; row++) {
      tr = document.createElement("tr");
      if (row === 0) {
        // table header
        for (cell = 0; cell < 6; cell++) {
          th = document.createElement("th");
          if (cell === 0) {
            th.innerHTML = "";
          } else {
            th.innerHTML = dayOfWeek[cell - 1];
          }
          tr.appendChild(th);
        }
        table.append(tr);
      }

      tr = document.createElement("tr");
      for (cell = 0; cell < 6; cell++) {
        var e = document.createElement("td");
        all_data.push(e);
        if (cell === 0) {
          th = document.createElement("th");
          if (row % 2 == 0) {
            th.innerText = `${hour[Math.ceil((row - 1) / 2)]}`;
          } else {
            th.innerText = "";
          }
          tr.appendChild(th);
        } else {
          // set id for each cell
          e.setAttribute("id", `${dayOfWeek[cell - 1]}${hour_id[row]}`);
          e.innerText = `${dayOfWeek[cell - 1]}${hour_id[row]}`;
          tr.appendChild(e);
        }
      }
      table.append(tr);
    }

    all_data.forEach(e =>
      e.addEventListener("mousedown", function() {
        isMouseDown = true;
        if (e.style.backgroundColor == "grey") {
          e.style.backgroundColor = "white";
          let removeIndex = outputArr.findIndex(
            elem => elem == e.getAttribute("id")
          );
          outputArr.splice(removeIndex, 1);
        } else {
          e.style.backgroundColor = "grey";
          outputArr.push(e.getAttribute("id"));
        }
        console.log(outputArr);
      })
    );

    all_data.forEach(e =>
      e.addEventListener("mouseover", () => {
        if (isMouseDown) {
          // if the grid is grey, change it to white
          if (e.style.backgroundColor == "grey") {
            e.style.backgroundColor = "white";
            let removeIndex = outputArr.findIndex(
              elem => elem == e.getAttribute("id")
            );
            outputArr.splice(removeIndex, 1);
          } else {
            e.style.backgroundColor = "grey";
            outputArr.push(e.getAttribute("id"));
          }
          console.log(outputArr);
        }
      })
    );
    all_data.forEach(e =>
      e.addEventListener("mouseup", function() {
        isMouseDown = false;
      })
    );

    return table;
  }

  render() {
    const table = this.grid_generate();
    return (
      <div id="grid_container" ref={node => node.appendChild(table)}></div>
    );
  }
}
export default ScheduleGrid;
