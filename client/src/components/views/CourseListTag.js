import React from "react"
import Popup from "./Popup"

class CourseListTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            obj: this.props.courseObj
        }
        this.state.obj.id = this.state.obj.department + " " + this.state.obj.number;
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.props.addCourse(this.props.courseObj)
    }


    render() {

        return(
            <div>
                {this.state.obj.id}
 
				<div style={{float: "right"}}>
				<Popup className="coursePopup" display="Details" info={
				<div id="popupDisplay">
                    <h1>{this.props.courseObj.name}</h1>
                    <ul>
                        <div>
                            Course: {this.props.courseObj.id}
                        </div>
                        <div>
                            Prerequisites: {this.props.courseObj.prereqs}
                        </div>
                        <div>
                            Units: {this.props.courseObj.units}
                        </div>
                        <div>
                            Description: {this.props.courseObj.description}
                        </div>
                        <div>
                            GPA: {this.props.courseObj.gpa == -1 ? "N/A" : this.props.courseObj.gpa.toFixed(2)}
                        </div>
                        <div>
                            Workload: {this.props.courseObj.workload == -1 ? "N/A" : this.props.courseObj.workload.toFixed(2)}
                        </div>
                        <div>
                            Course Rating: {this.props.courseObj.class_rating == undefined ? "N/A" : this.props.courseObj.class_rating.toFixed(2)}
                        </div>
                    </ul>
                </div>
                }/>
				</div>
				<button className="addBtn" onClick={() => this.props.addCourse(this.props.courseObj)}>+</button>
            </div>
        )
    }

}

export default CourseListTag
