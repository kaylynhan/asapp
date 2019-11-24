import React from 'react';
import GapSlider from "./GapSlider";
import { UnitSlider, DEFAULT_MIN_UNITS, DEFAULT_MAX_UNITS } from "./UnitSlider";
import "./ScheduleManager.css"
import ProfDropdown from "./ProfDropdown";
import ScheduleList from "./ScheduleList";
import ScheduleGrid from "./ScheduleGrid";

class ScheduleManager extends React.Component {

    // props is a object containing several schedules
    constructor(props) {
        super(props);
        this.state = {
            minUnits: DEFAULT_MIN_UNITS,
            maxUnits: DEFAULT_MAX_UNITS
        };
    }

    // prints an array of schedules that match the given filters
    filterOutSchedules = () => {
        let kept_schedules = [];

        let self = this;

        // Hardcoded numbers for filtering out units
        let course_unit = {
            'CSE 110': 4,
            'CSE 15L': 2
        };

        this.props.schedules.forEach(function (schedule, schedule_index) {
            let total_units = 0;
            schedule['sections'].forEach(function (course, course_index) {
                // let a = axios.get("http://localhost:4000/course/overviews")
                //     .then(res => console.log(res.data))
                //     .catch(err => console.log(err));
                total_units += course_unit[course['course_name']];
            });

            if (total_units >= self.state.minUnits && total_units <= self.state.maxUnits) {
                kept_schedules.push(schedule);
            }
        });
        console.log(kept_schedules);
    };

    handleUnitSliderChange = (value) => {
        this.setState({ minUnits: value[0] });
        this.setState({ maxUnits: value[1] });
        console.log("Updated min/max units in ScheduleManager");
    };

    render() {
        return (
            <div id="schedule_area">
                <div id="preferences">
                    <UnitSlider onChange={this.handleUnitSliderChange} />
                    <GapSlider />
                    <div id="profPref">
                        <ProfDropdown title="Pref Prof" />
                    </div>
                    <div id="profAvoid">
                        <ProfDropdown title="Avoid Prof"></ProfDropdown>
                    </div>
                    <button onClick={this.filterOutSchedules}>Filter</button>
                    <label>
                        Enable Commute Restriction
                        <input type="checkbox"></input>
                    </label>
                </div>
                <div id="sort">
                    <ScheduleList></ScheduleList>
                </div>
                <div id="grid_area"><ScheduleGrid /></div>
            </div>
        )
    }
}

export default ScheduleManager;
