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

	onGenerateSchedules= () => {
		
		this.getOptionalInformation()

    }
	
	getOptionalInformation = () => {
	
		let optionalIDs = []
		
		for(var i=0; i<this.state.optionalClasses.length; i++)
		{
			optionalIDs.push(this.state.optionalClasses[i]._id)
		}
		
		console.log("optional IDs are",optionalIDs);
		
		axios.get("/courses/getMany", {params: {ids: optionalIDs}})
        .then(res => {
            this.setState({
                optCourseInfo: res.data
            }, this.getRequiredInformation)
        })
        .catch(err => {
            console.log(err.message)
        })
	}
	
	getRequiredInformation = () => {
	
		let requiredIDs = []
		
		for(var i=0; i<this.state.requiredClasses.length; i++)
		{
			requiredIDs.push(this.state.requiredClasses[i]._id)
		}
		
		console.log("required IDs are", requiredIDs);
		
		axios.get("/courses/getMany", {params: {ids: requiredIDs}})
        .then(res => {
            this.setState({
                reqCourseInfo: res.data
            }, this.getGeneratedSchedules)
        })
        .catch(err => console.log(err.message));
	}

    getGeneratedSchedules = () => {

		this.setState({
        schedules: generateSchedules(this.state.optCourseInfo, this.state.reqCourseInfo)
         }, this.nextgen)
    }
	
	nextgen = () => {
		console.log("this.state.optCourseInfo is",this.state.optCourseInfo);
        console.log("this.state.reqCourseInfo is", this.state.reqCourseInfo);
        console.log("this.state.schedules is", this.state.schedules);
		this.calculateScheduleStats(this.props.callback(this.state.schedules))
	}
	
	calculateScheduleStats = () => {
        if (this.state.schedules !== null) {
            this.state.schedules.forEach(function(schedule) {

                let num_units = 0

                // calculate GPA
                let gpa = 0;
                let numb = 0;
                schedule
                    .filter(course => course["gpa"] !== -1)
                    .forEach(function(course) {
                        gpa += course["gpa"];
                        numb += 1
                    });

                if (numb !== 0) {
                    schedule["gpa"] = gpa / numb;
                } else {
                    schedule["gpa"] = -1;
                }

                // calculate class rating
                let class_rating = 0;
                numb = 0;
                schedule
                    .filter(course => course["prof_rating"] !== -1)
                    .forEach(function(course) {
                        class_rating += course["prof_rating"];
                        numb += 1;
                    });
                if (numb !== 0) {
                    schedule["class_rating"] = class_rating / numb;
                } else {
                    schedule["class_rating"] = -1;
                }

                // calculate workload
                let workload = 0;
                schedule
                    .filter(course => course["workload"] !== -1)
                    .forEach(function(course) {
                        workload += course["workload"];
                    });
                schedule["workload"] = workload;

                //calculate class_days

                //Calculates total number of days for a schedule.
                // var discoveredDays = []
                // var addDay = true
                //
                // for(var k=0; k < schedule.length; k++)
                // {
                // 	for(var i=0;i<schedule[k].meetings.length;i++)
                // 	{
                // 		addDay = true
                //
                // 		for(var j=0; j<discoveredDays.length; j++)
                // 		{
                // 			if(schedule[k].meetings[i].day == discoveredDays[j])
                // 				addDay = false
                // 		}
                //
                // 		if(addDay == true)
                // 			discoveredDays.push(schedule[k].meetings[i].day)
                // 	}
                // }
                //
                // schedule['num_days'] = discoveredDays.length;

                let class_days = {
                    M: false,
                    Tu: false,
                    W: false,
                    Th: false,
                    F: false
                };

                // TODO class_days
                schedule.forEach(function(course) {
                    num_units += course['units'];

                    course["meetings"].forEach(function(meeting) {
                        if (meeting["day"] in class_days) {
                            class_days[meeting["day"]] = true;
                        }
                    });
                });

                schedule['units'] = num_units

                // calculate number of days
                let num_days = 0;
                Object.values(class_days).forEach(function(value){
                    if(value === true){
                        num_days += 1;
                    }
                });
                schedule['num_days'] = num_days;
            });
        }
    };
		
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
                <div id="need_want">
                    <p>Chosen Courses</p>
                    <CoursePlan requiredClasses={this.state.requiredClasses} optionalClasses={this.state.optionalClasses} callBack={this.courseManagerCallBack}/>
					<div id="generate">
                    <button class="NavBtn" onClick = {this.onGenerateSchedules}>
                        Generate Schedules
                    </button>
					</div>
                </div>
            </div>
        )
    }
}

export default CourseManager;