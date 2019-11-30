import React from 'react'
import './CourseList.css'
import Tooltip from "./Tooltip";
import axios from 'axios';

class CourseList extends React.Component {
    constructor(props) {
        super(props)
        this.matches = this.matches.bind(this)
        this.myDivToFocus = React.createRef()
        /*this.state = {
            filteredList: this.props.menu.options.filter(course => (this.matches(course.department, course.number)))
        }*/
    } /* end constructor */


    filterList() {
        var full_menu = this.props.menu
        full_menu.map(menu => menu.filter(course => course.department != this.props.search_query_dept || course.number === this.props.search_query_num))
    }

    matches(department, number) {
        var regpattern = new RegExp('^' + this.props.search_query_num, 'i')
        var noNum = (this.props.search_query_num === "")
        var noDeptMatch = this.props.search_query_dept.toUpperCase() != department.toUpperCase()
        var numMatch = regpattern.test(number)
        //console.log("department: " + department + " number: " + number + " regpattern: " + regpattern + " noNum: " + noNum + " noDeptMatch: " + noDeptMatch + " numMatch: " + numMatch)
        return noNum || (noDeptMatch || numMatch)
    }

    componentDidUpdate() {
        if (this.myDivToFocus.current) {
            /*this.myDivToFocus.current.scrollIntoView(false, {
                behavior: "smooth",
                block: "end"
            })*/
            this.myDivToFocus.current.children[0].open = true
            //this.myDivToFocus.current.parentElement.parentElement.scrollTop = this.myDivToFocus.current.offsetTop - this.myDivToFocus.current.parentElement.parentElement.offsetTop
            this.myDivToFocus.current.parentElement.parentElement.scroll({
                top: this.myDivToFocus.current.offsetTop - this.myDivToFocus.current.parentElement.parentElement.offsetTop,
                behavior: 'smooth',
            })
        }
    }
    render(){
        //toDelete
        /*
        //popup for section : Math140
        var ex = <div>
            <p>Section : A01</p>
            <p>Professor : Tarek M Elgindi</p>
            <p>Lecture : Tuesday/Thursday 2:00pm - 3:20pm</p>
            <p>Building : APM</p>
            <p>Room Number : B402A</p>
            <br />
            <p>Discussion : Monday 6:00pm - 6:50pm</p>
            <p>Lecture : Tuesday/Thursday 2:00pm - 3:20pm</p>
            <p>Building : APM</p>
            <p>Room Number : B402A</p>
        </div>
        */
        //end

        /*function matches(department, number, dept_pattern, num_pattern) {
            console.log("hi")
            var regpattern = new RegExp('^' + num_pattern, 'i')
            var noNum = (num_pattern === "")
            var noDeptMatch = dept_pattern != department
            var numMatch = regpattern.test(number)
            return noNum || (noDeptMatch || numMatch)
        }*/
        var full_menu =  
                <div id="courseListWindow">
                    {this.props.menus.map(menu => (

                        menu.title.toUpperCase() === this.props.search_query_dept.toUpperCase()
                        ? 
                        <div key={menu.title} ref={this.myDivToFocus}>
                            <details>
                                <summary>{menu.title}</summary>
                                {
                                    menu.options.filter(course => (this.matches(course.department, course.number))).map(course => (
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
                                    menu.options.filter(course => (this.matches(course.department, course.number))).map(course => (
                                    //menu.options.map(course => (
                                        //code by rel
                                        <div>
                                            {/* Everything in here is to be replaced with a CourseListTag*/}
                                            <details style={{marginLeft:'10%'}}>
                                                <summary>{course.id + " " + course.name}</summary>
                                                <div style={{marginLeft:'10%'}}>
                                                    Units : {course.units}<br />
                                                    Prerequisites : {course.prereqs}<br />
                                                    Description : {course.description}
                                                </div>
                                            </details>
                                        </div>
                                        //end rel
                                    ))
                                }
                            </details>
                        </div>
                    ))}
                </div>
      return(
        <div id="courseListContainer">
            {full_menu}
            {/*
            <div id="courseListWindow">
                {this.props.menus.map(menu => (
                    <div key={menu.title}>
                        <details>
                            <summary>{menu.title}</summary>
                            {
                                menu.options.filter(course => (this.matches(course.department, course.number))).map(course => (
                                //menu.options.map(course => (
                                    //code by rel
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
                                    //end rel
                                ))
                            }
                        </details>
                    </div>
                ))}
            </div>
            */}
        </div>
        )

    }
}

export default CourseList

/*
{this.props.menus.map(menu => (
    <div key={menu.title}>
        <details>
            <summary>{menu.title}</summary>
            {menu.options.map(course => (
                //code by rel
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
            ))}
        </details>
    </div>
))}*/