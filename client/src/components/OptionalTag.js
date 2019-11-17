import React from "react"
import "./CoursePlan.css"

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
            <div id="CoursePlan">
                <button onClick={this.toggle} className="ToggleBtn">&#8592;</button>
                {this.props.name}
                <button onClick={this.removeTag} className="ExBtn">X</button>
            </div>
        )
     }


}

export default OptionalTag