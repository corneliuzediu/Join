let usersArray = [];      // Array that holds the user list from the backend;
let activeUser = [];      // Array that holds the actiov user info;
let activeUserContacts = [];  // Array that holds the contacts of the active user;


/**
 * After openning the page, calls the functions that animate the logo;
 */
async function logoAnimation() {
  transitionLogo();
  setTimeout(changeBg, 350);
  setTimeout(showCardAndHeader, 400);
  await loadUsersFromBackend();
  logInByQuickAcces();
}


/**
 * After "Log In", the function is collectiong a serial if data throw the corresponding functions
 */
async function init() {
  await includeHTML();
  await loadUsersFromBackend();
  await getActiveUser();
  await loadUserContactsFromBackend();
  await loadUserTasksFromBackend();
  getHighlight();
}


/**
 * The function provides the HTML Template.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes all code that is wrapped in the <div> with the specified attribute".
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}


// Local Storage & Active user.
/**
 * The functions does save the active user in local storage.
 * @param {object} activeUser - The object contains the informations of the active user.
 */
async function saveLocalActiveUser(activeUser) {
  let stringStorage = await JSON.stringify(activeUser);
  localStorage.setItem("activeUser", stringStorage);
}


/**
 * The functions is deleting the active user in local storage.
 * @param {array} activeUser - The object contains the informations of the active user.
 */
async function deleteLocalActiveUser(activeUser) {
  window.localStorage.clear();
  activeUser = [];
}


/**
 * The function is checking is the user was already register throw local storage.
 * If user was already registered, the data of active user are collected from the Local Storage, otherwise from the URL.
 */
async function getActiveUser() {
  if (localStorage.getItem("activeUser") !== null) {
    let stringStorage = localStorage.getItem("activeUser");
    activeUser = await JSON.parse(stringStorage);
    activeUser.quickAcces = true;
  } else if (localStorage.getItem("activeUser") === null) {
    await setActiveUser(collectActiveUserFromURL())
    await saveLocalActiveUser(activeUser)
  }
}


/**
 * The functions is collecting the active user email from the UR.
 * @returns - the email of the active user.
 */
function collectActiveUserFromURL() {
  let params = new URLSearchParams(window.location.search);
  let first = params.get("first");
  let userEmail = JSON.parse(params.get("second"));
  return userEmail;
}


/**
 * The functions provides the info if the user is allowed to be saved in local storage
 * @returns - "True" or "False".
 */
async function checkIfQuickAcces() {
  goLogIn = activeUser["quickAcces"];
  return goLogIn;
}


/**
 * The function is provideing the users data from the server.
 */
async function loadUsersFromBackend() {
  await downloadFromServer();
  usersArray = JSON.parse(backend.getItem("usersArray")) || [];
}


/**
 * The function is saveing the users data in server.
 */
async function saveInBackend() {
  await backend.setItem("usersArray", JSON.stringify(usersArray));
}


///////// Backend Contacts
/**
 * function saves all specific contacts of active user in Backend under the key 'activeUserEmail'
 */
async function saveInBackendUserContacts() {
  activeUserEmail = activeUser["userEmail"];
  await backend.setItem(`${activeUserEmail}`, JSON.stringify(activeUserContacts));
}


/**
 * function loads all spedific contacts of active user from Backend
 */
async function loadUserContactsFromBackend() {
  activeUserEmail = activeUser["userEmail"];
  await downloadFromServer();
  activeUserContacts = JSON.parse(backend.getItem(`${activeUserEmail}`)) || [];
}


/**
 * function displays red alert button before final deletion of all active user contacts in Backend 
 */
function deleteUserContacts() {
  document.getElementById("delete-contact-button").classList.add("d-none");
  document.getElementById("delete-contact-button-alert").classList.remove("d-none");
}


/**
 * function aborts deletion
 */
function abortDeleteContacts() {
  document.getElementById("delete-contact-button").classList.remove("d-none");
  document.getElementById("delete-contact-button-alert").classList.add("d-none");
}


/**
 * function deletes all specific active user contacts in Backend, which are save under this key 'activeUserEmail'
 */
async function executeDeleteContacts() {
  document.getElementById("delete-contact-button-alert").classList.add("d-none");
  await backend.deleteItem(`${activeUserEmail}`);
  activeUserContacts = [];
  document.getElementById("contact-list").innerHTML = "";
  document.getElementById("contact-detail").innerHTML = "";
}


/**
 * function saves all tasks of active user in Backend under this key 'activeUserEmail_task'
 */
