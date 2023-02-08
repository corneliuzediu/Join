let selectedCategory;
let selectedColor;
let taskAddedAtAddTaskHTML = false;

/**
 * function renders actual contacts of active user in drop-down menue of Add-Task Dialog
 */
async function init_add_task() {
  await init();
  renderContactsInDropDown();
  getTodaysDate();
}

/**
 * function changes bg-color of urgency button
 */
function changeUrgencyHigh() {
  document.getElementById("urgency-btn-1").style.backgroundColor = "#FF3D00";
  document.getElementById("urgency-btn-1").style.color = "#FFFFFF";
  document.getElementById("img-prio-high").style.backgroundImage = "url('../img/prio_high_white.png')";
  document.getElementById("img-prio-high").style.backgroundRepeat = "no-repeat";
  event.preventDefault();
}


/** The function provides the date of today for date picker  */
function getTodaysDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let today = year + '-' + month + '-' + day;
  console.log(day);
  console.log(month);
  console.log(year);
  console.log(today);
  document.getElementById("date").setAttribute("min", today);
}

/**
 * function clears form
 */
function clearForm() {
  document.getElementById("myForm").reset();
}

/**
 * Function generates HTML within Category input field after a new category was created or an existing one was selected
 * @param {string} category
 * @param {string} color
 */
function selectCategory(category, color) {
  document.getElementById("category-dropdown").innerHTML = "";
  document.getElementById("category-dropdown").innerHTML = `<div class="dropdown-category-select">${category}  <div class="category-color ${color}"></div></div><img src="../img/select-arrow.png" alt="">`;
  document.getElementById("category-dropdown").classList.add("dropdown-active");
  document.getElementById(color).checked = true;
}

/**
 *
 * @param {string} category
 * @param {string} color
 * @returns HTML code that renders content in drop-down menue of Add-Task
 */
function generateCategoryHTML(category, color) {
  return `
  <div onclick="selectCategory('${category}','${color}')" class="dropdown-category" id="" role="button" data-bs-toggle="collapse"
  data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseCategory">
  <label for="category-${category}">${category}</label>
  <input type="radio" name="category" id="category-${category}" value="${category}">
    <div class="category-color ${color}"></div>
    </div>
    `;
}

/**
 * reads user input in AddTask Dialog
 */
function addNewCategory() {
  let category = document.getElementById("category-input").value;
  let color = document.querySelector("input[type=radio][name=color]:checked").value;
  document.getElementById("collapseCategory").innerHTML += generateCategoryHTML(category, color);
  closeCategoryInput();
  selectCategory(category, color);
}

/**
 * This triggers the task added message.
 */
function taskAddedAnimation() {
  document.getElementById("added-task-message").classList.add("task-added-animation");
  setTimeout(() => {
    taskAddedRemoveMessage();
  }, 2000);
}

/**
 * This removes the task added message.
 */
function taskAddedRemoveMessage() {
  document.getElementById("added-task-message").classList.remove("task-added-animation");
  document.getElementById("added-task-message").style.transform = "";
}

/**
 * The function is collecting the information from all the input fields situated in task editor.
 * @param {number} taskID -  Value coresponding to the task id.
 */
function getValueFromEditInputs(taskID) {
  let editHeadline = document.getElementById(`edit-headline${taskID}`).value;
  let editDescription = document.getElementById(`edit-description${taskID}`).value;
  let selectedOption = document.getElementById("tasks_moveTo");
  let editProcessStatus = selectedOption.options[selectedOption.selectedIndex].value;
  let editDate = document.getElementById(`edit-date${taskID}`).value;
  let contactsCheckedBoxes = getCheckedBoxes("assign-contacts");
  document.querySelectorAll('input[name="prio-edit"]').forEach((check) => {
    if (check.checked) {
      tasks[taskID]["priority"] = check.value;
    }
  });
  tasks[taskID]["headline"] = editHeadline;
  tasks[taskID]["description"] = editDescription;
  tasks[taskID]["category"] = editProcessStatus;
  tasks[taskID]["dueDate"] = editDate;
  tasks[taskID]["assignedTo"] = contactsCheckedBoxes;
  tasks[taskID]["subtasks"] = readSubtasks();
}

/**
 * The funtion does provide the hover effect for "Task priority"
 * @param {string} id -  Value coresponding to the button id.
 */
function hoverButton(id) {
  let hover = document.getElementById(id);
  if (!hover.firstElementChild.checked) {
    if (id == "high" || id == "edit-high") {
      hover.classList.add("btn-high-hover");
    } else if (id == "medium" || id == "edit-medium") {
      hover.classList.add("btn-medium-hover");
    } else if (id == "low" || id == "edit-low") {
      hover.classList.add("btn-low-hover");
    }
  }
}

/**
 * The function does remove the hover effect from "Task priority"
 * @param {string} id -  Value coresponding to the button id.
 */
