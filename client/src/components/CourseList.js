import React from 'react'
import './CourseList.css'
import Tooltip from "./Tooltip";

class CourseList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: [
                {
                    title: "CSE", options: [
                        {
                            name: "CSE 100",
                            department: "CSE",
                            units: 4,
                            description: "Description for CSE 100",
                            prereqs: "CSE 15L, CSE 21"
                        },
                        {
                            name: "CSE 101",
                            department: "CSE",
                            units: 4,
                            description: "Description for CSE 101",
                            prereqs: "CSE 100"
                        },
                        {
                            name: "CSE 110",
                            department: "CSE",
                            units: 4,
                            description: "Description for CSE 110",
                            prereqs: "CSE 100"
                        }
                    ],
                },
                {
                    title: "BILD", options: [
                        {
                            name: "BILD 100",
                            department: "BILD",
                            units: 4,
                            description: "Description for BILD 100",
                            prereqs: "Prereqs for BILD 100"
                        },
                        {
                            name: "BILD 101",
                            department: "BILD",
                            units: 4,
                            description: "Description for BILD 101",
                            prereqs: "Prereqs for BILD 101"
                        },
                        {
                            name: "BILD 110",
                            department: "BILD",
                            units: 4,
                            description: "Description for BILD 110",
                            prereqs: "Prereqs for BILD 110"
                        }
                    ],
                },
                {
                    title: "CHEM", options: [
                        {
                            name: "CHEM 100",
                            department: "CHEM",
                            units: 4,
                            description: "Description for CHEM 100",
                            prereqs: "Prereqs for CHEM 100"
                        },
                        {
                            name: "CHEM 101",
                            department: "CHEM",
                            units: 4,
                            description: "Description for CHEM 101",
                            prereqs: "Prereqs for CHEM 101"
                        },
                        {
                            name: "CHEM 110",
                            department: "CHEM",
                            units: 4,
                            description: "Description for CHEM 110",
                            prereqs: "Prereqs for CHEM 110"
                        }
                    ],
                },
                {
                    title: "COGS", options: [
                        {
                            name: "COGS 100",
                            department: "COGS",
                            units: 4,
                            description: "Description for COGS 100",
                            prereqs: "Prereqs for COGS 100"
                        },
                        {
                            name: "COGS 101",
                            department: "COGS",
                            units: 4,
                            description: "Description for COGS 101",
                            prereqs: "Prereqs for COGS 101"
                        },
                        {
                            name: "COGS 110",
                            department: "COGS",
                            units: 4,
                            description: "Description for COGS 110",
                            prereqs: "Prereqs for COGS 110"
                        }
                    ],
                },
                {
                    title: "COMM", options: [
                        {
                            name: "COMM 100",
                            department: "COMM",
                            units: 4,
                            description: "Description for COMM 100",
                            prereqs: "Prereqs for COMM 100"
                        },
                        {
                            name: "COMM 101",
                            department: "COMM",
                            units: 4,
                            description: "Description for COMM 101",
                            prereqs: "Prereqs for COMM 101"
                        },
                        {
                            name: "COMM 110",
                            department: "COMM",
                            units: 4,
                            description: "Description for COMM 110",
                            prereqs: "Prereqs for COMM 110"
                        }
                    ],
                },
                {
                    title: "CSE", options: [
                        {
                            name: "CSE 100",
                            department: "CSE",
                            units: 4,
                            description: "Description for CSE 100",
                            prereqs: "CSE 15L, CSE 21"
                        },
                        {
                            name: "CSE 101",
                            department: "CSE",
                            units: 4,
                            description: "Description for CSE 101",
                            prereqs: "CSE 100"
                        },
                        {
                            name: "CSE 110",
                            department: "CSE",
                            units: 4,
                            description: "Description for CSE 110",
                            prereqs: "CSE 100"
                        }
                    ],
                },
                {
                    title: "ECE", options: [
                        {
                            name: "ECE 100",
                            department: "ECE",
                            units: 4,
                            description: "Description for ECE 100",
                            prereqs: "Prereqs for ECE 100"
                        },
                        {
                            name: "ECE 101",
                            department: "ECE",
                            units: 4,
                            description: "Description for ECE 101",
                            prereqs: "Prereqs for ECE 101"
                        },
                        {
                            name: "ECE 110",
                            department: "ECE",
                            units: 4,
                            description: "Description for ECE 110",
                            prereqs: "Prereqs for ECE 110"
                        }
                    ],
                },
                {
                    title: "HUM", options: [
                        {
                            name: "HUM 100",
                            department: "HUM",
                            units: 4,
                            description: "Description for HUM 100",
                            prereqs: "Prereqs for HUM 100"
                        },
                        {
                            name: "HUM 101",
                            department: "HUM",
                            units: 4,
                            description: "Description for HUM 101",
                            prereqs: "Prereqs for HUM 101"
                        },
                        {
                            name: "HUM 110",
                            department: "HUM",
                            units: 4,
                            description: "Description for HUM 110",
                            prereqs: "Prereqs for HUM 110"
                        }
                    ],
                },
                {
                    title: "MAE", options: [
                        {
                            name: "MAE 100",
                            department: "MAE",
                            units: 4,
                            description: "Description for MAE 100",
                            prereqs: "Prereqs for MAE 100"
                        },
                        {
                            name: "MAE 101",
                            department: "MAE",
                            units: 4,
                            description: "Description for MAE 101",
                            prereqs: "Prereqs for MAE 101"
                        },
                        {
                            name: "MAE 110",
                            department: "MAE",
                            units: 4,
                            description: "Description for MAE 110",
                            prereqs: "Prereqs for MAE 110"
                        }
                    ],
                },
                {
                    title: "MATH", options: [
                        {
                            name: "MATH 100",
                            department: "MATH",
                            units: 4,
                            description: "Description for MATH 100",
                            prereqs: "Prereqs for MATH 100"
                        },
                        {
                            name: "MATH 101",
                            department: "MATH",
                            units: 4,
                            description: "Description for MATH 101",
                            prereqs: "Prereqs for MATH 101"
                        },
                        {
                            name: "MATH 110",
                            department: "MATH",
                            units: 4,
                            description: "Description for MATH 110",
                            prereqs: "Prereqs for MATH 110"
                        },
                    ],
                },
                {
                    title: "PHYS", options: [
                        {
                            name: "PHYS 100",
                            department: "PHYS",
                            units: 4,
                            description: "Description for PHYS 100",
                            prereqs: "Prereqs for PHYS 101"
                        },
                        {
                            name: "PHYS 101",
                            department: "PHYS",
                            units: 4,
                            description: "Description for PHYS 101",
                            prereqs: "Prereqs for PHYS 101"
                        },
                        {
                            name: "PHYS 110",
                            department: "PHYS",
                            units: 4,
                            description: "Description for PHYS 110",
                            prereqs: "Prereqs for PHYS 110"
                        }
                    ]
                },
                {
                    title: "PSYC", options: [
                        {
                            name: "PSYC 100",
                            department: "PSYC",
                            units: 4,
                            description: "Description for PSYC 100",
                            prereqs: "Prereqs for PSYC 100"
                        },
                        {
                            name: "PSYC 101",
                            department: "PSYC",
                            units: 4,
                            description: "Description for CSE PSYC",
                            prereqs: "Prereqs for PSYC 101"
                        },
                        {
                            name: "PSYC 110",
                            department: "PSYC",
                            units: 4,
                            description: "Description for PSYC 110",
                            prereqs: "Prereqs for PSYC 110"
                        }
                    ],
                },
                {
                    title: "BILD", options: [
                        {
                            name: "BILD 100",
                            department: "BILD",
                            units: 4,
                            description: "Description for BILD 100",
                            prereqs: "Prereqs for BILD 100"
                        },
                        {
                            name: "BILD 101",
                            department: "BILD",
                            units: 4,
                            description: "Description for BILD 101",
                            prereqs: "Prereqs for BILD 101"
                        },
                        {
                            name: "BILD 110",
                            department: "BILD",
                            units: 4,
                            description: "Description for BILD 110",
                            prereqs: "Prereqs for BILD 110"
                        }
                    ],
                },
                {
                    title: "CHEM", options: [
                        {
                            name: "CHEM 100",
                            department: "CHEM",
                            units: 4,
                            description: "Description for CHEM 100",
                            prereqs: "Prereqs for CHEM 100"
                        },
                        {
                            name: "CHEM 101",
                            department: "CHEM",
                            units: 4,
                            description: "Description for CHEM 101",
                            prereqs: "Prereqs for CHEM 101"
                        },
                        {
                            name: "CHEM 110",
                            department: "CHEM",
                            units: 4,
                            description: "Description for CHEM 110",
                            prereqs: "Prereqs for CHEM 110"
                        }
                    ],
                },
                {
                    title: "COGS", options: [
                        {
                            name: "COGS 100",
                            department: "COGS",
                            units: 4,
                            description: "Description for COGS 100",
                            prereqs: "Prereqs for COGS 100"
                        },
                        {
                            name: "COGS 101",
                            department: "COGS",
                            units: 4,
                            description: "Description for COGS 101",
                            prereqs: "Prereqs for COGS 101"
                        },
                        {
                            name: "COGS 110",
                            department: "COGS",
                            units: 4,
                            description: "Description for COGS 110",
                            prereqs: "Prereqs for COGS 110"
                        }
                    ],
                },
                {
                    title: "COMM", options: [
                        {
                            name: "COMM 100",
                            department: "COMM",
                            units: 4,
                            description: "Description for COMM 100",
                            prereqs: "Prereqs for COMM 100"
                        },
                        {
                            name: "COMM 101",
                            department: "COMM",
                            units: 4,
                            description: "Description for COMM 101",
                            prereqs: "Prereqs for COMM 101"
                        },
                        {
                            name: "COMM 110",
                            department: "COMM",
                            units: 4,
                            description: "Description for COMM 110",
                            prereqs: "Prereqs for COMM 110"
                        }
                    ],
                },
                {
                    title: "CSE", options: [
                        {
                            name: "CSE 100",
                            department: "CSE",
                            units: 4,
                            description: "Description for CSE 100",
                            prereqs: "Prereqs for CSE 100"
                        },
                        {
                            name: "CSE 101",
                            department: "CSE",
                            units: 4,
                            description: "Description for CSE 101",
                            prereqs: "Prereqs for CSE 101"
                        },
                        {
                            name: "CSE 110",
                            department: "CSE",
                            units: 4,
                            description: "Description for CSE 110",
                            prereqs: "Prereqs for CSE 110"
                        }
                    ],
                },
                {
                    title: "ECE", options: [
                        {
                            name: "ECE 100",
                            department: "ECE",
                            units: 4,
                            description: "Description for ECE 100",
                            prereqs: "Prereqs for ECE 100"
                        },
                        {
                            name: "ECE 101",
                            department: "ECE",
                            units: 4,
                            description: "Description for ECE 101",
                            prereqs: "Prereqs for ECE 101"
                        },
                        {
                            name: "ECE 110",
                            department: "ECE",
                            units: 4,
                            description: "Description for ECE 110",
                            prereqs: "Prereqs for ECE 110"
                        }
                    ],
                },
                {
                    title: "HUM", options: [
                        {
                            name: "HUM 100",
                            department: "HUM",
                            units: 4,
                            description: "Description for HUM 100",
                            prereqs: "Prereqs for HUM 100"
                        },
                        {
                            name: "HUM 101",
                            department: "HUM",
                            units: 4,
                            description: "Description for HUM 101",
                            prereqs: "Prereqs for HUM 101"
                        },
                        {
                            name: "HUM 110",
                            department: "HUM",
                            units: 4,
                            description: "Description for HUM 110",
                            prereqs: "Prereqs for HUM 110"
                        }
                    ],
                },
                {
                    title: "MAE", options: [
                        {
                            name: "MAE 100",
                            department: "MAE",
                            units: 4,
                            description: "Description for MAE 100",
                            prereqs: "Prereqs for MAE 100"
                        },
                        {
                            name: "MAE 101",
                            department: "MAE",
                            units: 4,
                            description: "Description for MAE 101",
                            prereqs: "Prereqs for MAE 101"
                        },
                        {
                            name: "MAE 110",
                            department: "MAE",
                            units: 4,
                            description: "Description for MAE 110",
                            prereqs: "Prereqs for MAE 110"
                        }
                    ],
                },
                {
                    title: "MATH", options: [
                        {
                            name: "MATH 100",
                            department: "MATH",
                            units: 4,
                            description: "Description for MATH 100",
                            prereqs: "Prereqs for MATH 100"
                        },
                        {
                            name: "MATH 101",
                            department: "MATH",
                            units: 4,
                            description: "Description for MATH 101",
                            prereqs: "Prereqs for MATH 101"
                        },
                        {
                            name: "MATH 110",
                            department: "MATH",
                            units: 4,
                            description: "Description for MATH 110",
                            prereqs: "Prereqs for MATH 110"
                        },
                    ],
                },
                {
                    title: "PHYS", options: [
                        {
                            name: "PHYS 100",
                            department: "PHYS",
                            units: 4,
                            description: "Description for PHYS 100",
                            prereqs: "Prereqs for PHYS 101"
                        },
                        {
                            name: "PHYS 101",
                            department: "PHYS",
                            units: 4,
                            description: "Description for PHYS 101",
                            prereqs: "Prereqs for PHYS 101"
                        },
                        {
                            name: "PHYS 110",
                            department: "PHYS",
                            units: 4,
                            description: "Description for PHYS 110",
                            prereqs: "Prereqs for PHYS 110"
                        }
                    ]
                },
                {
                    title: "PSYC", options: [
                        {
                            name: "PSYC 100",
                            department: "PSYC",
                            units: 4,
                            description: "Description for PSYC 100",
                            prereqs: "Prereqs for PSYC 100"
                        },
                        {
                            name: "PSYC 101",
                            department: "PSYC",
                            units: 4,
                            description: "Description for CSE PSYC",
                            prereqs: "Prereqs for PSYC 101"
                        },
                        {
                            name: "PSYC 110",
                            department: "PSYC",
                            units: 4,
                            description: "Description for PSYC 110",
                            prereqs: "Prereqs for PSYC 110"
                        }
                    ],
                },
            ]
        } /* end state */
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
                {this.state.menus.map(menu => (
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
