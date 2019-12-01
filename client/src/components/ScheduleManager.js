import React from "react";
import GapSlider from "./GapSlider";
import { UnitSlider, DEFAULT_MIN_UNITS, DEFAULT_MAX_UNITS } from "./UnitSlider";
import "./ScheduleManager.css";
import ProfDropdown from "./ProfDropdown";
import ScheduleList from "./ScheduleList";
import ScheduleGrid from "./ScheduleGrid";
import ScheduleGridReact from "./ScheduleGridReact";
import schedules from '../test/sampleSchedules.json';           // Get schedules from generation (download json from github and place import accordingly)

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
            schedule_list: schedules,                           // Get schedules from generation
            currentSchedule: null                               // Unneeded field? Not used
        };
    }

    // prints an array of schedules that match the given filters
    filterOutSchedules = () => {
        let totalSchedules = this.props.schedule_list;
        //console.log(totalSchedules)

        let filteredSchedules = this.filterOutUnits(totalSchedules);

        // Somebody tell me how to make intellij happy here pls
        if( this.state.prefProfs.length != 0 ){
            filteredSchedules = this.filterOutPrefProfessors(filteredSchedules);
        }

        if (this.state.avoidProfs.length != 0 ){
            filteredSchedules = this.filterOutAvoidProfessors(filteredSchedules);
        }

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

    // For some reason itellij doesnt recognize the below function? maybe i missed some closing bracket?

    // getProfessors = (schedule) => {
    //     let scheduleProfs = [];
    //
    //     schedule.forEach(function(course, course_index) {
    //         scheduleProfs.push(course["sections"][0].professor);
    //     });
    //
    //     return scheduleProfs;
    // };


    // Henrys a cs god
    filterOutUnits = totalSchedules => {
        let self = this;

        let filteredSchedules = [];

        totalSchedules.forEach(function(schedule, schedule_index) {
            let total_units = 0;
            schedule.forEach(function(course, course_index) {
                // let a = axios.get("/course/overviews")
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

    handleUnitSliderChange = value => {
        this.setState({ minUnits: value[0] });
        this.setState({ maxUnits: value[1] });
        console.log("Updated min/max units in ScheduleManager");
    };

    handlePrefProfChange = event => {
        // console.log(this.state) // Use this to check change in state
        console.log(this.state.prefProfs);
        console.log(event.target);
        let prof = event.target.value;
        console.log(prof);

        this.setState(prevState => ({
            prefProfs: [...prevState.prefProfs, prof]
        }));
        console.log(this.state.prefProfs); // Does not update state right away for some reason. Can check with above
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

    renderSection = (startTime, sectionLen) => {
        let x = document.getElementById(startTime);
        console.log(x);
        // return ReactDOM.createPortal(
        //   <div>Hello World</div>,
        //   this.tableNode.current.getElementById("Mon800")
        //);
    };

    clickedSchedule = schedule => {
        this.setState({currentSchedule: schedule});
        console.log(schedule)
    };

    render() {
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
                    <ScheduleList schedule_list={this.state.filteredSchedules} onClick={this.clickedSchedule} />
                </div>
                <div id="grid_area">
                    <ScheduleGrid onMouseUp={this.handleOnMouseUp} />
                </div>
                {this.renderSection("Mon800", "blah")}
            </div>
        );
    }
}

export default ScheduleManager;
