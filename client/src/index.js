import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let isMouseDown = false;



// length is the length of the class, a number in minute. Possible values: 50, 80, 170
// time is the start time of the class, in format of id of the grid table 
function postCourse(length, time, courseName, courseType) {
    let elem = document.getElementById(time);
    var rect = elem.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    let course = document.createElement("div");
    course.style.width = "140px";

    if (length == 50) {
        course.style.height = `70px`;
    } else if (length == 80) {
        course.style.height = `110px`;
    } else {
        course.style.height = `230px`;
    }

    course.style.position = "absolute";
    course.style.top = `${rect.top}px`;
    course.style.right = rect.right;
    course.style.backgroundColor = "rebeccapurple";
    elem.appendChild(course);

    //add the courseName
    var courseTitle = document.createElement("p");
    courseTitle.innerText = courseName;
    courseTitle.setAttribute("class", "courseTitle");

    var EcourseType = document.createElement("p");
    EcourseType.innerText = courseType;
    EcourseType.setAttribute("class", "courseTitle");

    course.appendChild(courseTitle);
    course.appendChild(EcourseType);
}


// This function is used for generating grid
function grid_generate() {
    let hour = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm"];
    let dayOfWeek = ["Mon", "Tu", "Wed", "Thur", "Fri"];
    let hour_id = Array(30);
    const time = new Date("January 31 1980 08:00")

    let currTime = 800;
    for (var i = 0; i < 30; i++) {

        hour_id[i] = currTime;
        if (i % 2 === 0) {
            currTime += 30;
        } else {
            currTime += 70;
        }

    }

    var table = document.createElement('table'), th, tr, td, row, cell
    for (row = 0; row < 30; row++) {

        tr = document.createElement("tr");
        if (row === 0) {

            // table header
            for (cell = 0; cell < 6; cell++) {
                th = document.createElement('th');
                if (cell === 0) {
                    th.innerHTML = "";
                } else {
                    th.innerHTML = dayOfWeek[cell - 1];
                }
                tr.appendChild(th);
            }
            table.append(tr);
        }

        tr = document.createElement("tr");
        for (cell = 0; cell < 6; cell++) {
            td = document.createElement('td')
            if (cell === 0) {
                th = document.createElement("th")
                if (row % 2 == 0) {
                    th.innerText = `${hour[Math.ceil((row - 1) / 2)]}`
                } else {
                    th.innerText = "";
                }
                tr.appendChild(th);
            } else {
                // set id for each cell
                td.setAttribute("id", `${dayOfWeek[cell - 1]}${hour_id[row]}`);
                td.innerText = `${dayOfWeek[cell - 1]}${hour_id[row]}`;
                tr.appendChild(td);
            }
        }
        table.append(tr)
    }
    var grid_area_container = document.getElementById("grid_area")
    grid_area_container.appendChild(table);
}

//hard
function populateSchedule() {
    /*
    //Schedule 1
    // CSE 110
    postCourse(80, "Tu1400", "CSE110", "LE");
    postCourse(80, "Thur1400", "CSE110", "LE");
    
    // CSE 134b
    postCourse(50, "Mon800", "CSE134b", "LE");
    postCourse(50, "Wed800", "CSE134b", "LE");
    postCourse(50, "Fri800", "CSE134b","LE");
    
    // MATH 20E
    postCourse(50, "Mon1600", "MATH20E", "LE");
    postCourse(50, "Wed1600", "MATH20E", "LE");
    postCourse(50, "Fri1600", "MATH20E", "LE");
*/
    //Schedule 2
    postCourse(50, "Mon1400", "MATH158", "LE");
    postCourse(50, "Wed1400", "MATH158", "LE");
    postCourse(50, "Fri1400", "MATH158", "LE");

    postCourse(50, "Mon1100", "MATH140", "LE");
    postCourse(50, "Wed1100", "MATH140", "LE");
    postCourse(50, "Fri1100", "MATH140", "LE");

    postCourse(80, "Tu1400", "CSE101", "LE");
    postCourse(80, "Thur1400", "CSE101", "LE");

}

function log_drag() {
    let outputArr = Array(0);
    let all_data = document.querySelectorAll("td");

    all_data.forEach(e => e.addEventListener("mousedown", function () {
        isMouseDown = true;
        if (e.style.backgroundColor == "grey") {
            e.style.backgroundColor = "white";
            let removeIndex = outputArr.findIndex(elem => elem == e.getAttribute("id"))
            outputArr.splice(removeIndex, 1);
        } else {
            e.style.backgroundColor = "grey";
            outputArr.push(e.getAttribute("id"))
        }
        console.log(outputArr);
    }))

    all_data.forEach(e => e.addEventListener("mouseover", () => {
        if (isMouseDown) {

            // if the grid is grey, change it to white
            if (e.style.backgroundColor == "grey") {
                e.style.backgroundColor = "white";
                let removeIndex = outputArr.findIndex(elem => elem == e.getAttribute("id"))
                outputArr.splice(removeIndex, 1);

            } else {

                e.style.backgroundColor = "grey"
                outputArr.push(e.getAttribute("id"))
            }
            console.log(outputArr);
        }
    }))
    all_data.forEach(e => e.addEventListener("mouseup", function () {
        isMouseDown = false;
    }))

}



ReactDOM.render(<App />, document.getElementById('root'));
grid_generate();
log_drag();
populateSchedule();




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
