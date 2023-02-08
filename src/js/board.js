/***    Variable    ***/
let currentDraggedElement;

/***    Array       ***/
let tasks = [];

/**
 * boolean to mark if tasks are currently comming from editTasks dialog
 */
let editTaskMarker = false;

/**
 * After "Log In", the function is collectiong a serial if data throw the corresponding functions
 */
async function initBoard() {
  await includeHTML();
  await loadUsersFromBackend();
  await getActiveUser();
  await loadUserContactsFromBackend();
  await loadUserTasksFromBackend();
  addToBoard();
  getHighlight();
}

/**
 * function renders all task cards to the board.html
 */
function addToBoard() {
  if (taskAddedAtAddTaskHTML == false) {
    // console.time("Board Loading Time");
    filterAllTasks();
    generateTemplate();
    updateProgressBars();
    updateProgressReport();
    // console.timeEnd("Board Loading Time");
  }
}

/**
 * The function filters the task and generate the task on board ;
 *
 * @param {array} array - The array contain all tasks;
 * @param {string} id - The id corresponds to the intendend section of the "Board"
 */
function filterTasks(array, id) {
  let filter = array.filter((t) => t["category"] == id);
  document.getElementById(id).innerHTML = "";
  for (let i = 0; i < filter.length; i++) {
    const task = filter[i];
    document.getElementById(id).innerHTML += generateTodoHTML(task);
    if (task["assignedTo"] != null) {
      for (let j = 0; j < task["assignedTo"].length && task["assignedTo"].length != null; j++) {
        const assignedContacts = task["assignedTo"][j];
        renderAllAssignedContacts(j, task, assignedContacts);
      }
    }
  }

}

/**
 * The function is showing the initials of the people assigned to the task.
 *
 * @param {number} j - The value is provided by the for loop;
 * @param {obje} task - The data corestponding to the task.
 * @param {*} assignedContacts - The name of the person assigned to the task.
 */
function renderAllAssignedContacts(j, task, assignedContacts) {
  if (j > 2) {
    document.getElementById(`task-contacts-container${task["id"]}`).lastElementChild.innerHTML =
      generateAssignedContactsMoreThanFourHTML(task["assignedTo"]);
  } else {
    document.getElementById(`task-contacts-container${task["id"]}`).innerHTML += generateAssignedContactsHTML(
      getInitials(assignedContacts),
      setColorForInitial(getInitials(assignedContacts))
    );
  }
}

/**
 * The funtion is colling the follow up functions in order to filter all the tasks.
 */
function filterAllTasks() {
  filterTasks(tasks, "to-do");
  filterTasks(tasks, "in-progress");
  filterTasks(tasks, "await-feedback");
  filterTasks(tasks, "done");
}

/**
 * The function is searching for the task given by the user.
 */
function findTask() {
  resetAllTasksContainer();
  let search = document.getElementById("search").value.toLowerCase().trim();
  filterSearchedTasks(tasks, "to-do", search);
  filterSearchedTasks(tasks, "in-progress", search);
  filterSearchedTasks(tasks, "await-feedback", search);
  filterSearchedTasks(tasks, "done", search);
  // updateProgressBars();
  // updateProgressReport();
}

/**
 * The function clears the tasks shown on the board.
 */
