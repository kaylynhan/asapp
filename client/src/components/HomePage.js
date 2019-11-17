import React from "react";
import SignUp from "../components/Signup.js"
import "./HomePage.css"
import NavigationBar from "../components/NavigationBar.js"
import "../App.css";
// import "./AddedCourses.css"; no file
// import AddedCourses from "./AddedCourses.js";
import CourseList from "./CourseList.js";
import CourseInput from "./CourseInput.js";
//import UnitSlider from "../components/UnitSlider" no file from that
import Popup from "./Popup.js"
import Tooltip from "./Tooltip.js"
/* import "rc-slider/assets/index.css"; */

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = { showLogin: false };
    }

    toggleLogin() {
        this.setState({
            showLogin: !this.state.showLogin
        });
    }

    render() {
        return (
            <div>
                <div id="page_container">
                    <header>
                        <NavigationBar />
                        <Popup x="0px" y="0px"/>
                        <Tooltip info="aaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb ccccccccccccc dddddddd"/>
                    </header>
                    <div id="left_sidebar">
                        <div id="search_input">
                            <p> Search_input</p>
                            <CourseInput />
                        </div>
                        <div id="search_result">
                            <p> Search_result</p>
                            <CourseList />
                        </div>
                        <div id="generate">
                            <button class="NavBtn">
                                Generate Schedules
                            </button>
                        </div>
                        <div id="need_want">
                            <p> Need vs want</p>
                            /* AddedCourses /> */
                        </div>
                    </div>
                    <div id="schedule_area">
                        <div id="preferences">
                         <div id="unitPref">
                             /* UnitSlider */
                          </div>
                          <div id="minGap">
                          </div>
                          <div id="restrictCommute"></div>
                          <div id="profPref"></div>
                        </div>
                        <div id="sort">
                            <p> sort_by</p>
                        </div>
                        <div id="display_area">
                            <p> grid_area</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;