
var formEl = document.querySelector('#task-form');
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

var createTaskHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    if (!(taskNameInput)) {alert('Error: Please provide a name for the task'); return 0}
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!(taskTypeInput)) {alert('Error: Please select a task type'); return 0;}
    // console.dir(taskNameInput);
    // console.dir(taskTypeInput);

     // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

    formEl.reset();
  }

  formEl.addEventListener("submit", createTaskHandler);