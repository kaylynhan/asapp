import React from "react"
import "../App.css"
import Logo from "../images/asapp_logo_transparent.png"
import "./NavigationBar.css"

import {Link, NavLink, Route} from "react-router-dom"


 class NavigationBar extends React.Component {
     constructor(props){
        super(props)
    }
     render() {
         return (
            <div className="App-header">
                <div className="NavbarLeft">
                </div>
                <img src={Logo} className="App-logo" />
                <div className="NavbarRight">
                   ACADEMIC SCHEDULING APPLICATION
                </div>
             </div>
         )
     }
 }

export default NavigationBar
