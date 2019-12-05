import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

class ProfDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // pass in your list of profs here
            ProfList: this.props.profs,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ProfList: nextProps.profs });
    }

    render() {
        return (
            <div>
                <h6 style={{ textAlign: "center" }}>{this.props.title}</h6>

                    <select onChange={this.props.onChange}>
                        <option value="">--Select your Professor--</option>
                        {
                            this.state.ProfList.map(name => (
                                <option value={name}>{name}</option>
                            ))
                        }
                    </select>



            </div>
        )
    }
}

export default ProfDropdown 