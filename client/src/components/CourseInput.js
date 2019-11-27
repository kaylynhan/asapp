import React from 'react'
import './CourseInput.css'

class CourseInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_query: "",
            search_query_dep: "",
            search_query_num: "",
            input_is_valid: true,
            input_is_complete: false,
            input_is_dept: false,
        }
        this.handleOnChange = this.handleOnChange.bind(this)
        this.processInput = this.processInput.bind(this)
        this.validateInput = this.validateInput.bind(this)
    }

    validateInput() {
        const regexpValid = /^(([A-Z]+)( [0-9]+[A-Z]?)?)?$/i
        const regexpComplete = /^([A-Z]+) [0-9]+[A-Z]?$/i
        const regexpDept = /^([A-Z]+ ?)$/i
        
        var input_is_valid = regexpValid.test(this.state.search_query)
        var input_is_complete = regexpComplete.test(this.state.search_query)
        var input_is_dept = regexpDept.test(this.state.search_query)

        this.setState (
            {
                input_is_valid: input_is_valid,
                input_is_complete: input_is_complete,
                input_is_dept: input_is_dept,
            },
            this.processInput
        )
    }

    processInput() {
        var search_query_dept;
        var search_query_num;
        
        if (this.state.input_is_valid) {            
            if (this.state.input_is_complete) {
                var split = this.state.search_query.indexOf(' ')
                search_query_dept = this.state.search_query.substring(0,split)
                search_query_num = this.state.search_query.substring(split)
            }
            else if (this.state.input_is_dept) {
                search_query_dept = this.state.search_query
                search_query_num = ""

            }
            else {
                search_query_dept = ""
                search_query_num = ""
            }
        }
        else {
            search_query_dept = ""
            search_query_num = ""
        }

        this.search_query_dept = search_query_dept
        this.search_query_num = search_query_num
        this.props.handleSearch(this.state.search_query, search_query_dept, search_query_num)
        console.log("Dept is " + this.search_query_dept)
        console.log("Num is " + this.search_query_num)
    }

    handleOnChange(event) {
        this.setState({search_query: event.target.value}, 
            this.validateInput)
    }

    render() {
        return (
            <div id="searchBar">
                <input type="text" onChange = {this.handleOnChange} className="input" placeholder="Search" />
            </div>
        )
    }
}

export default CourseInput
