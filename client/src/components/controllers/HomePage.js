import React from "react";

import ScheduleManager from "./ScheduleManager";
import CourseManager from "./CourseManager";
import NavigationBar from "../views/NavigationBar.js";

import "../../css/HomePage.css";
import "../../App.css";
import "../../css/CoursePlan.css";
import "../../css/table.css";
import "rc-slider/assets/index.css";


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      schedules: []
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
          <ScheduleManager schedule_list={this.state.schedules}/>
        </div>
      </div>
    );
  }
}
export default HomePage;
