/**
 * The functions is providing the User Email to Summary Page
 */
function toSummary() {
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    window.location.href = "../html/summary.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Board Page
 */
function toBoard() {
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    window.location.href = "../html/board.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Add Task Page
 */
function toAddTask() {
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    window.location.href = "../html/add_task.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Contacts Page
 */
function toContacts() {
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    window.location.href = "../html/contacts.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Legal Notice Page
 */
function toLegalNotice() {
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    window.location.href = "../html/legal_notice.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Help Page
 */
function toHelp() {
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    window.location.href = "../html/help.html?" + params.toString();
}


/**
 * The function is getting the location in order si highlight the sidebar.
 */
function getHighlight() {
    let pathname = this.location.pathname;
    let location = getLocation(pathname);
}


/**
 * The function is adding a class in order to highlight the button.
 * 
 * @param {string} pathname - The URL path.
 */
function getLocation(pathname) {
    if (pathname.match("summary")) {
        document.getElementById('summary').classList.add('sidebar__highlight');
    }
    if (pathname.match("board")) {
        document.getElementById('board').classList.add('sidebar__highlight');
    }
    if (pathname.match("task")) {
        document.getElementById('task').classList.add('sidebar__highlight');
    }
    if (pathname.match("contacts")) {
        document.getElementById('contacts').classList.add('sidebar__highlight');
    }
    if (pathname.match("legal_notice")) {
        document.getElementById('legal-notice').classList.add('legal__highlight');
        document.getElementById('legal-notice-icon').src = "../img/legal-notice-icon-active.png";
    }
}