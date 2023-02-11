function generateTodoHTML(task) {
    return `
      <div id="${task["id"]}" draggable="true" ondragstart="startDragging(${task["id"]}); rotateTask(); highlight()" onclick="openAddTaskDialog('task-overlay', 'task-modal', ${task["id"]})" class="board-task">
          <span class="department ${task["color"]}">${task["department"]}</span>
          <span class="task-headline">${task["headline"]}</span>
          <span class="task-description">${task["description"]}</span>
          <div class="progress-container">
              <div class="progress" style="height: 8px;">
                  <div class="progress-bar progress-bar${task["id"]}" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span><span class="progress-report${task["id"]}"></span></span>
          </div>
          <div class="contact-and-urgency">
              <div class="task-contacts-container" id="task-contacts-container${task["id"]}">
              </div>
              <div class="task-urgency">
                  <img src="../img/priority-${task["priority"]}-icon.png" alt="urgency">
              </div>
          </div>
      </div>
      `;
}

function generateAssignedContactsHTML(contact, color) {
    return `
          <div style="background-color:${color}" class="task-contacts">${contact}</div>
      `;
}

function generateTaskProcessStatus(taskID) {
    let currentTaskStatus = tasks[taskID]["category"];
    let content = document.getElementById("current-process-status");
    return (content.innerHTML = `Process-Status:&nbsp;<b>${currentTaskStatus}</b>  
        `);
}

function generateTaskProcessStatusforEditDialog(taskID) {
    let currentTaskStatus = tasks[taskID]["category"];
    let content = document.getElementById("tasks_moveTo");
    if (currentTaskStatus === "to-do") {
        return (content.innerHTML = `
                              <option value="to-do" selected>To do</option>
                              <option value="in-progress">In progress</option>
                              <option value="await-feedback">Await feedback</option>
                              <option value="done">Done</option>

    `);
    } else if (currentTaskStatus === "await-feedback") {
        return (content.innerHTML = `
                              <option value="to-do">To do</option>
                              <option value="in-progress">In progress</option>
                              <option value="await-feedback" selected>Await feedback</option>
                              <option value="done">Done</option>

    `);
    } else if (currentTaskStatus === "in-progress") {
        return (content.innerHTML = `
                              <option value="to-do">To do</option>
                              <option value="in-progress" selected>In progress</option>
                              <option value="await-feedback">Await feedback</option>
                              <option value="done">Done</option>

    `);
    } else {
        return (content.innerHTML = `
                                  <option value="to-do">To do</option>
                                  <option value="in-progress">In progress</option>
                                  <option value="await-feedback">Await feedback</option>
                                  <option value="done" selected>Done</option>
    
        `);
    }
}

function generateTaskModalHTML(task) {
    return `
          <div class="task-modal-container">
                      <img class="close-icon-overlay" src="../img/add-task-close-icon.png"
                          onclick="closeAddTaskDialog('task-modal', 'task-overlay')">
                      <span class="department department-overlay ${task["color"]}">${task["department"]}</span>
                      <h3 class="task-headline-overlay">${task["headline"]}</h3>
                      <span class="task-description-overlay">${task["description"]}</span>

                      <div class="current-process-status-bold" id="current-process-status-bold">
                      <span class="current-process-status" id="current-process-status"></span></div>

                      <div class="due-date-container">
                          <span>Due date:</span>
                          <span>${task["dueDate"]}</span>
                      </div>
                      <div class="prio-container">
                          <span>Priority:</span>
                          <img id="prio-overlay" src="../img/prio-overlay-${task["priority"]}.png" alt="prio-overlay">
                      </div>
                      <div class="assigned-to-container">
                          <span>Assigned To:</span>
                          <div class="assigned-contacts" id="assigned-contacts${task["id"]}">  
                          </div>
                      </div>
                      <button class="btn-add-task edit-btn" onclick="editTasks(${task["id"]})">
                        <img src="../img/edit-btn-pencil.png" alt="">
                      </button>
                  </div>
      `;
}

