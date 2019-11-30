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
            requiredClasses: [
                {
                    name: 'CSE 101',
                    id: '5dcf3e650636c96b37bfc819',
                },
                {
                    name: 'CSE 123',
                    id: '5dd9ecd7f151a092016468fa'
                }
            ],
            optionalClasses : [ 
                {
                    name: 'CSE 110',
                    id: '5dcf3980ba95db6aa9429fe3'
                },
                {
                    name: 'CSE 100',
                    id: '5dcf3e650636c96b37bfc810'
                }
            ],
            optCourseInfo: null,
            reqCourseInfo: null,
            schedules: null,
            search_query: '',
            search_query_dept: '',
            search_query_num: '',
            filtered_catalogue: [],
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.filterCatalogue = this.filterCatalogue.bind(this)
    }

    courseManagerCallBack = (item1FromChild, item2FromChild) => {
        this.setState(
            { 
                requiredClasses: item1FromChild,
                optionalClasses: item2FromChild
            }
        )
    }

    componentDidMount () {
        axios.get("/courses/allOverviews")
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
                    options: courseArray[i].sort(function(a, b){
                        return (parseInt(a.number) > parseInt(b.number) ? 1 : parseInt(a.number) < parseInt(b.number) ? -1 : a.number > b.number ? 1 : a.number < b.number ? -1 : 0);
                    })
                }
                courseMenu.push(courseJSON);
            }
            courseMenu.sort(function(a, b){
                return (a.title > b.title ? 1 : a.title < b.title ? -1 : 0);
            });
            this.setState({
                catalogue: courseMenu
            })
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

        axios.get("/courses/getMany", 
        {params: {ids: this.state.optionalIDs}})
        .then(res => {
            this.setState({
                optCourseInfo: res.data
            })
        })
        .catch(err => console.log(err.message));

        axios.get("/courses/getMany", 
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

        /*  This is the callBack function which will update HomePage's
            schedule state. Be sure to call it after setting
            this.state.schedules to the newly generated schedules.
        */
        this.props.callBack(this.state.schedules)
    }

    handleSearch(search_query, search_query_dept, search_query_num) {
        this.setState({
            search_query: search_query,
            search_query_dept: search_query_dept,
            search_query_num: search_query_num,
        },
        this.filterCatalogue)
    }

    filterCatalogue() {

    }

    render() {
        return (
            <div>
                <div id="search_input">
                    <p> Search_input</p>
                    <CourseInput handleSearch={this.handleSearch}/>
                </div>
                <div id="search_result">
                    <p> Search_result</p>
                    <CourseList menus = {this.state.catalogue} search_query_dept = {this.state.search_query_dept} search_query_num = {this.state.search_query_num}/>
                </div>
                <div id="generate">
                    <button class="NavBtn">
                        Generate Schedules
                            </button>
                </div>
                <div id="need_want">
                    <p> Need vs want</p>
                    <CoursePlan requiredClasses={this.state.requiredClasses} optionalClasses={this.state.optionalClasses} callBack={this.courseManagerCallBack}/>
                </div>
                <button onClick = {this.onGenerateSchedules}>testGenerateSchedules</button>
            </div>
        )
    }
}

export default CourseManager;