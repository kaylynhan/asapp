// import "./AddedCourses.css"; no file
// import AddedCourses from "./AddedCourses.js";
import CourseManager from "./CourseManager";
import CourseInput from "./CourseInput.js";
//import UnitSlider from "../components/UnitSlider" no file from that
/* import "rc-slider/assets/index.css"; */
import React from "react";
import SignUp from "../components/Signup.js";
import "./homepage.css";
import NavigationBar from "../components/NavigationBar.js";
import "../App.css";
import "./CoursePlan.css";
import CoursePlan from "./CoursePlan.js";
import CourseList from "./CourseList.js";
import UnitSlider from "../components/UnitSlider";
import "rc-slider/assets/index.css";
import GapSlider from "./GapSlider.js";
import ProfDropdown from "./ProfDropdown.js";
import "./table.css";
import ScheduleManager from "./ScheduleManager";
import Popup from "./Popup.js";
import Tooltip from "./Tooltip.js";
import ScheduleList from "./ScheduleList";
/* import "rc-slider/assets/index.css"; */

import sample_schedules from '../test/sampleSchedules';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      schedules: null
    };
  }

  homePageCallBack = item => {
    this.setState({ schedules: item });
  };

  toggleLogin() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  render() {
    return (
      <div id="page_container">
        <header>
          <NavigationBar />
        </header>
        <div id="left_sidebar">
          <CourseManager callback={this.homePageCallBack} />
        </div>
        <div>
          <ScheduleManager schedule_list={sample_schedules}/>
        </div>
      </div>
    );
  }
}
export default HomePage;
