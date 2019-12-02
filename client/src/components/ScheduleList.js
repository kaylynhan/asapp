import React from 'react';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import RequiredTag from "./RequiredTag";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

// Also modify switch statement in sortFunction if modifying below sorts
let SORT_OPTIONS = ["Sort by GPA", "Sort by CAPE Ratings", "Sort by Workload", "Sort by Minimum Days", "Sort by Maximum Average Gap"];

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

        this.setState({schedule_list: schedule_list})
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
                        <ListItem onClick={() => this.props.onClick(item)} button>
                            <ListItemText primary={`GPA: ${item['gpa']}\nCape: ${item['class_rating']}\n
                            Workload: ${item['workload']}\nDays: ${item['num_days']}`}  />
                        </ListItem>
                    ))
                }
            </List>
        )
    }
}

export default ScheduleList;