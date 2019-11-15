import React from 'react'
import OptionalTag from './OptionalTag'
import RequiredTag from './RequiredTag'
import './AddedCourses.css'

class AddedCourses extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            optionalClasses: ['CSE134B','CSE120', 'MATH20E'],
            requiredClasses: ['CSE110', 'CSE101', 'MATH183']
        }
        
        this.onAddItem = this.onAddItem.bind(this)
        this.onChangePriority = this.onChangePriority.bind(this)
        this.requiredCallBack = this.requiredCallBack.bind(this)
        this.optionalCallBack = this.optionalCallBack.bind(this)

    }

    onChangePriority = event => {
        this.setState({ value: event.target.value })
    }


    onAddItem = (value) => {
        this.setState(state => {
          const wantClasses = this.state.wantClasses.concat(value);
          return {
            wantClasses,
          }
        })
    }

    requiredCallBack = (item) => {
       
        this.setState(state => {
            var newArr = this.state.requiredClasses.filter(function(value) {
                return value !== item
            })
            const requiredClasses = newArr
            const optionalClasses = this.state.optionalClasses.concat(item)
            return {
                requiredClasses,
                optionalClasses,
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
                requiredClasses,
            }
        })        
    }

    render(){
      return(
        <div id='courseTagContainer'>
            <div id='optionalArea'>
                {this.state.optionalClasses.map(item => (
                    <div key={item}>
                        <OptionalTag name={item} parentCallback={this.optionalCallBack}/>
                    </div>
                ))}
            </div>
            <div id="requiredArea">
                {this.state.requiredClasses.map(item => (
                    <div key={item}>
                        <RequiredTag name={item} parentCallback={this.requiredCallBack}/>
                    </div>
                ))}
            </div>
        </div>

      )
  }

}

export default AddedCourses