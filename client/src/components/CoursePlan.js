import React from "react"
import OptionalTag from "./OptionalTag"
import RequiredTag from "./RequiredTag"
import "./CoursePlan.css"

class AddedCourses extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            optionalClasses: ['CSE134B','CSE120', 'MATH20E'],
            requiredClasses: ['CSE110', 'CSE101', 'MATH183']
        }
        
        this.onAddItem = this.onAddItem.bind(this)
        this.requiredCallBack = this.requiredCallBack.bind(this)
        this.optionalCallBack = this.optionalCallBack.bind(this)
        this.removeCallBack = this.removeCallBack.bind(this)

    }

    onAddItem = (value) => {
        this.setState(state => {
          const optionalClasses = this.state.wantClasses.concat(value)
          return {
            optionalClasses
          }
        })
    }

    requiredCallBack = (item) => {
        this.setState(state => {
            const requiredClasses = this.state.requiredClasses.filter(function(value) {
                return value !== item
            })
            const optionalClasses = this.state.optionalClasses.concat(item)
            return {
                requiredClasses,
                optionalClasses
            }
        })        
    }

    optionalCallBack = (item) => {
        this.setState(state => {
            const optionalClasses = this.state.optionalClasses.filter(function(value) {
                return value !== item
            })
            const requiredClasses = this.state.requiredClasses.concat(item)
            return {
                optionalClasses,
                requiredClasses
            }
        })        
    }

    removeCallBack = (item) => {
        this.setState(state => {
            const optionalClasses = this.state.optionalClasses.filter(function(value) {
                return value !== item
            })
            const requiredClasses = this.state.requiredClasses.filter(function(value) {
                return value !== item
            })
            return {
                optionalClasses,
                requiredClasses
            }
        })
    }

    render(){
      return(
        <div id="courseTagContainer">
            <div id="optionalArea">
                <h6>Optional</h6>
                {this.state.optionalClasses.map(item => (
                    <div key={item}>
                        <OptionalTag
                            name={item}
                            parentCallback={this.optionalCallBack}
                            removeCallback={this.removeCallBack}/>
                    </div>
                ))}
            </div>
            <div id="requiredArea">
                    <h6>Required</h6>
                {this.state.requiredClasses.map(item => (
                    <div key={item}>
                        <RequiredTag
                            name={item}
                            parentCallback={this.requiredCallBack}
                            removeCallback={this.removeCallBack}/>
                    </div>
                ))}
            </div>
        </div>

      )
  }

}

export default AddedCourses