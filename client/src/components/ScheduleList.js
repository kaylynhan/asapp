import React from 'react';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import RequiredTag from "./RequiredTag";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

class ScheduleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schedule_list: ["Schedule1", "Schedule2", "Schedule3"],
            showSortMenu: false,
            sort_options: ["Sort By GPA", "Sort by CAPE Ratings", "Sort by Workload", "Sort by Minimum Days"]
        }
    }

    openSortMenu = () => {
        this.setState({showSortMenu: true})
    };

    render() {
        return (
            <List>
                <select>
                    <option value="">Choose Sort Option</option>
                    {
                        this.state.sort_options.map(options => (
                            <option value={options}>{options}</option>
                        ))
                    }
                </select>

                {this.state.schedule_list.map(item => (
                    <ListItem button>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        )
    }
}

export default ScheduleList