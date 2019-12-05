import React from "react"
import "../../css/CoursePlan.css"

class RequiredTag extends React.Component {
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
            <div className='reqCourse'>
                <button onClick={this.removeTag} className="ExBtn">x &nbsp;</button>          {/* x Button */}
                {this.props.name}                                                             {/* Course name */}
                <button onClick={this.toggle} className="ToggleBtn">&nbsp; &#8594;</button>   {/* -> Arrow */}
            </div>
        )
     }
}

export default RequiredTag