//   <form action="">
//       <label for="tasks">Move task to:</label>
//       <select class="tasks_moveTo" id="tasks_moveTo" value="Move">

//       </select>
//       <input type="submit" value="Move">
//   </form>

function generateTaskModalContactsHTML(contactInitials, contact, color) {
    return `
          <div class="assigned-contact-row">
              <div style="background-color:${color}" class="task-contacts-overlay">${contactInitials}</div>
              <span>${contact}</span>
          </div>
      `;
}

function generateTaskModalContactsInitialsHTML(contactInitials, contact, color) {
    return `
          <div class="assigned-contact-initials">
              <div style="background-color:${color}" class="task-contacts-overlay">${contactInitials}</div>
          </div>
      `;
}

function generateEditTaskHTML(task) {
    return `
      <div class="task-modal-container">
                         <img class="close-icon-overlay" src="../img/add-task-close-icon.png"
                          onclick="closeAddTaskDialog('task-modal', 'task-overlay')">
                          <form class="edit-task">
                          <div class="form-width input-title margin-btn-25">
                              <input id="edit-headline${task["id"]}" class="add-title input-title-font" type="text" placeholder="Enter a title" value="${task["headline"]}">
                          </div>
                          <div class="description-area description-area-overlay flex-column margin-btn-45">
                              <span class="category-header">Description</span>
                              <textarea class="edit-description" name="" id="edit-description${task["id"]}" cols="30" rows="5"
                                  placeholder="Enter a Description">${task["description"]}</textarea>
                          </div>



                          
                          <div class="task-process-main-div">
                              <span class="category-header">Task Process-Status</span>
                              <select class="tasks_moveTo" id="tasks_moveTo" value="Move"></select>
                              </div>
                              
              
                           
                         


                          <div class="date-area flex-column margin-btn-45">
                              <span class="category-header">Due date</span>
                              <input id="edit-date${task["id"]}" class="uniform-sizing date" type="date" value="${task["dueDate"]}">
                          </div>
                          <div class="button-area margin-btn-56">
                              <button type="button" value="high" class="add-task-prio-high" id="edit-high" onclick="checkButton('edit-high')" onmouseover="hoverButton('edit-high')" onmouseleave="leaveHoverButton('edit-high')">
                              <input type="radio" id="edit-high-prio" name="prio-edit" value="high">
                              <label for="edit-high-prio">
                                  <span class="priority-button-text text-19pt">Urgent</span>
                                  <img src="../img/prio_bnt_urgent.png" alt="">
                              </label>
                              </button>
                              <button type="button" value="medium" class="add-task-prio-medium" id="edit-medium" onclick="checkButton('edit-medium')" onmouseover="hoverButton('edit-medium')" onmouseleave="leaveHoverButton('edit-medium')">
                                  <input type="radio" id="edit-medium-prio" name="prio-edit" value="medium">
                                  <label for="edit-medium-prio">
                                      <span class="priority-button-text text-19pt">Medium</span>
                                      <img src="../img/prio_bnt_medium.png" alt="">
                                  </label>
                              </button>
                              <button type="button" value="low" class="add-task-prio-low" id="edit-low" onclick="checkButton('edit-low')" onmouseover="hoverButton('edit-low')" onmouseleave="leaveHoverButton('edit-low')">
                                  <input type="radio" id="edit-low-prio" name="prio-edit" value="low">
                                  <label for="edit-low-prio">
                                      <span class="priority-button-text text-19pt">Low</span>
                                      <img src="../img/prio_bnt_low.png" alt="">
                                  </label>
                              </button>
                          </div>

                          <div class="input-check" id="subtask-edit-container"></div>

                          <div class="uniform-sizing text-19pt dropdown" role="button" data-bs-toggle="collapse"
                              data-bs-target="#collapseContactsEdit" aria-expanded="false" aria-controls="collapseContactsEdit" id="contact-dropdown-edit">
                              <span>Select contacts to assign</span>
                              <img src="../img/select-arrow.png" alt="">
                          </div>

                          <div class="assigned-contacts-initials" id="assigned-contacts">  
                          </div>
  
                          
                          <div class="subtasks-input-area d-none" id="contact-input-area-edit">
                              <input class="" type="email" placeholder="Contact email" id="contact-input-edit" required>
                              <div class="subtask-icons">
                                  <img onclick="closeContactInput('contact-input-area-edit', 'contact-dropdown-edit', 'contact-input-edit')" class="cursor-pointer"
                                      src="../img/cancel-subtask.png" alt="">
                                  <img src="../img/subtask-line.png" alt="">
                                  <img onclick="addContact()" class="cursor-pointer" src="../img/check-subtask.png"
                                      alt="">
                              </div>
                          </div>
                          <div class="margin-btn-25 assign-contact-container" id="contact-container-edit">
                              <div class="dropdown-contacts-container collapse scroll" id="collapseContactsEdit">

  
  
                                  <div class="dropdown-contact" onclick="openContactInput('contact-dropdown-edit', 'contact-input-area-edit', 'contact-input-edit')" role="button" data-bs-toggle="collapse"
                                  data-bs-target="#collapseContactsEdit" aria-expanded="false" aria-controls="collapseContactsEdit" id="contact-dropdown-edit">
                                      <label for="">Invite new contact</label>
                                      <img src="../img/new-contact-icon.png" alt="">
                                  </div>
                              </div>
                          </div>
                      </form>
                      <div class="button-edit-task-area-confirm">
                        <button class="btn-add-task ok-btn" onclick="saveTasks(${task["id"]})">
                            Ok
                            <img src="../img/check-icon.png" alt="add-icon">
                        </button>
                        <button class="delete-icon-overlay" onclick="showIfDeleteQuestion()">
                            <img src="../img/trash-9-16.ico">
                        </button>
                        <div id="ifToBeDeleted__wrapper" class="ifToBeDeleted__wrapper d-none">
                            <p> Are you sure you want to delete this task? </p>
                            <div id="ifToBeDeleted__answear" class="ifToBeDeleted__answear">
                            <button onclick="ifDeleteTask(true, ${task.id})">YES</button>
                            <button onclick="showIfDeleteQuestion()">NO</button>
                            </div>

                        </div>
                        </div>
                  </div>
      `;
}

