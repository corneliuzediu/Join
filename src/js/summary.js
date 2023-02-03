const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * function calls the init() and all functions to render the statistic values in the summary board
 */
async function initSummary() {
  await init();
  // await loadActiveUserFromBackend();
  renderGreeting();
  renderTodaysDate();
  renderBoardStatistics();
}

/**
 * function renders Active User Name and actual greeting according to the day time
 */
function renderGreeting() {
  renderActiveUserName();
  renderDayGreeting();
}

/**
 * function renders username
 */
function renderActiveUserName() {
  document.getElementById("active-user-name").innerHTML = activeUser.userName;
}

/**
 * function renders day greeting
 */
function renderDayGreeting() {
  let greeting = getDayTime();
  document.getElementById("day-time").innerHTML = greeting;
}

/**
 * function renders date of today
 */
function renderTodaysDate() {
  let { day, month, year } = createDate();
  document.getElementById("date-of-today").innerHTML = `${month} ${day},  ${year}`;
}

/**
 * function gets daily hour and
 * @returns returns proper string for greeting
 */
function getDayTime() {
  let date = new Date();
  let hours = date.getHours();
  if (hours > 0 && hours < 12) {
    return "Good morning, ";
  } else if (hours >= 12 && hours < 18) {
    return "Good afternoon, ";
  } else {
    return "Good evening, ";
  }
}

/**
 * function calls all functions to render BoardStatistics
 */
function renderBoardStatistics() {
  renderTaskInBoard();
  filterTasksUrgent();
  filterProgress();
  filterAwaitingFeedback();
  filterTasksDone();
  filterTasksToDo();
}

function renderTaskInBoard() {
  return (document.getElementById("task-in-board").innerHTML = `${tasks.length}`);
}

function filterProgress() {
  let filteredItems = tasks.filter((item) => {
    return item.category == "in-progress";
  });
  return (document.getElementById("task-in-progress").innerHTML = `${filteredItems.length}`);
}

function filterAwaitingFeedback() {
  let filteredItems = tasks.filter((item) => {
    return item.category == "await-feedback";
  });
  return (document.getElementById("awaiting-feedback").innerHTML = `${filteredItems.length}`);
}

function filterTasksDone() {
  let filteredItems = tasks.filter((item) => {
    return item.category == "done";
  });
  return (document.getElementById("tasks-done").innerHTML = `${filteredItems.length}`);
}

function filterTasksToDo() {
  let filteredItems = tasks.filter((item) => {
    return item.category == "to-do";
  });
  return (document.getElementById("tasks-to-do").innerHTML = `${filteredItems.length}`);
}

function filterTasksUrgent() {
  let filteredItems = tasks.filter((item) => {
    return item.priority == "high";
  });
  return (document.getElementById("tasks-urgent").innerHTML = `${filteredItems.length}`);
}


//////////////// HELPER-FUNCTIONS ////////////////////
function createDate() {
  let date = new Date();
  let fullDate = {
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
  };
  return fullDate;
}


function fromSummaryToBoard() {
  let params = new URLSearchParams(window.location.search);
  let first = params.get("first");
  let userEmail = JSON.parse(params.get("second"));
  window.location.href = "../html/board.html?" + params.toString();
}