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

    render() {
        return (
            <List>
                <select onChange={this.props.sortFunction}>
                    <option value="">Choose Sort Option</option>
                    {
                        this.state.sort_options.map(option => (
                            <option value={option}>{option}</option>
                        ))
                    }
                </select>

                {
                    this.props.schedule_list.map((item, index) => (
                        <ListItem onClick={() => this.props.onClick(item)} button>
                            <ListItemText primary={`GPA: ${item.gpa}\nCape: ${item.class_rating}\n
                            Workload: ${item.workload}\nDays: ${item.num_days}`}  />
                        </ListItem>
                    ))
                }
            </List>
        )
    }
}

export default ScheduleList;