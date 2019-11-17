import React from "react"
import "./CoursePlan.css"

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
            <div>
               {this.props.name}
                <button onClick={this.removeTag} className="ExBtn">X</button>
                <button onClick={this.toggle} className="ToggleBtn">&#8594;</button>
            </div>
        )
     }
}

export default RequiredTag