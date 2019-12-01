import React from "react"


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
            </div>
        )
    }

}

export default CourseListTag