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
            <div style={{paddingRight: "60px", paddingLeft: "20px"}}>
                {this.state.obj.id}
 
				<div style={{float: "right"}}>
				<Popup display="Details" info={
				<div id="popupDisplay">
                    <h2 style={{textAlign: "center"}}>{this.props.courseObj.name}</h2>
                    <br />
                    <ul>
                        <div>
                            <strong>Description:</strong> {this.props.courseObj.description}
                        </div>
                        <div>
                            <strong>Prerequisites:</strong> {this.props.courseObj.prereqs}
                        </div>
                        <div>
                        <div>
                            <strong>Course Rating:</strong> {this.props.courseObj.class_rating == undefined ? "N/A" : this.props.courseObj.class_rating.toFixed(2)}
                        </div>
                            <strong>GPA:</strong> {this.props.courseObj.gpa == -1 ? "N/A" : this.props.courseObj.gpa.toFixed(2)}
                        </div>
                        <div>
                            <strong>Workload:</strong> {this.props.courseObj.workload == -1 ? "N/A" : this.props.courseObj.workload.toFixed(2)} hrs/week
                        </div>
                    </ul>
                </div>
                }/>
				</div>
				<button className="popupBtn" onClick={() => this.props.addCourse(this.props.courseObj)}>+</button>
            </div>
        )
    }

}

export default CourseListTag
