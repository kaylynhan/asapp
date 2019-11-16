import React from 'react'

class RequiredTag extends React.Component {
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
                <button onClick={this.toggle}>Opt</button>
            </div>
        )
     }


}

export default RequiredTag