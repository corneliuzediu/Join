/*** Log In / Sign in / Reset Password ***/
// Function for the start animation
/**
 * The function is changing the background color for the start animation
 */
function changeBg() {
  document.getElementById("initial__file--wrapper").style.background = "white";
}

/**
 * The function does the logo transition from the center to top left;
 */
function transitionLogo() {
  document.getElementById("logo__img").style.left = "0px";
  document.getElementById("logo__img").style.top = "0px";
  document.getElementById("logo__img").style.scale = "1";
  document.getElementById("logo__img").style.opacity = "0";
}

/**
 * The functions changes the display style for proper possition;
 */
function showCardAndHeader() {
  document.getElementById("logIn__frame").style.display = "flex";
  document.getElementById("to__sign-in--wrapper").style.display = "flex";
}

// Function for sing up.
/**
 * The functions is showing if the new user was succesfully registered.
 */
function showConfirmation() {
  document.getElementById("signUp__id--main").classList.add("blur");
  document.getElementById("signUp__id--response").classList.remove("d-none");
  document.getElementById("signUp__id--response").style.transform = "translateY(-20vh)";
}

/**
 * The function is repositioning the confirmation field to the initial location.
 */
function resetConfirmation() {
  document.getElementById("signUp__id--main").classList.remove("blur");
  document.getElementById("signUp__id--response").classList.add("d-none");
  document.getElementById("signUp__id--response").style.transform = "translateY(0vh)";
}

/**
 * The function does clear the input fields is "Sign Up" section.
 */
function cleanInput() {
  document.getElementById("newUser-name").value = "";
  document.getElementById("newUser-email").value = "";
  document.getElementById("newUser-password").value = "";
  document.getElementById("signUp__validation").classList.add("d-none");
}

function showUserAlreadyRegistered() {
  document.getElementById("signUp__validation").classList.remove("d-none");
  document.getElementById("signUp__validation").innerHTML = `Email already registered.`;
  document.getElementById("signUp__validation").parentElement.style.gap = "10px";
}

// Functions for reset password.

/**
 * The function is showing the section where is password reset is available.
 */
function changeDivReset() {
  document.getElementById("forgot__request").classList.add("d-none");
  document.getElementById("forgot__newPassword").classList.remove("d-none");
}

/**
 *  The functions clears the input fields for password reset.
 */
function clearInputNewPassword() {
  document.getElementById("user__newPassword-1").value = "";
  document.getElementById("user__newPassword-2").value = "";
}

/**
 * The function is showing the validation, if reset password can be done.
 *
 * @param {*} index
 */
function allowResetPassword(index) {
  if (index >= 0) {
    document.getElementById("forgot__email--validation").classList.add("d-none");
    showSendEmail();
    setTimeout(changeDivReset, 1500);
  } else {
    document.getElementById("forgot__email--validation").classList.remove("d-none");
  }
}

/**
 * The function is showing the confirmation of "Reset email" has been sended.
 */
function showSendEmail() {
  document.querySelector(".forgot__file--wrapper").classList.add("blur");
  document.querySelector(".response__forgot--container").classList.remove("d-none");
  document.getElementById("email__sent").classList.remove("d-none");
  setTimeout(animateSentEmail, 1);
}

/**
 * The function is repositioning the confirmation of "Reset email" to the initial location.
 */
function resetSendEmail() {
  document.querySelector(".forgot__file--wrapper").classList.remove("blur");
  document.querySelector(".response__forgot--container").classList.add("d-none");
  document.getElementById("email__sent").classList.add("d-none");
  document.getElementById("email__sent").style.transform = "translateX(-50%) translateY(0vh)";
}

/**
 * The function is animating the "Reset email" confirmation element.
 */
function animateSentEmail() {
  document.getElementById("email__sent").style.transition = "all 750ms ease-in-out";
  document.getElementById("email__sent").style.transform = "translateX(-50%) translateY(-20vh)";
  setTimeout(resetSendEmail, 1000);
}

