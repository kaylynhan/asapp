import React from 'react'
import CourseTag from './CourseTag'
import './AddedCourses.css'

class AddedCourses extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            wantClasses: ['CSE134B','CSE120', 'MATH20E'],
            needClasses: ['CSE110', 'CSE101', 'MATH183']
        }
        
        this.onAddItem = this.onAddItem.bind(this)
        this.onChangePriority = this.onChangePriority.bind(this)
        this.callBackFunction = this.callBackFunction.bind(this)

    }

    onChangePriority = event => {
        this.setState({ value: event.target.value })
    }


    onAddItem = () => {
        this.setState(state => {
          const wantClasses = this.state.wantClasses.concat(state.value);
          return {
            wantClasses,
          }
        })
    }
    // FIX THIS FUNCTION TO MOVE ELEMENTS FROM ONE ARRAY INTO THE OTHER
    callBackFunction = (item) => {
        var index = this.state.needClasses.indexOf(item)
        if(index == -1) {
            var index = this.state.wantClasses.indexOf(item)
            this.setState(state => {
                
                const wantClasses = this.state.wantClasses.splice(index,1)
                return {
                    wantClasses,
                }
            })
            this.setState(state => {
                const needClasses = this.state.needClasses.concat(item)
                return {
                    needClasses,
                }
            })
        }
        else {
            this.setState(state => {
                const needClasses = this.state.needClasses.splice(index,1)
                console.log(needClasses)
                return {
                    needClasses,
                }
            })
            this.setState(state => {
                const wantClasses = this.state.wantClasses.concat(item)
                return {
                    wantClasses,
                }
            })
        }
    }

    render(){
      return(
        <div id='courseTagContainer'>
            <div id='wantArea'>
                {this.state.wantClasses.map(item => (
                    <div key={item}>
                        <CourseTag name={item} parentCallback={this.callBackFunction}/>
                    </div>
                ))}
            </div>
            <div id="needArea">
                {this.state.needClasses.map(item => (
                    <div key={item}>
                        <CourseTag name={item} parentCallback={this.callBackFunction}/>
                    </div>
                ))}
            </div>
        </div>

      )
  }

}

export default AddedCourses