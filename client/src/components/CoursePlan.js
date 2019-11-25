import React from "react"
import OptionalTag from "./OptionalTag"
import RequiredTag from "./RequiredTag"
import "./CoursePlan.css"
import axios from "axios"

class AddedCourses extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            optionalClasses: [
                'CSE 110',
                'CSE 100'
            ],
            optionalIDs: [
                '5dcf3980ba95db6aa9429fe3',
                '5dcf3e650636c96b37bfc810'
            ],
            requiredClasses: [
                'CSE 101',
                'CSE 123'
            ],
            requiredIDs: [
                '5dcf3e650636c96b37bfc819',
                '5dd9ecd7f151a092016468fa'
            ],
            optCourseInfo: null,
            reqCourseInfo: null,
            schedules: null
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