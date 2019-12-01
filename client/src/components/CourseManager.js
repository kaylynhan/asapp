import React from 'react';
import axios from 'axios';
import CourseInput from "./CourseInput.js";
import CourseList from "./CourseList.js";
import CoursePlan from "./CoursePlan.js"
import CourseListTag from "./CourseListTag"
import {generateSchedules} from "./scheduleGenerator.js"

class CourseManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catalogue: [],
            optionalClasses: [],
            requiredClasses: [],
			/*
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
			*/
			///////////////////////////////////////////////////////////////
            /*
            optionalClasses: [
				{'name' : 'CSE 140', 'id': '5ddddabf18eee9cc93245fc4'},
				{'name' : 'CSE 140L', 'id': '5ddddabf18eee9cc93245fc5'},
				{'name' : 'CSE 141', 'id': '5ddddabf18eee9cc93245fc6'},
				{'name' : 'CSE 170', 'id': '5ddddabf18eee9cc93245fcc'},
				{'name' : 'CSE 150A', 'id': '5ddddabf18eee9cc93245fc9'},
				{'name' : 'MATH 10A', 'id': '5ddddabf18eee9cc932460f8'}
            ],
            requiredClasses: [
				{'name' : 'ANTH 196B', 'id': '5ddddabf18eee9cc93245e9d'},
                {'name' : 'ANAR 154', 'id': '5ddddabf18eee9cc93245e9e'},
				{'name' : 'ANSC 101', 'id': '5ddddabf18eee9cc93245ea4'},
				{'name' : 'CSE 110', 'id': '5ddddabf18eee9cc93245fc3'}
            ],*/
			/////////////////////////////////////////////////////////////////
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
                let valA = a.title.toLowerCase();
                let valB = b.title.toLowerCase();
                return (valA > valB ? 1 : valA < valB ? -1 : 0);
            });
            this.setState({
                catalogue: courseMenu
            })
        })
        .catch(err => {
            console.log(err.message);
        });
    }

	
	////////////////////////////////////////////////////////////
	onGenerateSchedules= () => {
		let optionalIDs = []
        let requiredIDs = []
		
		for(var i=0; i<this.state.optionalClasses.length; i++)
		{
			optionalIDs.push(this.state.optionalClasses[i]._id)
		}
		
		for(var i=0; i<this.state.requiredClasses.length; i++)
		{
			requiredIDs.push(this.state.requiredClasses[i]._id)
		}
        console.log("optional IDs are",optionalIDs);
        console.log("required IDs are", requiredIDs);
		
		axios.get("/courses/getMany", {params: {ids: optionalIDs}})
        .then(res => {
            this.setState({
                optCourseInfo: res.data
            }/*, this.getGeneratedSchedules*/)
        })
        .catch(err => {
            console.log(err.message)
        })
		
		
        axios.get("/courses/getMany", {params: {ids: requiredIDs}})
        .then(res => {
            this.setState({
                reqCourseInfo: res.data
            }, this.getGeneratedSchedules)
        })
        .catch(err => console.log(err.message));

    }

    getGeneratedSchedules  = () => {

		this.setState({
        schedules: generateSchedules(this.state.optCourseInfo, this.state.reqCourseInfo)
         }, this.nextgen)
    }
	
	nextgen = () => {
		console.log("this.state.optCourseInfo is",this.state.optCourseInfo);
        console.log("this.state.reqCourseInfo is", this.state.reqCourseInfo);
        console.log("this.state.schedules is", this.state.schedules);
        this.props.callback(this.state.schedules)
	}
	////////////////////////////////////////////////////////////
	
	
	
	
/*
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

        //  This is the callBack function which will update HomePage's
        //    schedule state. Be sure to call it after setting
        //    this.state.schedules to the newly generated schedules.
        
        this.props.callBack(this.state.schedules)
    }
*/
	
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

    addCourse = item => {
        this.setState(state => {
            let req = this.state.requiredClasses.find(o => o.name === item.name);
            let opt = this.state.optionalClasses.find(o => o.name === item.name);
            var newArr = this.state.requiredClasses
            function containsObject(obj, list) {
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i] === obj) {
                        return true;
                    }
                }
            
                return false;
            }
            console.log(this.state.optionalClasses)
            if(opt == undefined){
                console.log("NOT IN REQ")
            }
            if(req == undefined
             && opt == undefined) {
                    newArr = newArr.concat(item)
                }
            
            
            const requiredClasses = newArr
            return {
                requiredClasses
            }
            
        })
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
                    <CourseList menus = {this.state.catalogue} addCourse={this.addCourse} search_query_dept = {this.state.search_query_dept} search_query_num = {this.state.search_query_num}/>
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