function createSubtaskHTML(subtaskName) {
    return `
      <div class="subtask text-19pt">
          <input type="checkbox" name="subtask-checkbox">
          <label for="check" name="subtask-name" id="subtask-name">${subtaskName}</label>
      </div>
      `;
}

function createSubtaskEditHTML(subtaskName, checkBox) {
    if (checkBox === true) {
        return `
          <div class="subtask text-19pt">
              <input type="checkbox" checked="checked" name="subtask-checkbox">
              <label for="check" name="subtask-name" id="subtask-name">${subtaskName}</label>
          </div>
          `;
    } else {
        return `
        <div class="subtask text-19pt">
            <input type="checkbox" name="subtask-checkbox">
            <label for="check" name="subtask-name" id="subtask-name">${subtaskName}</label>
        </div>
        `;
    }
}

function createContactHTML() {
    return `
      <div class="task-contacts-overlay-container">
          <div class="task-contacts-overlay font-size21">SM</div>
          <div class="task-contacts-overlay font-size21">MV</div>
          <div class="task-contacts-overlay font-size21">EF</div>
      </div>
      `;
}

/**
 * The function contains the HTML template coresponding to the tasks shown on board.
 *
 * @param {number} i - Task id.
 * @returns HTML element
 */
function templateTask(i) {
    return `<div id="template${i}" class="template-task"><div>`;
}
