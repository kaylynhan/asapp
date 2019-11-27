import React from 'react'
import './CourseList.css'
import Tooltip from "./Tooltip";
import axios from 'axios';

class CourseList extends React.Component {
    constructor(props) {
        super(props)
    } /* end constructor */


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
      return(
        <div id="courseListContainer">
            <div id="courseListWindow">
                {this.props.menus.map(menu => (
                    <div key={menu.title}>
                        <details>
                            <summary>{menu.title}</summary>
                            {menu.options.map(course => (
                                //code by rel
                                <div>
                                    <details style={{marginLeft:'10%'}}>
                                        <summary>{course.name}</summary>
                                        <div style={{marginLeft:'10%'}}>
                                            Units : {course.units}<br />
                                            Prerequisites : {course.prereqs}<br />
                                            Description : {course.description}
                                        </div>
                                    </details>
                                </div>
                                //end rel
                            ))}
                        </details>
                    </div>
                ))}
            </div>
            {/*<Tooltip id="sectionTip" info={ex}/>*/}
        </div>
    )

    }
}

export default CourseList
