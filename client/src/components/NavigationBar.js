import React from 'react';
import Login from "./Login";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false, //temporarily can't login
        }
    }
    render() {
        return (
            <div>
                <Login />
            </div>
        )
    }
}

export default NavigationBar;