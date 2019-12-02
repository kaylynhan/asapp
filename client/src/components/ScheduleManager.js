import React from "react";
import GapSlider from "./GapSlider";
import { UnitSlider, DEFAULT_MIN_UNITS, DEFAULT_MAX_UNITS } from "./UnitSlider";
import "./ScheduleManager.css";
import ProfDropdown from "./ProfDropdown";
import ScheduleList from "./ScheduleList";
import ScheduleGrid from "./ScheduleGrid";
import schedules from '../test/sampleSchedules.json';           // Get schedules from generation (download json from github and place import accordingly)
import SectionDetail from './SectionDetail';

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
            schedules: this.props.schedule_list,
            filteredSchedules: this.props.schedule_list,                         // Get schedules from generation
            currentSchedule: null,                               
            grid_draggable:true
        };
    }
    componentDidUpdate() {
        if (this.state.schedules != this.props.schedule_list){
            this.setState({
                schedules:this.props.schedule_list,
                filteredSchedules: this.props.schedule_list
            });
        }
    }
    // prints an array of schedules that match the given filters

    sortFunction = (event) => {
        let sort_func_name = event.target.value;

        let schedule_list = this.state.filteredSchedules;

        switch(sort_func_name) {
            case "Sort by GPA":
                schedule_list.sort(
                    function(schedule1, schedule2) {
                        return schedule2['gpa'] - schedule1['gpa']; // Best to worst
                    }
                );
                console.log("Sorting by GPA");
                break;
            case "Sort by CAPE Ratings":
                schedule_list.sort(
                    function(schedule1, schedule2) {
                        return schedule2['class_rating'] - schedule1['class_rating'];
                    }
                );
                console.log("Sorting by CAPE Ratings");
                break;
            case "Sort by Workload":
                schedule_list.sort(
                    function(schedule1, schedule2) {
                        return schedule1['workload'] - schedule2['workload'];
                    }
                );
                console.log("Sorting by Workload");
                break;
            case "Sort by Minimum Days":
                schedule_list.sort(
                    function(schedule1, schedule2) {
                        return schedule1['num_days'] - schedule2['num_days'];
                    }
                );
                console.log("Sorting by Minimum Days");
                break;
            case "Sort by Maximum Average Gap":
                break;
            default:
                console.error(sort_func_name + " is not a valid sort");
        }

        this.setState({filteredSchedules: schedule_list})
    };

    filterOutSchedules = () => {
        let totalSchedules = this.props.schedule_list;
        let avoidTimes = this.state.avoidHours;

        let filteredSchedules  = this.filterOutUnits(totalSchedules);

        // Somebody tell me how to make intellij happy here pls
        if( this.state.prefProfs.length != 0 ){
            filteredSchedules = this.filterOutPrefProfessors(filteredSchedules);
        }

        if (this.state.avoidProfs.length != 0 ){
            filteredSchedules = this.filterOutAvoidProfessors(filteredSchedules);
        }

        filteredSchedules = this.filterOutAvoidTimes(avoidTimes, filteredSchedules);

        this.setState({filteredSchedules: filteredSchedules});
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
                scheduleProfs.push(course["sections"][0].professor);
            });

            // Checks if schedProfs is subset of prefProfs
            let includesAllPrefProfs = prefProfs.every(function(val) { return scheduleProfs.indexOf(val) >= 0; });

            if ( includesAllPrefProfs ){
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
                scheduleProfs.push(course["sections"][0].professor);
            });

            // Sets flag if schedule contains any of the avoid profs
            let noAvoidProfs = true;
            avoidProfs.forEach(function(avoidProf, avoidProf_index) {
                if ( scheduleProfs.includes(avoidProf) ){
                    noAvoidProfs = false;
                }
            });

            if ( noAvoidProfs ){
                filteredSchedules.push(schedule);
            }
        });

        return filteredSchedules;
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

        return filteredSchedules
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
                meetings = course["sections"][0].meetings;

                // Loop through each meeting in course
                meetings.forEach(function(meeting, meeting_index) {

                    // For each meeting, test against all avoidTimes
                    avoidTimes.forEach(function(avoidTime, avoidTime_index) {

                        // Get Day (mon, tu, etc.)
                        let avoidDay =  avoidTime.match(/[a-zA-Z]+/g);

                        // Convert to json convention
                        switch (avoidDay[0]){
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

                        if (meeting.day.includes(avoidDay)){

                            let start = meeting.start_time;
                            let end = meeting.end_time;

                            if( start <= avoidChunk && avoidChunk <= end){
                                noConflicts = false;
                            }
                        }
                    });
                });
            });

            if( noConflicts ){
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

    populateMeetings = schedule => {
        if (this.state.currentSchedule !== null) {
            let outputArr = Array(0);
            schedule.map(course => {
                course.sections.map(section => {
                    section.meetings.map(meeting => {
                        let courseID = course["department"] + " " + course["number"];
                        outputArr.push({
                            meeting: meeting,
                            section: section,
                            course: course
                        });
                    });
                });
            });
            console.log(outputArr);
            return outputArr;
        }
    };

    renderMeeting = meeting_course_section => {
        let class_days = {
            M: "Mon",
            Tu: "Tu",
            W: "Wed",
            Th: "Thur",
            F: "Fri"
        };
        let meeting = meeting_course_section["meeting"];
        let course = meeting_course_section["course"];
        let section = meeting_course_section["section"];

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
                    section={section}
                    width = {width}
                ></SectionDetail>
            );
            return section_detail;
        }
    };

    clickedSchedule = schedule => {
        if (schedule === this.state.currentSchedule) {
            this.setState({currentSchedule: null});
            this.state.grid_draggable = true;
            return
        }
        this.setState({ currentSchedule: schedule });
        this.setState({grid_draggable:false});
        console.log(this.state.currentSchedule);
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
                </div>
                <div id="sort">
                    <ScheduleList
                        schedule_list={this.state.filteredSchedules}
                        onClick={this.clickedSchedule}
                        sortFunction = {this.sortFunction}
                        sort_options = {this.sort_options}
                    />
                </div>
                <div id="grid_area">
                    <ScheduleGrid onMouseUp={this.handleOnMouseUp} draggable={this.state.grid_draggable}/>
                </div>
                {meetings
                    ? meetings.map(meeting => this.renderMeeting(meeting))
                    : false}
            </div>
        );
    }
}

export default ScheduleManager;