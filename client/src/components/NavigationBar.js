import React from "react"
import Login from "./Login"
import SchedulePage from "./SchedulePage"
import "../App.css"
import Logo from "../images/asapp_logo_transparent.png"

import {Link, NavLink, Route} from "react-router-dom"


 class NavigationBar extends React.Component {
     constructor(props){
        super(props)
        this.state = { showLogin: false }
    }

    toggleLogin() {
        this.setState({
            showLogin: !this.state.showLogin
        })
    }
     render() {
         return (
            <div className="App-header">
                <div className="NavbarLeft">
                </div>
                <img src={Logo} className="App-logo" />
                <div className="NavbarRight">
                <Link to="/SchedulePage">
                  <button className="NavBtn"> VIEW SAVED </button>
                </Link>
                  <button id="login" className="NavBtn" onClick={this.toggleLogin.bind(this)}>LOGIN</button>

                  {this.state.showLogin ?
                    <Login
                        text="Login / Create Account"
                        closeLogin={this.toggleLogin.bind(this)}
                    />
                    :null
                  }
                <Route
                    path ="./SchedulePage"
                    component={() => <SchedulePage/>}>
                </Route>
                </div>
             </div>
         )
     }
 }

export default NavigationBar
