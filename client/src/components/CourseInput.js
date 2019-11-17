import React from 'react'
import './CourseInput.css'

class CourseInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="searchBar">
                <input type="text" className="input" placeholder="Search" />
            </div>
        )
    }
}

export default CourseInput
