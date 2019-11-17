import React from 'react'
import './CourseList.css'

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
            ]
        } /* end state */
    } /* end constructor */

    render(){
      return(
        <div id="courseListContainer">
            <div id="courseListWindow">
                {this.state.menus.map(menu => (
                    <div key={menu.title}>
                        <details>
                            <summary>{menu.title}</summary>
                            {menu.options.map(course => (<p>{course.name}</p>))}
                        </details>
                    </div>
                ))}
            </div>
        </div>
        )

  }
}

export default CourseList