function resetAllTasksContainer() {
  document.getElementById("to-do").innerHTML = "";
  document.getElementById("in-progress").innerHTML = "";
  document.getElementById("await-feedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}

/**
 * The function is checking if given value is null.
 *
 * @returns "True" or "False".
 */
function searchTask() {
  return document.getElementById("search").value == "";
}

/**
 * The function is searching throw all tasks and is showing on "Board" if something is found.
 *
 * @param {array} array - The List of all tasks.
 * @param {string} id - The text coresponding to the board section.
 * @param {string} search - The searched text given by the user.
 */
function filterSearchedTasks(array, id, search) {
  let filter = array.filter(
    (t) =>
      (t["category"] == id && t["headline"].toLowerCase().match(search)) ||
      (t["category"] == id && t["description"].toLowerCase().match(search))
  );
  for (let i = 0; i < filter.length; i++) {
    const element = filter[i];
    document.getElementById(id).innerHTML += generateTodoHTML(element);
  }
}

/**
 * The function is showing the number of the additional people assigned to the task .
 *
 * @param {array} contact - List of people assigned to the task.
 * @returns - Creates the html element.
 */
function generateAssignedContactsMoreThanFourHTML(contact) {
  return `+${contact.length - 2}`;
}

/**
 * The function provides the id of the task.
 *
 * @param {*} id
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * The functions is verifing the drop event
 *
 * @param {event} ev - Drag event.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * The function is being moved to the "category" follow by updating the server and the board.
 *
 * @param {string} category - The section where the task is meeing moved to.
 */
async function moveTo(category) {
  tasks[currentDraggedElement]["category"] = category; // z.b. Todo mit id 1: Das Feld 'category' ändert sich zu 'open' oder 'closed'
  document.getElementById("search").value = "";
  await saveInBackendUserTasks();
  // updateHTML();
  addToBoard();
}

/**
 * The function is highlighting the draging area.
 */
function highlight() {
  document.querySelectorAll(".template-task").forEach((template) => {
    template.classList.add("drag-area-highlight");
  });
}

/**
 * The function remove the starting point highlinght of the dragable element.
 *
 * @param {string} id - Dragable area id.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
  document.querySelectorAll(".template-task").forEach((task) => {
    task.style.display = "unset";
  });
  document.getElementById(id).style.display = "none";
}

/**
 * The function provide an different angle to the element that is being draged.
 */
function rotateTask() {
  document.getElementById(currentDraggedElement).classList.add("rotate");
}

/**
 * The function calls the follow up functions to generate the tasks in each board section.
 */
function generateTemplate() {
  document.getElementById("to-do").innerHTML += templateTask(0);
  document.getElementById("in-progress").innerHTML += templateTask(1);
  document.getElementById("await-feedback").innerHTML += templateTask(2);
  document.getElementById("done").innerHTML += templateTask(3);
  if (window.innerWidth < 1400) {
    changeResponsiveTemplates();
  }
}

/**
 * The function is calling the follow up function in order to show the clicked task or "Add Task"
 *
 * @param {string} id - Name of the id of the element to be shown.
 * @param {string} id2 - Name of the id of the element to be compared in follow up function.
 * @param {*} taskID
 */
function openAddTaskDialog(id, id2, taskID) {
  document.getElementById(id).classList.remove("d-none");
  renderContactsInDropDown();
  setTimeout(() => {
    showTaskModal(id2, taskID);
    document.body.style.overflow = "hidden";
  }, 10);
}

/**
 * The function decides if task needs to be shown or the "Add Task" have to slide in.
 *
 * @param {string} id2 - Id of the Html element to be compared.
 * @param {number} taskID - The value is a number is task exists or "undefined" if new task is required.
 */
function showTaskModal(id2, taskID) {
  if (id2 == "task-modal") {
    document.getElementById("task-modal").innerHTML = generateTaskModalHTML(tasks[taskID]);
    generateTaskProcessStatus(taskID);
    if (tasks[taskID]["assignedTo"] != null) {
      for (let i = 0; i < tasks[taskID]["assignedTo"].length || i == null; i++) {
        const contacts = tasks[taskID]["assignedTo"][i];
        document.getElementById(`assigned-contacts${taskID}`).innerHTML += generateTaskModalContactsHTML(
          getInitials(contacts),
          contacts,
          setColorForInitial(getInitials(contacts))
        );
      }
    }
    responsiveTaskModalAnimation(id2);
  } else {
    document.getElementById(id2).classList.add("slide-in");
  }
}

/**
 * The function provides the board section id.
 * @param {string} e - Stores the id.
 * @returns - the id of the board section.
 */
function boardTaskContainerId(e) {
  return e.parentElement.parentElement.parentElement.parentElement.id; // Id from to-do, in-progress etc. containers
}

/**
 * The function allow the selected tesk to be edited.
 *
 * @param {number} taskID - Value coresponding to the task id.
 */
function editTasks(taskID) {
  editTaskMarker = true;
  document.getElementById("task-modal").innerHTML = generateEditTaskHTML(tasks[taskID]);
  renderContactsInEditDropDown(taskID);
  generateTaskProcessStatusforEditDialog(taskID);
  updateUrgencyBtns(taskID);
  if (tasks[taskID]["assignedTo"] != null) {
    for (let i = 0; i < tasks[taskID]["assignedTo"].length; i++) {
      const contacts = tasks[taskID]["assignedTo"][i];
      document.getElementById("assigned-contacts").innerHTML += generateTaskModalContactsInitialsHTML(
        getInitials(contacts),
        contacts,
        setColorForInitial(getInitials(contacts))
      );
    }
  }

  if (tasks[taskID].subtasks) {
    let subtaskLength = tasks[taskID].subtasks.length;
    for (let i = 0; i < subtaskLength; i++) {
      const subtaskName = tasks[taskID].subtasks[i].subtaskName;
      const checkBox = tasks[taskID].subtasks[i].checkBox;
      document.getElementById("subtask-edit-container").innerHTML += createSubtaskEditHTML(subtaskName, checkBox);
    }
  }
}

/**
 * The function does update the priority of the task
 *
 * @param {number} taskID -  Value coresponding to the task id.
 */
function updateUrgencyBtns(taskID) {
  document.querySelectorAll('input[name="prio-edit"]').forEach((btn) => {
    if (btn.value == tasks[taskID]["priority"]) {
      btn.checked = true;
    }
  });
}

/**
 * The function calls a serial of functions in order to save and update the task.
 *
 * @param {number} taskID -  Value coresponding to the task id.
 */
async function saveTasks(taskID) {
  getValueFromEditInputs(taskID);
  closeAddTaskDialog("task-modal", "task-overlay");
  await saveInBackendUserTasks();
  addToBoard();
}
