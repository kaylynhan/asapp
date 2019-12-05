import React from "react"
import "../../css/CoursePlan.css"

class OptionalTag extends React.Component {
    constructor(props) {
        super(props)
            
        this.toggle = this.toggle.bind(this)
        this.removeTag = this.removeTag.bind(this)
    }
    toggle = (e) => {

        this.props.parentCallback(this.props.name)
    }

    removeTag = (e) => {

        this.props.removeCallback(this.props.name)
    }

      render(){
        return(
            <div id="CoursePlan" className='optCourse'>
                <button onClick={this.toggle} className="ToggleBtn">&#8592; &nbsp;</button>   {/* <- Arrow */}
                {this.props.name}                                                             {/* Course name */}
                <button onClick={this.removeTag} className="ExBtn">&nbsp; x</button>          {/* x Button */}
            </div>
        )
     }


}

export default OptionalTag