function leaveHoverButton(id) {
  let hover = document.getElementById(id);
  if (id == "high" || id == "edit-high") {
    hover.classList.remove("btn-high-hover");
  } else if (id == "medium" || id == "edit-medium") {
    hover.classList.remove("btn-medium-hover");
  } else if (id == "low" || id == "edit-low") {
    hover.classList.remove("btn-low-hover");
  }
}

/**
 *The function provides the informationa that the button has been clicked.
 * @param {string} id -  Value coresponding to the button id.
 */
function checkButton(id) {
  let button = document.getElementById(id);
  button.firstElementChild.checked = true;
}

/**
 * The function does show the "Subtask" input area.
 */
function openSubtaskInput() {
  document.getElementById("subtasks-area").classList.add("d-none");
  document.getElementById("subtasks-input-area").classList.remove("d-none");
  document.getElementById("subtask-input").value = "";
  document.getElementById("subtask-input").focus();
}

/**
 * The function remove the "Subtask" input area.
 */
function closeSubtaskInput() {
  document.getElementById("subtasks-input-area").classList.add("d-none");
  document.getElementById("subtasks-area").classList.remove("d-none");
  document.getElementById("subtask-container").value = "";
}

/**
 * The function is adding a "Subtask".
 */
function addSubtask() {
  let input = document.getElementById("subtask-input").value;
  if (input) {
    document.getElementById("subtask-container").innerHTML += createSubtaskHTML(input);
    closeSubtaskInput();
    return input;
  }
}

/**
 * function checks if subtasks exist and if they are checked
 * @param {array} subtasks
 * @returns a float between 0 and 1 indicating the percentage of subtasks checked
 */
function calculateSubtaskProgress(subtasks) {
  let isChecked = 0;
  let checkBoxesCount = subtasks.map((e) => e.checkBox);
  for (let i = 0; i < checkBoxesCount.length; i++) {
    if (checkBoxesCount[i] === true) {
      isChecked++;
    }
  }
  result = isChecked / checkBoxesCount.length;
  return result;
}

/**
 * function checks amount of subtasks and their checked status
 * @param {array} subtasks
 * @returns two integers
 */
function getSubtaskCheckboxesChecked(subtasks) {
  let isChecked = 0;
  let checkBoxesCount = subtasks.map((e) => e.checkBox);
  for (let i = 0; i < checkBoxesCount.length; i++) {
    if (checkBoxesCount[i] === true) {
      isChecked++;
    }
  }
  let count = checkBoxesCount.length;
  return [isChecked, count];
}

/**
 * The function is creating the drop-down and is showing the contact list of the user.
 * @param {string} id - Value coresponding to the Html id.
 * @param {string} id2 - Value coresponding to the Html id.
 * @param {string} id3 - Value coresponding to the Html id.
 */
function openContactInput(id, id2, id3) {
  document.getElementById(id).classList.add("d-none");
  document.getElementById(id2).classList.remove("d-none");
  document.getElementById(id3).value = "";
  document.getElementById(id3).focus();
}

/**
 * The function is closing the drop-down with contacts list
 * @param {*} id - Value coresponding to the Html id.
 * @param {*} id2 - Value coresponding to the Html id.
 * @param {*} id3 - Value coresponding to the Html id.
 */
function closeContactInput(id, id2, id3) {
  document.getElementById(id).classList.add("d-none");
  document.getElementById(id2).classList.remove("d-none");
  document.getElementById(id3).value = "";
}

/**
 * The function is adding a contact to the contact list shown in task.
 */
function addContact() {
  let input = document.getElementById("contact-input").value;
  if (input) {
    document.getElementById("contact-container").innerHTML += createContactHTML();
    closeContactInput();
  }
}

/**
 * The function is creating the drop-down and is showing the category list.
 */
function openCategoryInput() {
  document.getElementById("category-dropdown").classList.add("d-none");
  document.getElementById("category-input-area").classList.remove("d-none");
  document.getElementById("category-input").value = "";
  document.getElementById("category-input").focus();
}

/**
 * The function is closing the drop-down with category list.
 */
function closeCategoryInput() {
  document.getElementById("category-input-area").classList.add("d-none");
  document.getElementById("category-dropdown").classList.remove("d-none");
  document.getElementById("category-input").value = "";
}

/**
 * function retrives the subtasks from the actual DOM
 * @returns array containing the subtasks
 */
function readSubtasks() {
  let myElement;
  let subtasks = [];
  if (editTaskMarker == true) {
    myElement = document.getElementById("subtask-edit-container"); //get all Subtasks as DOM Elements
  } else {
    myElement = document.getElementById("subtask-container"); //get all Subtasks as DOM Elements
    // myElement.childElementCount gets the count of children and is identical with children.length
  }
  for (let i = 0; i < myElement.childElementCount; i++) {
    let checkBox = myElement.children[i].querySelector("input").checked; //tests if checkbox is false or true
    let subtaskName = myElement.children[i].querySelector("label").textContent; //gets the text content of the subtask
    let subtask = new CreateSubTask(subtaskName, checkBox);
    subtasks.push(subtask);
  }
  return subtasks;
}

