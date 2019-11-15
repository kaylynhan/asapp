import React from 'react'

class CourseTag extends React.Component {
    constructor(props) {
        super(props)
            
        this.toggle = this.toggle.bind(this)
    }
    toggle = (e) => {

        this.props.parentCallback(this.props.name)
    }

      render(){
        return(
            <div>
               {this.props.name}
                <button onClick={this.toggle}>change</button>
            </div>
        )
     }


}

export default CourseTag