import React from 'react'
import './CourseList.css'
import Tooltip from "./Tooltip";
import axios from 'axios';

class CourseList extends React.Component {
    constructor(props) {
        super(props)
        this.matches = this.includeInFilteredList.bind(this)
        this.myDivToFocus = React.createRef()
        /*this.state = {
            filteredList: this.props.menu.options.filter(course => (this.matches(course.department, course.number)))
        }*/
    }


    /*filterList() {
        var full_menu = this.props.menu
        full_menu.map(menu => menu.filter(course => course.department != this.props.search_query_dept || course.number === this.props.search_query_num))
    }*/

    includeInFilteredList(department, number) {
        var searchQueryNumRegPattern = new RegExp('^' + this.props.search_query_num, 'i')
        var searchQueryIsOnlyForDept = (this.props.search_query_num === "")
        var courseIsFromDifferentDept = this.props.search_query_dept.toUpperCase() != department.toUpperCase()
        var courseMatchesSearchQueryPattern = searchQueryNumRegPattern.test(number)
        
        // keep courses from other departments and department courses that match number query
        return searchQueryIsOnlyForDept || (courseIsFromDifferentDept || courseMatchesSearchQueryPattern)
    }

    componentDidUpdate() {
        // For a department match
        if (this.myDivToFocus.current) {
            // Open the department
            this.myDivToFocus.current.children[0].open = true
            // Scroll department to top of view
            this.myDivToFocus.current.parentElement.parentElement.scroll({
                top: this.myDivToFocus.current.offsetTop - this.myDivToFocus.current.parentElement.parentElement.offsetTop,
                behavior: 'smooth',
            })
        }
    }
    render(){
        var full_menu =  
                <div id="courseListWindow">
                    {this.props.menus.map(menu => (
                        // Give search query department a ref in order to scroll towards it
                        menu.title.toUpperCase() === this.props.search_query_dept.toUpperCase()
                        ? 
                        <div key={menu.title} ref={this.myDivToFocus}>
                            <details>
                                <summary>{menu.title}</summary>
                                {
                                    menu.options.filter(course => (this.includeInFilteredList(course.department, course.number))).map(course => (
                                        <div>
                                            <details style={{marginLeft:'10%'}}>
                                                <summary>{course.id + " " + course.name}</summary>
                                                <div style={{marginLeft:'10%'}}>
                                                    Units : {course.units}<br />
                                                    Prerequisites : {course.prereqs}<br />
                                                    Description : {course.description}
                                                </div>
                                            </details>
                                        </div>
                                    ))
                                }
                            </details>
                        </div>
                        :
                        <div key={menu.title}>
                            <details>
                                <summary>{menu.title}</summary>
                                {
                                    menu.options.filter(course => (this.includeInFilteredList(course.department, course.number))).map(course => (
                                        <div>
                                            <details style={{marginLeft:'10%'}}>
                                                <summary>{course.id + " " + course.name}</summary>
                                                <div style={{marginLeft:'10%'}}>
                                                    Units : {course.units}<br />
                                                    Prerequisites : {course.prereqs}<br />
                                                    Description : {course.description}
                                                </div>
                                            </details>
                                        </div>
                                    ))
                                }
                            </details>
                        </div>
                    ))}
                </div>
      return(
        <div id="courseListContainer">
            {full_menu}
        </div>
        )

    }
}

export default CourseList