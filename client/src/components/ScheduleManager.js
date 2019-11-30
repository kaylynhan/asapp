import React from "react";
import ReactDOM from "react-dom";
import GapSlider from "./GapSlider";
import { UnitSlider, DEFAULT_MIN_UNITS, DEFAULT_MAX_UNITS } from "./UnitSlider";
import "./ScheduleManager.css";
import ProfDropdown from "./ProfDropdown";
import ScheduleList from "./ScheduleList";
import ScheduleGrid from "./ScheduleGrid";
import ScheduleGridReact from "./ScheduleGridReact";
import SectionDetail from "./SectionDetail";

class ScheduleManager extends React.Component {
  // props is a object containing several schedules
  constructor(props) {
    super(props);
    this.state = {
      minUnits: DEFAULT_MIN_UNITS,
      maxUnits: DEFAULT_MAX_UNITS,
      prefProfs: [],
      avoidProfs: [],
      avoidHours: [],
      filteredSchedules: this.props.schedule_list,
      currentSchedule: null
    };

    this.state.filteredSchedules.forEach(function(schedule) {
      let gpa = 0;
      let numb = 0;
      schedule
        .filter(course => course["gpa"] !== -1)
        .forEach(function(course) {
          gpa += course["gpa"];
          numb += 1;
        });
      if (numb !== 0) {
        schedule["gpa"] = gpa / numb;
      } else {
        schedule["gpa"] = -1;
      }

      let class_rating = 0;
      numb = 0;
      schedule
        .filter(course => course["class_rating"] !== -1)
        .forEach(function(course) {
          class_rating += course["class_rating"];
          numb += 1;
        });
      if (numb !== 0) {
        schedule["class_rating"] = class_rating / numb;
      } else {
        schedule["class_rating"] = -1;
      }

      let workload = 0;
      schedule
        .filter(course => course["workload"] !== -1)
        .forEach(function(course) {
          workload += course["workload"];
        });
      schedule["workload"] = workload;

      let class_days = {
        M: false,
        Tu: false,
        W: false,
        Th: false,
        F: false
      };
      schedule.forEach(function(course) {
        course["sections"][0]["meetings"].forEach(function(meeting) {
          if (meeting["day"] in class_days) {
            class_days[meeting["day"]] = true;
          }
        });
      });

      let num_days = 0;
      Object.values(class_days).forEach(function(value) {
        if (value === true) {
          num_days += 1;
        }
      });
      schedule["num_days"] = num_days;
    });
  }

  // prints an array of schedules that match the given filters
  filterOutSchedules = () => {
    let totalSchedules = this.props.schedule_list;
    console.log(totalSchedules);

    let filteredSchedules = this.filterOutUnits(totalSchedules);
    // this.filterOutPrefProfessors(kept_schedules);
    // this.filterOutAvoidProfessors(kept_schedules);

    this.setState({ filteredSchedules: filteredSchedules });
  };

  filterOutUnits = totalSchedules => {
    let self = this;

    let filteredSchedules = [];

    totalSchedules.forEach(function(schedule, schedule_index) {
      let total_units = 0;
      schedule.forEach(function(course, course_index) {
        // let a = axios.get("http://localhost:4000/course/overviews")
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err));
        total_units += course["units"];
      });

      if (
        total_units >= self.state.minUnits &&
        total_units <= self.state.maxUnits
      ) {
        filteredSchedules.push(schedule);
      }
    });

    return filteredSchedules;
  };

  handleUnitSliderChange = value => {
    this.setState({ minUnits: value[0] });
    this.setState({ maxUnits: value[1] });
    console.log("Updated min/max units in ScheduleManager");
  };

  handlePrefProfChange = event => {
    // console.log(this.state) // Use this to check change in state
    console.log(event.target);
    let prof = event.target.value;
    console.log(prof);
    this.setState(prevState => ({
      prefProfs: [...prevState.prefProfs, prof]
    }));
    console.log(this.state); // Does not update state right away for some reason. Can check with above
  };

  handleAvoidProfChange = event => {
    let prof = event.target.value;
    console.log(prof);
    this.setState(prevState => ({
      avoidProfs: [...prevState.avoidProfs, prof]
    }));
    console.log(this.state);
  };

  handleOnMouseUp = arr => {
    this.setState({ avoidHours: arr });
    setTimeout(() => console.log(this.state.avoidHours), 1);
  };

  getOffset = el => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  };

  populateMeetings = schedule => {
    if (this.state.currentSchedule !== null) {
      let outputArr = Array(0);
      schedule.map(course => {
        course.sections.map(section => {
          section.meetings.map(meeting => {
            outputArr.push(meeting);
          });
        });
      });
      return outputArr;
    }
  };

  renderMeeting = meeting => {
    let class_days = {
      M: "Mon",
      Tu: "Tu",
      W: "Wed",
      Th: "Thur",
      F: "Fri"
    };

    if (this.state.currentSchedule !== null) {
      //let meeting = this.state.currentSchedule[0]["sections"][0]["meetings"][0];
      if (meeting.start_time === 0 || meeting.day === "TBA") {
        return;
      }
      let grid_id = class_days[meeting["day"]] + meeting["start_time"];
      let course_elem = document.getElementById(grid_id);
      var bodyRect = document.body.getBoundingClientRect(),
        courseRect = course_elem.getBoundingClientRect();
      let section_detail = (
        <SectionDetail
          left={courseRect.left - bodyRect.left}
          top={courseRect.top - bodyRect.top}
        ></SectionDetail>
      );
      return section_detail;
    }
  };

  clickedSchedule = schedule => {
    this.setState({ currentSchedule: schedule });
  };

  render() {
    let meetings = this.populateMeetings(this.state.currentSchedule);
    console.log(meetings);
    return (
      <div id="schedule_area">
        <div id="preferences">
          <UnitSlider onChange={this.handleUnitSliderChange} />
          {/*<GapSlider />*/}
          <div id="profPref">
            <ProfDropdown
              title="Pref Prof"
              onChange={this.handlePrefProfChange}
            />
          </div>
          <div id="profAvoid">
            <ProfDropdown
              title="Avoid Prof"
              onChange={this.handleAvoidProfChange}
            />
          </div>
          <button onClick={this.filterOutSchedules}>Filter</button>
          <label>
            Enable Commute Restriction
            <input type="checkbox"></input>
          </label>
        </div>
        <div id="sort">
          <ScheduleList
            schedule_list={this.state.filteredSchedules}
            onClick={this.clickedSchedule}
          />
        </div>
        <div id="grid_area">
          <ScheduleGrid onMouseUp={this.handleOnMouseUp} />
        </div>
        {meetings ? meetings.map(meeting => this.renderMeeting(meeting)) : false}
      </div>
    );
  }
}

export default ScheduleManager;
