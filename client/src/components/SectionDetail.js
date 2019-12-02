import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import Tooltip from "./Tooltip.js";
import { red } from "@material-ui/core/colors";

class SectionDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};
  // props should have time, sectionLen, courseId, MeetingType
  // Section number, Professor, Lecture Time, Building, Room Number, CAPE website
  renderSection = () => {
    // 60 minutes is 80 px on the screen
    const MIN_TO_PIX = 80 / 60;
    const course = this.props.course;
    const meeting = this.props.meeting;
    const meetings = this.props.meetings;

    var meetingDetail = (
      <ul>
        <li>Professor: {course.professor} </li>
        <li>Location: {meeting.building + " " + meeting.room_num}</li>
        <li>Prof Rating: {meetings.prof_rating}</li>
        <li>Average GPA: {course.gpa}</li>
        <li>
          CAPE:{" "}
          <a href={course.link} target="_blank">
            Link to CAPE
          </a>
        </li>
      </ul>
    );

    let timeConv = {
      50:50,
      90:50,
      120: 90,
      250:170
    }

    return (
      <div
        className={"Course"}
        style={{
          position: "absolute",
          left: this.props.left,
          top: this.props.top,
          backgroundColor: "#f7edc1",
          height: (timeConv[meeting.end_time - meeting.start_time]) * MIN_TO_PIX,
          width: this.props.width,
          borderRadius: "10px"
        }}
      >
        <b>{course.course}</b>
        <br></br>
        <i>{meeting.type}</i>
        <Tooltip info={meetingDetail} style={{ margin: "0 auto" }}></Tooltip>
      </div>
    );
  };
  render() {
    //return ReactDOM.createPortal(<h1 id="highest">Portal!</h1>, portalRt);
    return this.renderSection();
  }
}
export default SectionDetail;
