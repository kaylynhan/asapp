import React from 'react';
import Login from './Login';
import SchedulePage from './SchedulePage';
import '../App.css';
import Logo from '../images/asapp_logo_transparent.png'

import {Link, NavLink, Route} from 'react-router-dom'


 class NavigationBar extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
            loggedIn: this.props.loggedIn, //temporarily can't login
         }
     }
     render() {
         return (
            <div class="App-header">
                <div class="NavbarLeft">
                </div>
                <img src={Logo} class="App-logo" />
                <div class="NavbarRight">
                <Link to="/SchedulePage">
                  <button class="NavBtn"> VIEW SAVED </button>
                </Link>
                <button class="NavBtn">LOGIN</button>
                <Route
                    path ="./SchedulePage"
                    component={() => <SchedulePage/>}>
                </Route>
                </div>
             </div>
         )
     }
 }

export default NavigationBar;
