import React from "react";
import GapSlider from "./GapSlider";
import { UnitSlider, DEFAULT_MIN_UNITS, DEFAULT_MAX_UNITS } from "./UnitSlider";
import "./ScheduleManager.css";
import ProfDropdown from "./ProfDropdown";
import ScheduleList from "./ScheduleList";
import ScheduleGrid from "./ScheduleGrid";
import schedules from "../test/sampleSchedules.json"; // For testing only
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
      filteredSchedules: [],
      schedule_list: [],//schedules, // Get schedules from generation
      currentSchedule: null,
      grid_draggable: true,
      schedulesWereFiltered: false,
      scheduleProfs: this.getProfessors(this.props.schedule_list),
    };
    // update the stats
    //this.calculateScheduleStats();
  }
  componentWillReceiveProps(nextProps) {
    let nextProfs = this.getProfessors(nextProps.schedule_list)
    this.setState({
      schedule_list: nextProps.schedule_list,
      scheduleProfs: nextProfs
    });
    this.setState({ schedulesWereFiltered : false })
  }
/*
  calculateScheduleStats = () => {
    if (this.state.schedule_list !== null) {
      this.state.schedule_list.forEach(function(schedule) {
        // calculate GPA
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

        // calculate class rating
        let class_rating = 0;
        numb = 0;
        schedule
          .filter(course => course["prof_rating"] !== -1)
          .forEach(function(course) {
            class_rating += course["prof_rating"];
            numb += 1;
          });
        if (numb !== 0) {
          schedule["class_rating"] = class_rating / numb;
        } else {
          schedule["class_rating"] = -1;
        }

        // calculate workload
        let workload = 0;
        schedule
          .filter(course => course["workload"] !== -1)
          .forEach(function(course) {
            workload += course["workload"];
          });
        schedule["workload"] = workload;


        //calculate class_days
        let class_days = {
          M: false,
          Tu: false,
          W: false,
          Th: false,
          F: false
        };



		//Calculates total number of days for a schedule.
		var discoveredDays = []
		discoveredDays.push(schedule[0])

		for(var k=0; k < schedule.length; k++)
		{
			for(var i=0;i<schedule[k].meetings.length;i++)
			{
				for(var j=0; j<discoveredDays.length; j++)
					if(schedule[k].meetings[i].day != discoveredDays[j])
						discoveredDays.push(schedule[k].meetings[i].day)
			}
		}

		schedule['num_days'] = discoveredDays.length;


        // TODO class_days
        // schedule.forEach(function(course) {
        //   course["meetings"].forEach(function(meeting) {
        //     if (meeting["day"] in class_days) {
        //       class_days[meeting["day"]] = true;
        //     }
        //   });
        // });


        // calculate number of days
        let num_days = 0;
        Object.values(class_days).forEach(function(value){
            if(value === true){
                num_days += 1;
            }
        })
        schedule['num_days'] = num_days;

      });
    }
  };
*/
  componentDidUpdate() {
    console.log("ScheduleManager updated");
    console.log("this.props.schedule_list is", this.props.schedule_list);
    //this.calculateScheduleStats();
  }
  // prints an array of schedules that match the given filters

  // calculate the stats displayed in scheduleList
  filterOutSchedules = () => {
    let totalSchedules = this.props.schedule_list;
    let avoidTimes = this.state.avoidHours;
    console.log("IN FILTER SCHEDULES")
    console.log("total:",totalSchedules)
    let filteredSchedules = this.filterOutUnits(totalSchedules);
    console.log(filteredSchedules)
    // Somebody tell me how to make intellij happy here pls
    if (this.state.prefProfs.length != 0) {
      filteredSchedules = this.filterOutPrefProfessors(filteredSchedules);
    }

    if (this.state.avoidProfs.length != 0) {
      filteredSchedules = this.filterOutAvoidProfessors(filteredSchedules);
    }

    filteredSchedules = this.filterOutAvoidTimes(avoidTimes, filteredSchedules);

    this.setState({ filteredSchedules: filteredSchedules });
    this.setState({ schedulesWereFiltered: true });
    console.log(filteredSchedules)
  };

  getProfessors = (totalSchedules) => {
      if(!totalSchedules)
        return Array(0)

      let scheduleProfs = [];

      totalSchedules.forEach(function(schedule, schedule_index) {
        schedule.forEach(function(course, course_index) {
          scheduleProfs.push(course.professor);
        });
      });

      let unique = [...new Set(scheduleProfs)];
      return unique;
  };

  filterOutPrefProfessors = totalSchedules => {
    let filteredSchedules = [];

    let prefProfs = [];
    prefProfs = this.state.prefProfs;

    // Loop through each schedule
    totalSchedules.forEach(function(schedule, schedule_index) {
      let scheduleProfs = [];

      // Extract all profs from schedule
      schedule.forEach(function(course, course_index) {
        scheduleProfs.push(course.professor);
      });

      // Checks if schedProfs is subset of prefProfs
      let includesAllPrefProfs = prefProfs.every(function(val) {
        return scheduleProfs.indexOf(val) >= 0;
      });

      if (includesAllPrefProfs) {
        filteredSchedules.push(schedule);
      }
    });

    return filteredSchedules;
  };

  filterOutAvoidProfessors = totalSchedules => {
    let filteredSchedules = [];

    let avoidProfs = [];
    avoidProfs = this.state.avoidProfs;

    // Loop through each schedule
    totalSchedules.forEach(function(schedule, schedule_index) {
      let scheduleProfs = [];

      // Extract all profs from schedule
      schedule.forEach(function(course, course_index) {
        scheduleProfs.push(course.professor);
      });

      // Sets flag if schedule contains any of the avoid profs
      let noAvoidProfs = true;
      avoidProfs.forEach(function(avoidProf, avoidProf_index) {
        if (scheduleProfs.includes(avoidProf)) {
          noAvoidProfs = false;
        }
      });

      if (noAvoidProfs) {
        filteredSchedules.push(schedule);
      }
    });

    return filteredSchedules;
  };

  filterOutUnits = totalSchedules => {
    console.log("IN TOTAL")
    console.log(totalSchedules)
    let self = this;

    let filteredSchedules = [];

    totalSchedules.forEach(function(schedule, schedule_index) {
      let total_units = 0;
      schedule.forEach(function(course, course_index) {
        console.log("course:", course)
        total_units += course["units"];
      });

      if (
        total_units >= self.state.minUnits &&
        total_units <= self.state.maxUnits
      ) {
        console.log("pushing: ", schedule)
        filteredSchedules.push(schedule);
      }
    });

    return filteredSchedules;
  };

  // Ugly quad nested loop. Pretty sure it works tho
  filterOutAvoidTimes = (avoidTimes, totalSchedules) => {
    let filteredSchedules = [];

    // Loop through each schedule
    totalSchedules.forEach(function(schedule, schedule_index) {
      let noConflicts = true;

      // Loop through each course in schedule
      schedule.forEach(function(course, course_index) {
        let meetings = [];
        meetings = course.meetings;

        // Loop through each meeting in course
        meetings.forEach(function(meeting, meeting_index) {
          // For each meeting, test against all avoidTimes
          avoidTimes.forEach(function(avoidTime, avoidTime_index) {
            // Get Day (mon, tu, etc.)
            let avoidDay = avoidTime.match(/[a-zA-Z]+/g);

            // Convert to json convention
            switch (avoidDay[0]) {
              case "Mon":
                avoidDay = "M";
                break;
              case "Tu":
                break;
              case "Wed":
                avoidDay = "W";
                break;
              case "Thur":
                avoidDay = "Th";
                break;
              case "Fri":
                avoidDay = "F";
                break;
            }

            // Get time (830, 1150, etc.)
            let avoidChunk = avoidTime.match(/\d+/g);
            avoidChunk = avoidChunk[0];

            if (meeting.day.includes(avoidDay)) {
              let start = meeting.start_time;
              let end = meeting.end_time;

              if (start <= avoidChunk && avoidChunk <= end) {
                noConflicts = false;
              }
            }
          });
        });
      });

      if (noConflicts) {
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

    if (prof != ""){
      this.setState(prevState => ({
        prefProfs: [prof] // [...prevState.prefProfs, prof]
      }));
    }else{
      this.setState(prevState => ({
        prefProfs: [] // [...prevState.prefProfs, prof]
      }));
    }

    console.log(this.state); // Does not update state right away for some reason. Can check with above
  };

  handleAvoidProfChange = event => {
    let prof = event.target.value;
    console.log(prof);

    if(prof != ""){
      this.setState(prevState => ({
        avoidProfs: [prof] //[...prevState.avoidProfs, prof]
      }));
    }else{
      this.setState(prevState => ({
        avoidProfs: [] //[...prevState.avoidProfs, prof]
      }));
    }
    console.log(this.state);
  };

  handleOnMouseUp = arr => {
    this.setState({ avoidHours: arr });
    setTimeout(() => console.log(this.state.avoidHours), 1);
  };

  populateMeetings = schedule => {
    if (this.state.currentSchedule !== null) {
      let outputArr = Array(0);
      schedule.map(course => {
        let meetings = course.meetings;
        meetings.map(meeting => {
          // for each meeting, find its corresponding meetings and course
          outputArr.push({
            course: course,
            meeting: meeting,
            meetings: meetings
          });
        });
      });
      console.log(outputArr);
      return outputArr;
    }
  };

  renderMeeting = meeting_meetings_course => {
    let class_days = {
      M: "Mon",
      Tu: "Tu",
      W: "Wed",
      Th: "Thur",
      F: "Fri"
    };
    // parse meeting and course and meetings
    let course = meeting_meetings_course.course;
    let meeting = meeting_meetings_course.meeting;
    let meetings = meeting_meetings_course.meetings;

    if (this.state.currentSchedule !== null) {
      //let meeting = this.state.currentSchedule[0]["sections"][0]["meetings"][0];
      if (meeting.start_time === 0 || meeting.day === "TBA") {
        return;
      }
      let grid_id = class_days[meeting["day"]] + meeting["start_time"];
      let course_elem = document.getElementById(grid_id);
      var bodyRect = document.body.getBoundingClientRect(),
        courseRect = course_elem.getBoundingClientRect();
      var width = courseRect.right - courseRect.left;
      let section_detail = (
        <SectionDetail
          left={courseRect.left - bodyRect.left}
          top={courseRect.top - bodyRect.top}
          course={course}
          meeting={meeting}
          meetings={meetings}
          width={width}
        ></SectionDetail>
      );
      return section_detail;
    }
  };

  clickedSchedule = schedule => {
    if (schedule === this.state.currentSchedule) {
      this.setState({ currentSchedule: null });
      this.state.grid_draggable = true;
      return;
    }
    this.setState({ currentSchedule: schedule });
    this.setState({ grid_draggable: false });
    console.log(this.state.currentSchedule);
  };

  render() {
    let meetings = this.populateMeetings(this.state.currentSchedule);
    let schedulesWereFiltered = this.state.schedulesWereFiltered;
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
              profs={this.state.scheduleProfs}
            />
          </div>
          <div id="profAvoid">
            <ProfDropdown
              title="Avoid Prof"
              onChange={this.handleAvoidProfChange}
              profs={this.state.scheduleProfs}
            />
          </div>
          <button onClick={this.filterOutSchedules}>Filter</button>
        </div>
        <div id="sort">
          <ScheduleList
            schedule_list={
              schedulesWereFiltered
                ? this.state.filteredSchedules
                : this.state.schedule_list
            }
            onClick={this.clickedSchedule}
          />
        </div>
        <div id="grid_area">
          <ScheduleGrid
            onMouseUp={this.handleOnMouseUp}
            draggable={this.state.grid_draggable}
          />
        </div>
        {meetings
          ? meetings.map(meeting => this.renderMeeting(meeting))
          : false}
      </div>
    );
  }
}

export default ScheduleManager;
