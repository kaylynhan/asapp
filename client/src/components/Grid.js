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
//var grid_area_container = document.getElementById("grid_area")
//grid_area_container.appendChild(table);