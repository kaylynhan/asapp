import React from 'react'
import './CourseList.css'
import Tooltip from "./Tooltip";
import axios from 'axios';
import CourseListTag from "./CourseListTag";

class CourseList extends React.Component {
    constructor(props) {
        super(props)
        this.deptToScrollTo = React.createRef()
        this.deptLastScrolledTo = React.createRef()
        this.refGivenAlready = false
        this.deptIsMatch = false

        this.includeInFilteredList = this.includeInFilteredList.bind(this)
        this.giveDeptARef = this.giveDeptARef.bind(this)
        this.deptIsCompleteMatch = this.deptIsCompleteMatch.bind(this)
    }

    includeInFilteredList(department, number) {
        var searchQueryNumRegPattern = new RegExp('^' + this.props.search_query_num, 'i')
        var searchQueryIsOnlyForDept = (this.props.search_query_num === "")
        var courseIsFromDifferentDept = this.props.search_query_dept.toUpperCase() != department.toUpperCase()
        var courseMatchesSearchQueryPattern = searchQueryNumRegPattern.test(number)
        
        // keep courses from other departments and department courses that match number query
        return searchQueryIsOnlyForDept || (courseIsFromDifferentDept || courseMatchesSearchQueryPattern)
    }

    componentDidMount() {
        this.deptLastScrolledTo = this.deptToScrollTo
    }
    
    componentDidUpdate() {
        // For a department match or partial match
        if (this.deptToScrollTo.current) {
            // Scroll department to top of view
            this.deptToScrollTo.current.parentElement.parentElement.scroll({
                top: this.deptToScrollTo.current.offsetTop - this.deptToScrollTo.current.parentElement.parentElement.offsetTop,
                behavior: 'smooth',
            })
            // For a complete department match
            if (this.deptIsCompleteMatch(this.deptToScrollTo.current)) {
                // Open the department
                this.deptToScrollTo.current.children[0].open = true
                this.deptIsMatch = true
            }
            // For partial department match
            else {
                // If previous department was complete match and opened
                if (this.deptIsMatch === true) {
                    // Close all departments
                    const details = this.deptToScrollTo.current.parentElement.querySelectorAll("details")
                    details.forEach((detail) => {
                        detail.removeAttribute("open")
                    })
                    this.deptIsMatch = false
                }
            }
        }
    }

    deptIsCompleteMatch(department) {
        var matches = department.children[0].children[0].textContent.toLowerCase() === this.props.search_query_dept.toLowerCase()
        return matches
    }

    giveDeptARef(menu) {
        if (this.refGivenAlready) {
            return false
        }
        else {
            var searchQueryDeptRegPattern = new RegExp('^' + this.props.search_query_dept, 'i')
            var matches =  searchQueryDeptRegPattern.test(menu.title)
            if (matches) {
                this.refGivenAlready = true
            }
            return matches
        }
    }

    render(){
        this.refGivenAlready = false
        var filtered_menu =  
                <div id="courseListWindow">
                    {this.props.menus.map(menu => (
                        // Give search query department a ref in order to scroll towards it
                        <div key={menu.title} ref={(this.giveDeptARef(menu)) ? this.deptToScrollTo : undefined}>
                            <details>
                                <summary>{menu.title}</summary>
                                {
                                    menu.options.filter(course => (this.includeInFilteredList(course.department, course.number))).map(course => (
                                        <div key={course.id} style={{marginLeft:'10%'}}>
                                            <CourseListTag courseObj={course} addCourse={this.props.addCourse}/>
                                        </div>
                                    ))
                                }
                            </details>
                        </div>
                    ))}
                </div>
        return(
        <div id="courseListContainer">
            {filtered_menu}
        </div>
        )

    }
}

export default CourseList