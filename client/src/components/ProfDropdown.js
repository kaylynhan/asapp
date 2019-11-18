import React from 'react';

class ProfDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // pass in your list of profs here
            ProfList: ["Bowers, Adam", "Ord, Rick", "Zhang, Danna", "Gillespie, Gary"]
        }
    }

    render() {
        var dropDown =
            <select>
                <option value="">--Select your Professor--</option>
                {
                    this.state.ProfList.map(name => (
                        <option value={name}>{name}</option>
                    ))
                }
            </select>

        return (
            <div>
                <p style={{textAlign:"center"}}>{this.props.title}</p>
                {dropDown}
                {dropDown}
                {dropDown}
            </div>
        )
    }
}

export default ProfDropdown 