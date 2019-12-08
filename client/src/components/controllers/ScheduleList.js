import React from 'react';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";


// Also modify switch statement in sortFunction if modifying below sorts
let SORT_OPTIONS = ["Sort by GPA", "Sort by CAPE Ratings", "Sort by Workload", "Sort by Minimum Days"];

class ScheduleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort_options: SORT_OPTIONS,
            schedule_list: this.props.schedule_list
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ schedule_list: nextProps.schedule_list })
    }

    sortFunction = (event) => {
        let sort_func_name = event.target.value;

        let schedule_list = this.props.schedule_list;

        let currentScheduleIndex = this.props.selectedIndex
        let currentSchedule = null

        if (currentScheduleIndex >= 0) {
            currentSchedule = this.props.schedule_list[currentScheduleIndex]
        }

        switch(sort_func_name) {
            case "Sort by GPA":
                schedule_list.sort(
                    function(schedule1, schedule2) {
                        return schedule2['gpa'] - schedule1['gpa']; // Best to worst
                    }
                );
                break;
            case "Sort by CAPE Ratings":
                schedule_list.sort(
                    function(schedule1, schedule2) {
                        return schedule2['class_rating'] - schedule1['class_rating'];
                    }
                );
                break;
            case "Sort by Workload":
                schedule_list.sort(
                    function(schedule1, schedule2) {
                        return schedule1['workload'] - schedule2['workload'];
                    }
                );
                break;
            case "Sort by Minimum Days":
                schedule_list.sort(
                    function(schedule1, schedule2) {
                        return schedule1['num_days'] - schedule2['num_days'];
                    }
                );
                break;
            case "Sort by Maximum Average Gap":
                break;
            default:
                console.error(sort_func_name + " is not a valid sort");
        }

        schedule_list.forEach(function(schedule, schedule_index) {
            if (schedule === currentSchedule) {
                currentScheduleIndex = schedule_index
            }
        })

        this.setState({schedule_list: schedule_list,},  () => {
            this.props.onClick(currentSchedule, currentScheduleIndex, true)
            }
        )

    };

    render() {
        return (
            <List>
                <select onChange={this.sortFunction}>
                    <option value="">Choose Sort Option</option>
                    {
                        this.state.sort_options.map(option => (
                            <option value={option}>{option}</option>
                        ))
                    }
                </select>

                {
                    this.state.schedule_list.map((item, index) => (
                        <ListItem selected={this.props.selectedIndex === index} onClick={() => this.props.onClick(item, index)} button>
                            <ListItemText primary={`GPA: ${item['gpa'] == -1 ? "N/A" : item['gpa'].toFixed(2)}\nCAPE: ${item['class_rating'] == -1 ? "N/A" : item['class_rating'].toFixed(2)}\n
                            Workload: ${item['workload'] == 0 ? "N/A": item['workload'].toFixed(2)}\nDays: ${item['num_days']}`}  />
                        </ListItem>
                    ))
                }
            </List>
        )
    }
}

export default ScheduleList;