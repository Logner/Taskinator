var formEl = document.querySelector('#task-form');
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector('#page-content');
var taskIdCounter = 0;

var tasks =[]

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create change status button
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // Create Option element
        var statusOptionEL = document.createElement("option");
        statusOptionEL.textContent = statusChoices[i];
        statusOptionEL.setAttribute('data-task-id', taskId);

        // append to select
        statusSelectEl.appendChild(statusOptionEL);
    }

    return actionContainerEl;

};

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
  
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", 'true');
  
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
  
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
  
    // increase task counter for next unique id
    taskIdCounter++;

    saveTasks()
}

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"'");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through taskas array and task object with new content
    for (var i = 0; i<tasks.length; i++){
      if (tasks[i].id==parseInt(taskID)) {
        tasks[i].name = taskName;
        tasks[i].type = taskType;
      }
    }

    alert('Task ' + taskId + ' has been Updated!');
    saveTasks()

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
    document.querySelector("#save-task").removeAttribute('style');
    };

var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    if (!(taskNameInput)) {alert('Error: Please provide a name for the task'); return 0}
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!(taskTypeInput)) {alert('Error: Please select a task type'); return 0;}
    // console.dir(taskNameInput);
    // console.dir(taskTypeInput);

    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: 'to do'
        };
    
        createTaskEl(taskDataObj);
    }
    // reset form
    formEl.reset();
  }

  var deleteTask = function(taskId) {
      // here we are selecting a class name and then checking if the same element has another attribute that matches the input
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var confirmDelete = confirm('Are you sure you want to remove this task?');
    if (confirmDelete) {
        console.log ('deleting task ' + taskId);
        taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
      // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
      if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);
      }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks()
  };
  }

  var editTask = function(taskId) {
      var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"'");

      // get content from task name and type
      var taskName = taskSelected.querySelector("h3.task-name").textContent;

      var taskType = taskSelected.querySelector("span.task-type").textContent;

      document.querySelector("input[name='task-name']").value = taskName;
      document.querySelector("select[name='task-type']").value = taskType;

      document.querySelector("#save-task").textContent = "Update Task";
      document.querySelector("#save-task").setAttribute('style','background:yellow;');
      formEl.setAttribute("data-task-id", taskId);
  }

  var taskButtonHandler = function(event) {
    var targetEl = event.target;
    
    if (event.target.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
      }
    if (event.target.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
        }
    else {console.log('Nothing interactive was clicked.')};
  };

  var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }
      // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
      }
      saveTasks()
  }
      
  };

  var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute('data-task-id');
    event.dataTransfer.setData("text/plain", taskId);
  };

  // how does this piece of code change target event???
  // without this drop task handler doesnt trigger?
  // prevent default acts as some sort of a gatekeeper?
  var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
      event.preventDefault();

      taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
  };

  var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");

    // Storing the dropped element id
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");

    // Getting the closest drop-zone id
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;

    // set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");

    if (statusType === "tasks-to-do") {
      statusSelectEl.selectedIndex = 0;
    } 
    else if (statusType === "tasks-in-progress") {
      statusSelectEl.selectedIndex = 1;
    } 
    else if (statusType === "tasks-completed") {
      statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.removeAttribute("style");
    dropZoneEl.appendChild(draggableElement);

    // loop through tasks array to find and update the updated task's status
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(id)) {
      tasks[i].status = statusSelectEl.value.toLowerCase();
    }
    }
    saveTasks()
  }

  var dragLeaveHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
      taskListEl.removeAttribute("style");
    }
  }

  formEl.addEventListener("submit", taskFormHandler);
  pageContentEl.addEventListener('click', taskButtonHandler);
  pageContentEl.addEventListener("change", taskStatusChangeHandler);
  pageContentEl.addEventListener("dragstart", dragTaskHandler);
  pageContentEl.addEventListener("dragover", dropZoneDragHandler);

  // drop vs dragend???
  pageContentEl.addEventListener("drop", dropTaskHandler);
  pageContentEl.addEventListener("dragleave", dragLeaveHandler);


var loadTasks = function() {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks == null) {
    tasks = [];
  }
  else {
    for (var i = 0; i < tasks.length; i++) {
      tasks[i].id == taskIdCounter;
      li = document.createElement('li')
      li.className = 'task-item';
      li.setAttribute('data-task-id',tasks[i].id)
      li.setAttribute('draggable','true')
      console.log(li)

      div = document.createElement('div');
      div.className = 'task-info';
      div.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";

      li.appendChild(div);
      var taskActionsEl = createTaskActions(tasks[i].id);
      li.appendChild(taskActionsEl);

      if (tasks[i].status == 'to do') {
        li.querySelector("select[name='status-change']").selectedIndex = 0;
        tasksToDoEl.appendChild(li);
      }
      else if (tasks[i].status == 'in progress') {
        li.querySelector("select[name='status-change']").selectedIndex = 1;
        tasksInProgressEl.appendChild(li);
      }
      else{
        li.querySelector("select[name='status-change']").selectedIndex = 2;
        tasksCompletedEl.appendChild(li);
      }

      taskIdCounter ++;
    }
  }
}
loadTasks();
