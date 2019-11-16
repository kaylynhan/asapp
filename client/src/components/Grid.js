let hour = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm"];
let dayOfWeek = ["Mon", "Tu", "Wed", "Thur", "Fri", "Sat", "Sun"];
let hour_id = Array(30);
//for(i of hour_id){
//    i = 
//}

var table = document.createElement('table'), th, tr, td, row, cell
for (row = 0; row < 30; row++) {
    if (row === 0) {
        th = document.createElement('th')
        // table header
        for (cell = 0; cell < 8; cell++) {
            td = document.createElement('td');
            if (cell === 0) {
                td.innerHTML = "";
            } else {
                td.innerHTML = dayOfWeek[cell - 1];
            }
            th.appendChild(td);
        }
        table.append(th);

    }
    tr = document.createElement('tr')
    for (cell = 0; cell < 8; cell++) {
        td = document.createElement('td')
        if (cell === 0) {
            if (row % 2 == 0) {
                td.innerText = `${hour[Math.ceil((row - 1)/2)]}`
            } else {
                td.innerText = "";
            }
        } else {
            // set id for each cell
            td.setAttribute("id", `${dayOfWeek[cell - 1]}${row}`);
            td.innerText = `${dayOfWeek[cell - 1]}${row}`;
        }
        tr.appendChild(td);
    }
    table.append(tr)
}
var grid_area_container = document.getElementById("grid_area")
//grid_area_container.appendChild(table);