/**
 * The function is showing the afirmation of succesfully reseted password.
 */

function showNewPasswordConfirmed() {
  document.querySelector(".forgot__file--wrapper").classList.add("blur");
  document.querySelector(".response__forgot--container").classList.remove("d-none");
  document.getElementById("reset__confirmed").classList.remove("d-none");
  setTimeout(animatePasswordConfirmed, 1);
}

/**
 * The function is repositioning the confirmation of "Password reseted" to the initial location.
 */
function resetPasswordConfirmed() {
  document.querySelector(".forgot__file--wrapper").classList.remove("blur");
  document.querySelector(".response__forgot--container").classList.add("d-none");
  document.getElementById("reset__confirmed").classList.add("d-none");
  document.getElementById("reset__confirmed").style.transform = "translateX(-50%) translateY(0vh)";
}

/**
 * The function is animating the "Password reseted" element.
 */
function animatePasswordConfirmed() {
  document.getElementById("reset__confirmed").style.transition = "all 750ms ease-in-out";
  document.getElementById("reset__confirmed").style.transform = "translateX(-50%) translateY(-20vh)";
  setTimeout(resetPasswordConfirmed, 1000);
}

/***        Board       ***/
/**
 * The function animates the "+" sign from each board section.
 *
 * @param {number} i - Number provided in HTML text.
 */
function markAddIconAsActive(i) {
  let addIcon = document.getElementById(`add-icon${i}`);
  addIcon.style.backgroundImage = 'url("../img/plus-button-inactive.png")';
  addIcon.style.transition = "all 125ms ease-in-out";
}

/**
 * The function changes all the "+" sign to its initial form.
 */
function resetAddIcon() {
  document.querySelectorAll(".add-icon").forEach((add) => {
    add.style.backgroundImage = 'url("../img/plus-button.png")';
    add.style.transition = "all 125ms ease-in-out";
  });
}

/**
 * The function changes the elements orientation to optimize responsive.
 */
function changeResponsiveTemplates() {
  let template = document.getElementById("to-do").lastElementChild;
  let toDo = document.getElementById("to-do");
  let template1 = document.getElementById("in-progress").lastElementChild;
  let inProgress = document.getElementById("in-progress");
  let template2 = document.getElementById("await-feedback").lastElementChild;
  let awaitFeedback = document.getElementById("await-feedback");
  let template3 = document.getElementById("done").lastElementChild;
  let done = document.getElementById("done");
  toDo.insertBefore(template, toDo.children[0]);
  inProgress.insertBefore(template1, inProgress.children[0]);
  awaitFeedback.insertBefore(template2, awaitFeedback.children[0]);
  done.insertBefore(template3, done.children[0]);
}

/**
 * The function is optimiting for responsive.
 *
 * @param {string} id2 - Id of the Html element to be manipulated.
 */
function responsiveTaskModalAnimation(id2) {
  if (window.innerWidth > 768) {
    document.getElementById(id2).classList.add("slide-in-bottom");
  } else {
    document.getElementById(id2).classList.add("slide-in");
    document.getElementById("prio-overlay");
  }
}

/**
 * The function is optimiting for responsive.
 *
 * @param {string} id - Id of the Html element to be manipulated.
 * @param {string} id2 - Id of the Html element to be manipulated.
 */
function closeAddTaskDialog(id, id2) {
  clearAddTaskInputFields();
  editTaskMarker = false;
  if (id == "task-modal" && window.innerWidth > 768) {
    document.getElementById(id).classList.remove("slide-in-bottom");
  } else {
    document.getElementById(id).classList.remove("slide-in");
  }
  setTimeout(() => {
    document.getElementById(id2).classList.add("d-none");
    document.body.style.overflow = "unset";
    resetAddIcon();
  }, 200);
}

