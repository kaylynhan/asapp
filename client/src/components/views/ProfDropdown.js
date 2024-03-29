import React from 'react';

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
                <p style={{textAlign:"center"}}>{this.props.title}</p>

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