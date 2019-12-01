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
    var MeetingDetail = (
      <ul>
        <li>Professor: {this.props.Professor} </li>
        <li>Lecture Time: {this.props.LectureTime}</li>
        <li>Building: {this.props.Building}</li>
        <li>Room Number: {this.props.RoomNumber}</li>
        <li>
          CAPE: <a href={this.props.CAPE} />
          {this.props.CAPE}
        </li>
      </ul>
    );

    return (
      <div
        className={"Course"}
        style={{
          position:"absolute",
          left: this.props.left,
          top: this.props.top,
          backgroundColor:"#f7edc1",
          height:"80px",
          width:"150px",
          borderRadius:"10px",

        }}
      >
        <b>{this.props.CourseId}</b>
        <br></br>
        <i>{this.props.MeetingType}</i>
      </div>
    );
  };
  render() {
    //return ReactDOM.createPortal(<h1 id="highest">Portal!</h1>, portalRt);
    return this.renderSection();
  }
}
export default SectionDetail;
