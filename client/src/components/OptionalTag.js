import React from 'react'

class OptionalTag extends React.Component {
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
                <button onClick={this.toggle}> Req</button>
                {this.props.name}
            </div>
        )
     }


}

export default OptionalTag