function clearAddTaskInputFields() {
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById(
    "category-dropdown"
  ).innerHTML = `<span>Select task category</span><img src="../img/select-arrow.png" alt="">`;
  document.getElementById("description-text").value = "";
  document.getElementById("subtask-input").value = "";
  document.getElementById("subtask-container").innerHTML = "";
  document.querySelectorAll('input[name="assign-contacts"]:checked').forEach((checkbox) => {
    checkbox.checked = false;
  });

  let prioInput = document.querySelector('input[name="prio"]:checked');
  if (prioInput !== null) {
    prioInput.checked = false;
  }
}


function updateProgressBars() {
  tasks.forEach(task => {
    let taskID = task.id
    let attribute = document.querySelector(`.progress-bar${taskID}`);
    if (task.subtasks != 0 && taskID != undefined && attribute != null) {
      let checkedSubtaskCounter = calculateSubtaskProgress(task.subtasks);
      if (checkedSubtaskCounter == 0) {
        attribute.parentElement.classList.add('d-none');
      } else if (checkedSubtaskCounter > 0) {
        if (checkedSubtaskCounter <= 0.2) {
          attribute.parentElement.classList.remove('d-none');
          attribute.style.width = 20 + "%";
        } else if (checkedSubtaskCounter <= 0.4) {
          attribute.style.width = 40 + "%";
        } else if (checkedSubtaskCounter <= 0.5) {
          attribute.style.width = 50 + "%";
        } else if (checkedSubtaskCounter <= 0.6) {
          attribute.style.width = 60 + "%";
        } else if (checkedSubtaskCounter <= 0.8) {
          attribute.style.width = 80 + "%";
        } else {
          attribute.style.width = 100 + "%";
        }
      }
    } else {
      attribute.parentElement.classList.add('d-none');
    }
  })
}

/**
 * The function shows in HTML how many subtasks are checked.
 */
function updateProgressReport() {
  tasks.forEach(task => {
    let taskID = task.id
    let attribute = document.querySelector(`.progress-report${taskID}`);
    if (attribute != null) {
      if (!task.subtasks.length == 0 && taskID != undefined) {
        let isChecked, count;
        attribute.parentElement.classList.remove('d-none');
        [isChecked, count] = getSubtaskCheckboxesChecked(task.subtasks);
        if (isChecked != 0) {
          attribute.innerHTML = `${isChecked} / ${count} done`;
        } else {
          attribute.innerHTML = `0 / ${count} done`;
          attribute.parentElement.parentElement.style.justifyContent = "flex-end";
        };
      }
    };
  });
}


/**
 * The function is showing the confirmation of the task being added.
 */
function taskAddedToBoard() {
  let taskAdded = document.getElementById("task-added");
  taskAdded.classList.add("slide-in-bottom");
}

/**
 * The function does remove the confirmation of the task being added.
 */
function closeTaskAddedToBoard() {
  let taskAdded = document.getElementById("task-added");
  taskAdded.style.transform = "translateX(950px)";
  taskAdded.classList.remove("slide-in-bottom");
  setTimeout(() => {
    resetTaskAddedToBoard();
  }, 200);
}

/**
 * The function reposition the confirmation, of the task being added, to the initial position.
 */
function resetTaskAddedToBoard() {
  let taskAdded = document.getElementById("task-added");
  taskAdded.style.transform = "";
}


/**
 * The function forwards to "Log In" page.
 */
function toLogInPage() {
  window.location.href = "./../../index.html";
}


/**
 * The function shows the HTML element where the "Log Out" button is situated.
 */
function toLogOut() {
  const target = document.getElementById('userPhoto');
  document.addEventListener('click', (event) => {
    const withinBoundaries = event.composedPath().includes(target)
    const tologOut = document.getElementById('logOut__btn--container');
    if (withinBoundaries) {
      tologOut.classList.remove('d-none');
    } else {
      tologOut.classList.add('d-none');
    }
  });
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
 * function generates the elements in the category drop-down of the Add-Task Dialog
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