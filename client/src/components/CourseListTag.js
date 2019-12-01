import React from "react"
import Popup from "./Popup"

class CourseListTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            obj: this.props.courseObj
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.props.addCourse(this.props.courseObj)
    }


    render() {

        return(
            <div>
                {this.props.courseObj.id} 
                <button onClick={() => this.props.addCourse(this.props.courseObj)}>+</button>
                <Popup display="Details" info={
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
                            GPA: {this.props.courseObj.gpa}
                        </div>
                        <div>
                            Workload: {this.props.courseObj.workload}
                        </div>
                        <div>
                            Professor Rating: {this.props.courseObj.prof_rating}
                        </div>
                    </ul>
                </div>
                }/>
            </div>
        )
    }

}

export default CourseListTag