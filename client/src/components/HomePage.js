import CourseManager from "./CourseManager";
import React from "react";
import "./homepage.css";
import NavigationBar from "../components/NavigationBar.js";
import "../App.css";
import "./CoursePlan.css";
import "rc-slider/assets/index.css";
import "./table.css";
import ScheduleManager from "./ScheduleManager";

import sample_schedules from '../test/sampleSchedules';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      schedules: null,
      profs: null
    };
  }

  homePageCallBack = obj => {
    this.setState({ schedules: obj.schedules, profs: obj.profs });
  };

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
          <ScheduleManager schedule_list={this.state.schedules} profs={this.state.profs}/>
        </div>
      </div>
    );
  }
}
export default HomePage;