async function saveInBackendUserTasks() {
  await backend.setItem(`taskArray`, JSON.stringify(tasks));
}


/**
 * function loads all active user tasks from Backend
 */
async function loadUserTasksFromBackend() {
  await downloadFromServer();
  // activeUserTasks = `${activeUser["userEmail"]}_task`;
  tasks = JSON.parse(backend.getItem('taskArray')) || [];
}


/**
 * The function does the procceses for the "Log In". 
 */
async function logInUser() {
  let emailUser = document.getElementById("email").value;
  let passwordUser = document.getElementById("password").value;
  let acces = await checkIfExists(emailUser, passwordUser);
  await checkIfRmemberMe(emailUser);
  goToSummary(acces, emailUser); // goes to login-register.js line 154 to pass email with url
  emailUser.value = "";
  passwordUser = "";
}


/**
 * The function does log is the previous user, if "Remember me" was selected.
 */
async function logInByQuickAcces() {
  if (localStorage.getItem("activeUser") !== null) {
    let stringStorage = localStorage.getItem("activeUser");
    if (stringStorage != "undefined")
      activeUser = await JSON.parse(stringStorage);
  }
  if (activeUser.quickAcces == true) {
    document.getElementById('email').value = activeUser.userEmail;
    document.getElementById('password').value = activeUser.userPassword;
    // let acces = activeUser.quickAcces;
    // let emailUser = activeUser.emailUser;
    // goToSummary(acces, emailUser);
  }
}


/**
 * The function does the procceses for the "Log Out". 
 */
async function logOut() {
  if (localStorage.getItem("activeUser") !== null) {
    await saveLocalActiveUser(activeUser);
  }
  toLogInPage();
}


/**
 * The funtion transform a copy of the email into variable "param".
 * @param {string} emailUser - Value coresponding to the email given by the user.
 * @returns URL params value.
 */
async function getActiveUserURL(emailUser) {
  let first = "email";
  let second = `${emailUser}`;
  let params = new URLSearchParams();
  params.append("first", first);
  params.append("second", JSON.stringify(second));
  return params;
}


/**
 * The function selects the user from the user database and is giving the value to activeUser;
 * @param {string} userEmail - The value coresponds to the email provided by the user.
 */
async function setActiveUser(userEmail) {
  let index = checkIfEmailExists(userEmail)
  indexActiveUser = index;
  activeUser = usersArray[indexActiveUser];
  if (localStorage.getItem("activeUser") !== null & activeUser)
    activeUser.quickAcces = true;
}


/**
 * The funtion is checking if the user decided to be saved local.
 * @param {string} emailUser - Value coresponding to the email given by the user.
 */
async function checkIfRmemberMe(emailUser) {
  if (callCheckBox()) {
    await setActiveUser(emailUser);
    if (activeUser) {
      activeUser.quickAcces = true;
    }
    await saveLocalActiveUser(activeUser)
  } else {
    activeUser.quickAcces = false;
    await deleteLocalActiveUser(activeUser);
  }
}


/**
 * The functions is checking if email does exist in database.
 * @param {string} emailUser - Email provided by the user.
 * @returns - An index coresponding to the location in the "userArry" where the email has been found, otherwise "undefined".
 */
function checkIfEmailExists(emailUser) {
  let emailArray = usersArray.map((email) => email.userEmail);
  let findEmailIndex = emailArray.findIndex((email) => email == emailUser);
  return findEmailIndex;
}


/**
 * The function is taking the first letter from each word and creates a new word. 
 * @param {string} newName - Value coresponding to the givin name from the new user.
 * @returns - A string made with the first letter of each word from "newName".
 */
function getInitials(newName) {
  let names = newName.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  } else if (names.length == 1) {
    initials = newName.substring(0, 2).toUpperCase();
  }
  return initials;
}


/**
 * @param {string} initials
 * @returns a string that represents one of 5 possible rgb colors
 */
function setColorForInitial(initials) {
  let number = 0;
  for (let i = 0; i < initials.length; i++) {
    let letterNumber = initials.charCodeAt(i) - 64;
    number = number + letterNumber;
  }
  let remainder = number % 5;
  if (remainder === 0) {
    return "rgb(221,70,60)";
  } else if (remainder === 1) {
    return "rgb(252,188,201)";
  } else if (remainder === 2) {
    return "rgb(99,191,215)";
  } else if (remainder === 3) {
    return "rgb(253,197,38)";
  } else return "rgb(128,168,77)";
}