/**
 * The function is collecting the informations added into input fields from task
 * @returns The information inserted by the user.
 */
async function createTask(path) {
  let title = document.getElementById("title").value;
  let contactsCheckedBoxes = getCheckedBoxes("assign-contacts");

  // if (document.querySelector('input[name="prio"]:checked').value == undefined) {
  //   let validation = document.getElementById("title");
  //   validation.setCustomValidity("Must set at least one contact");
  //   validation.reportValidity();
  //   return;
  // }

  let date = document.getElementById("date").value;
  let category = document.getElementById("category-dropdown").textContent;
  let urgency = document.querySelector('input[name="prio"]:checked').value;
  console.log(urgency)
  let description = document.getElementById("description-text").value;
  let color = document.querySelector("input[type=radio][name=color]:checked").value;
  let subtasks = readSubtasks();

  if (path == true) {
    taskAddedAtAddTaskHTML = true;
    addTaskCreateTask(tasks.length, category, title, description, contactsCheckedBoxes, urgency, date, color, subtasks);
  } else {
    createNewTask(tasks.length, category, title, description, contactsCheckedBoxes, urgency, date, color, subtasks);
  }
  clearAddTaskInputFields();
}

/**
 * The function does create and save a new "Task". Afterwords does update the coresponding area.
 * @param {number} array - The number of tasks.
 * @param {string} category - The task category.
 * @param {string} title - The task title.
 * @param {string} description - The tast description.
 * @param {array} contactsCheckedBoxes - List of people assigned to the task.
 * @param {string} urgency - The task priority.
 * @param {string} date - The task due date.
 * @param {string} color - the task color.
 * @param {array} subtasks - the subtask array.
 */
async function createNewTask(
  array,
  category,
  title,
  description,
  contactsCheckedBoxes,
  urgency,
  date,
  color,
  subtasks
) {
  new CreateTask(tasks.length, category, title, description, contactsCheckedBoxes, urgency, date, color, subtasks);
  await saveInBackendUserTasks(tasks.length); // this saves all tasks in Backend
  // await updateHTML();
  addToBoard();
  taskAddedToBoard();
  setTimeout(() => {
    closeAddTaskDialog("add-task-modal", "add-task-overlay");
    closeTaskAddedToBoard();
    resetAddTaskForm();
  }, 1000);
}

/**
 * The function does create and save a new "Task" from the Add-Task.html specifically. It triggers a different kind of animation, than the one used on board.html
 * @param {number} array - The number of tasks.
 * @param {string} category - The task category.
 * @param {string} title - The task title.
 * @param {string} description - The tast description.
 * @param {array} contactsCheckedBoxes - List of people assigned to the task.
 * @param {string} urgency - The task priority.
 * @param {string} date - The task due date.
 * @param {string} color - the task color.
 */
async function addTaskCreateTask(
  array,
  category,
  title,
  description,
  contactsCheckedBoxes,
  urgency,
  date,
  color,
  subtasks
) {
  new CreateTask(tasks.length, category, title, description, contactsCheckedBoxes, urgency, date, color, subtasks);
  await saveInBackendUserTasks(tasks.length); // this saves all tasks in Backend
  // await updateHTML();
  addToBoard();
  taskAddedAnimation();
}

/**
 * The function registers if a checkbox has been selected and provides the list of checked elements.
 * @param {string} chkboxName - Provides the name of the identifier.
 * @returns List of people assigned to the task.
 */
// Pass the checkbox name to the function
function getCheckedBoxes(chkboxName) {
  let checkboxes = document.getElementsByName(chkboxName);
  let checkboxesChecked = [];
  // loop over them all
  for (let i = 0; i < checkboxes.length; i++) {
    // And stick the checked ones onto an array...
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i].value);
    }
  }
  // Return the array if it is non-empty, or null
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

/**
 * The function does crear the input fields of "Add task"
 */
function resetAddTaskForm() {
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  let prioInput = document.querySelector('input[name="prio"]:checked');
  if (prioInput !== null) {
    prioInput.checked = false;
  }
  document.getElementById("description-text").value = "";
  document.querySelectorAll('input[name="assign-contacts"]:checked').forEach((checkbox) => {
    checkbox.checked = false;
  });
  document.querySelector("input[type=radio][name=color]:checked").checked = false;
  document.getElementById(
    "category-dropdown"
  ).innerHTML = `<span>Select task category</span><img src="../img/select-arrow.png" alt="">`;
  document.getElementById("category-dropdown").classList.remove("dropdown-active");
}
