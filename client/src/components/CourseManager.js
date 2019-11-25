import React from 'react';
import axios from 'axios';
import CourseInput from "./CourseInput.js";
import CourseList from "./CourseList.js";
import CoursePlan from "./CoursePlan.js"

class CourseManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catalogue: [],
            optionalClasses: [],
            requiredClasses: [],
            optCourseInfo: null,
            reqCourseInfo: null,
            schedules: null
        }
    }

    componentDidMount () {
        axios.get("http://localhost:4000/courses/allOverviews")
        .then(res => {
            let deptArray = [];
            let courseArray = [];
            for (var i = 0; i < res.data.length; i++){
                let course = res.data[i]
                if (deptArray.includes(course.department)){
                    let index = deptArray.indexOf(course.department);
                    courseArray[index].push(course);
                }else{
                    deptArray.push(course.department);
                    courseArray.push([course]);
                }
            }
            let courseMenu = []
            for (var i = 0; i < deptArray.length; i++){
                let courseJSON = {
                    title: deptArray[i],
                    options: courseArray[i]
                }
                courseMenu.push(courseJSON);
            }
            courseMenu.sort(function(a, b){
                return (a > b.title ? 1 : a.title < b.title ? -1 : 0);
            });
            this.setState({
                catalogue: courseMenu
            })
            console.log(this.state.catalogue)
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    onGenerateSchedules = () => {
        let optIDs = []
        let reqIDs = []
        for (var course in this.state.optionalCourses){
            optIDs.append(course.id)
        }
        for (var course in this.state.requiredCourses){
            reqIDs.append(course.id)
        }

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

        // this.setState({
        //     schedules: generateSchedules(this.state.optCourseInfo,
        //         this.state.reqCourseInfo)
        // })
    }


    render() {
        return (
            <div>
                <div id="search_input">
                    <p> Search_input</p>
                    <CourseInput />
                </div>
                <div id="search_result">
                    <p> Search_result</p>
                    <CourseList menus = {this.state.catalogue}/>
                </div>
                <div id="generate">
                    <button class="NavBtn">
                        Generate Schedules
                            </button>
                </div>
                <div id="need_want">
                    <p> Need vs want</p>
                    <CoursePlan />
                </div>
                <button onClick = {this.onGenerateSchedules}>testGenerateSchedules</button>
            </div>
        )
    }
}

export default CourseManager;