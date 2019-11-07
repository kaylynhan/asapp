import React from 'react';
import SignUp from "../components/Signup.js"

import {Link, NavLink, Route} from 'react-router-dom'
import SchedulePage from '../components/SchedulePage'

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <p>Homepage TODO need to finsh</p>
                <p>Sticking SignUp component here to check connection to server</p>
                <SignUp />
                <Link to="/SchedulePage"> Continue as Guest </Link>
                <Route 
                    path ="/SchedulePage">
                    component={() => <SchedulePage/>}    
                </Route>
            </div>
        )
    }
}

export default HomePage;