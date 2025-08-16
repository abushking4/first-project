const taskBox = document.getElementById("taskBox");
const datetimeBox = document.getElementById("datetimeBox");
const tasksBox = document.getElementById("tasksBox");

let allTasks = [];

function getTask() {
    const task = taskBox.value;
    let tempDatetime = datetimeBox.value;
    // let datetime = tempDatetime.replace("T", " ");
    const [datePart, timePart] = tempDatetime.split('T'); // ['2025-08-31', '17:00']
    const [year, month, day] = datePart.split('-'); // ['2025', '08', '31']
    const datetime = `${timePart} ${day}/${month}/${year}`;

    const newTask = { task, datetime };
    return newTask;
}

function showTasks() {
    let index = 0;
    let tempTasks = '';
    for (const theTask of allTasks) {
        index++;
        tempTasks += `
        <div id="${index}" class="memo rounded d-flex justify-content-between flex-column col-12 col-md-2 bg-info mx-2">
            <div class="mb-5">
                <div class="d-flex justify-content-end">
                    <button class="btn btn-outline-danger my-2 mx-2 h-auto" onclick="removeMemo(${index - 1})">X</button>    
                </div>
                <div class="mx-3">
                    ${theTask.task}
                </div>
            </div>
            <div class="d-flex align-items-end mx-2">
                ${theTask.datetime}
            </div>
        </div>
        `
    }
    // console.log(tempTasks)
    tasksBox.innerHTML = tempTasks;
}

function getMemoId(memoId) {
    // console.log(memoId);
    return memoId;
}

function removeMemo(getMemoId) {
    console.log(getMemoId);
    allTasks.splice(getMemoId, 1);
    saveTasks();
    showTasks();
}

function saveTasks() {
    const savdTasks = JSON.stringify(allTasks);
    localStorage.setItem("savedTasks", savdTasks);
}

function showTasksOnLoad() {
    const savedAllTasks = localStorage.getItem("savedTasks");
    if (savedAllTasks) {
        allTasks = JSON.parse(savedAllTasks);
        showTasks();
    }
}

function addTask() {
    const fullTask = getTask();
    allTasks.push(fullTask);
    saveTasks();
    showTasks();
}





