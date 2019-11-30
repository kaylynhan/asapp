import React from "react"
import OptionalTag from "./OptionalTag"
import RequiredTag from "./RequiredTag"
import "./CoursePlan.css"
import axios from "axios"
import {generateSchedules} from "./scheduleGenerator.js"

class AddedCourses extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            optionalClasses: [
                'CSE 135',
                'CSE 132A',
            ],
            optionalIDs: [
			/*
				'5ddddabf18eee9cc93245fd4',
				'5ddddabf18eee9cc93245fc2',
				'5ddddabf18eee9cc93245e95',
				'5ddddabf18eee9cc93245e96',
				'5ddddabf18eee9cc93245e97'
			*/
				//'5ddddabf18eee9cc93245e9d',
				//'5ddddabf18eee9cc93245e9e',
				//'5ddddabf18eee9cc93245ea4',
				//'5ddddabf18eee9cc93245fc3',
				'5ddddabf18eee9cc93245fc4',
				'5ddddabf18eee9cc93245fc5',
				'5ddddabf18eee9cc93245fc6',
				'5ddddabf18eee9cc93245fcc',
				'5ddddabf18eee9cc93245fc9',
				'5ddddabf18eee9cc932460f8'
            ],
            requiredClasses: [
                'CSE 120',
                'CSE 167'
            ],
            requiredIDs: [
			
			
				'5ddddabf18eee9cc93245e9d',
				'5ddddabf18eee9cc93245e9e',
				'5ddddabf18eee9cc93245ea4',
				'5ddddabf18eee9cc93245fc3'
			/*
				'5ddddabf18eee9cc93245fbd',
				'5ddddabf18eee9cc93245fca'
			*/
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
	
	////////////////////////////////////////////////////////////
	onGenerateSchedules= () => {
        axios.get("http://localhost:4000/courses/getMany", 
        {params: {ids: this.state.requiredIDs}})
        .then(res => {
            this.setState({
                reqCourseInfo: res.data
            })
        })
        .catch(err => console.log(err.message));
        axios.get("http://localhost:4000/courses/getMany", 
        {params: {ids: this.state.optionalIDs}})
        .then(res => {
            this.setState({
                optCourseInfo: res.data
            }, this.getGeneratedSchedules)
        })

    }

    getGeneratedSchedules  = () => {

		this.setState({
        schedules: generateSchedules(this.state.optCourseInfo, this.state.reqCourseInfo)
         }, this.nextgen)
    }
	
	nextgen = () => {
		console.log(this.state.optCourseInfo);
        console.log(this.state.reqCourseInfo);
		console.log(this.state.schedules);
	}
	////////////////////////////////////////////////////////////
	
	/*
    onGenerateSchedules = () => {
        // let optIDs = []
        // let reqIDs = []
        // for (var course in this.state.optionalClasses){
        //     optIDs.append(course.id)
        //}
        //for (var course in this.state.requiredClasses){
        //     reqIDs.append(course.id)
        // }
        axios.get("http://localhost:4000/courses/getMany", 
        {params: {ids: this.state.optionalIDs}})
        .then(res => {
            this.setState({
                optCourseInfo: res.data
            })
        })
        .catch(err => console.log(err.message));

        axios.get("http://localhost:4000/courses/getMany", 
        {params: {ids: this.state.requiredIDs}})
        .then(res => {
            this.setState({
                reqCourseInfo: res.data
            })
        })
        .catch(err => console.log(err.message));


        console.log(this.state.optCourseInfo);
        console.log(this.state.reqCourseInfo);
		
         this.setState({
             schedules: generateSchedules(this.state.optCourseInfo,
                 this.state.reqCourseInfo)
         })

		console.log(this.state.schedules)
    }
	*/

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
				
                <button onClick ={this.onGenerateSchedules}>testGenerateSchedules</button>
<p>{this.state.schedules == null ? 'currently' : this.state.schedules[0][0].professor}</p>
        </div>

      )
  }

}

export default AddedCourses