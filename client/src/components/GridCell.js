import React from "react";
import ReactDOM from "react-dom";
import SectionDetail from "./SectionDetail";

class GridCell extends React.Component {
  state = {
    isMouseDown: false
  };
  render() {
    return (
      <td
        id={this.props.id}
        onMouseDown={this.props.onMouseDown}
        onMouseOver={this.props.onMouseOver}
        onMouseUp={this.props.onMouseUp}
      >
        <SectionDetail
          time="Mon800"
          sectionLen={50}
          CourseId="MATH140A"
          MeetingType="LE"
          Section="A01"
          Professor="Tarek M Elgindi"
          LectureTime="2:00pm-3:20pm"
          Building="APM"
          RoomNumber="B402A"
          CAPE="CAPE.com"
        />
      </td>
    );
  }
}

export default GridCell;
