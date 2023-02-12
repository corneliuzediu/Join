/*// HTML RENDERING & ANIMATION ////////////////////////////////*/
/**
 * function opens contact Detail Modal and calls the necessary functions to render details and HTML
 * @param {integer} index
 */
function openContactDetail(index) {
  setTimeout(() => {
    document.getElementById("contact-detail").classList.remove("slide-in");
  }, 20);

  let content = document.getElementById("contact-detail");
  let { email, initials, initialsColor, name, phone } = getContactDetails(index);

  content.innerHTML = "";
  content.innerHTML = generateContactDetail(index, name, initials, initialsColor, email, phone);
  setTimeout(() => {
    document.getElementById("contact-detail").classList.add("slide-in");
  }, 200);
}

/**
 * function makes the div visible that includes the delete button
 */
function showDeleteButton() {
  if (getEmails()) {
    document.getElementById("delete-contact-button").classList.remove("d-none");
  } else {
    document.getElementById("delete-contact-button").classList.add("d-none");
  }
}

/**
 * function adds style to initiate slide-in CSS animation
 */
function slideOut() {
  document.getElementById("contact-detail").classList.remove("slide-in");
}

/**
 * function calls helper functions to render all contacts in a list
 */
function renderContactList() {
  sortActiveUserContacts();
  let firstLetters = activeUserContacts.map((item) => item.initials[0]);

  let content = document.getElementById("contact-list");
  content.innerHTML = " ";

  for (let i = 0; i < activeUserContacts.length; i++) {
    renderRegistery(i, firstLetters);
    content.innerHTML += `
        <div class="contact-box" onclick="openContactDetail(${i})">
        <div class="letters" style="background-color: ${activeUserContacts[i]["initialsColor"]}">${activeUserContacts[i]["initials"]}</div>
        <div class="word-break">
        <div>${activeUserContacts[i]["name"]}</div>
        <div>${activeUserContacts[i]["email"]}</div>
        <div>${activeUserContacts[i]["phone"]}</div>
        </div>
        </div>
        `;
  }
}

/**
 *
 * @param {integer} i
 * @param {string} firstLetters
 * @returns function renders initials
 */
function renderRegistery(i, firstLetters) {
  if (firstLetters[i] == priorLetter) {
    return;
  } else {
    document.getElementById("contact-list").innerHTML += `
    <div class="contact-registery">${firstLetters[i]}
    `;
    priorLetter = firstLetters[i];
  }
}

/**
 * function opens AddContactDialog Modal
 */
function openAddContactDialog() {
  clearContent();

  setTimeout(() => {
    document.getElementById("add-contact-modal").classList.add("slide-in");
  }, 10);
}

/**
 * function closes prior opend dialog
 */
function closeAddContactDialog() {
  clearContent();
  document.getElementById("add-contact-modal").classList.remove("slide-in");

  setTimeout(() => {
    document.getElementById("overlay").classList.add("d-none");
  }, 200);
}

/**
 * function clears form values and css classes
 */
function clearContent() {
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("info-text").classList.remove("info-text-alert");
  document.getElementById("info-text").classList.add("info-text");
  document.getElementById("info-text").innerHTML = "Tasks are better with a team!";
  document.getElementById("new-contact-name").value = "";
  document.getElementById("new-contact-email").value = "";
  document.getElementById("new-contact-phone").value = "";
  document.getElementById("new-contact-email").style.color = "black";
}

/**
 * function clears form values and css classes
 */
function clearEditContent() {
  document.getElementById("edit-contact-name").value = "";
  document.getElementById("edit-contact-email").value = "";
  document.getElementById("edit-contact-phone").value = "";
}

/**
 * function opens Edit Contact Dialog
 * @param {integer} index
 */
function openEditContactDialog(index) {
  document.getElementById("overlay2").classList.remove("d-none");
  let contact = getContactDetails(index);
  let { email, initials, initialsColor, name, phone } = contact;
  let content = document.getElementById("edit-contact-modal");
  content.innerHTML = generateContactEditDialog(index);
  document.getElementById("user-avatar").textContent = `${initials}`;
  document.getElementById("user-avatar").style = `background-color:${initialsColor}`;
  document.getElementById("edit-contact-name").value = `${name}`;
  document.getElementById("edit-contact-email").value = `${email}`;
  document.getElementById("edit-contact-phone").value = `${phone}`;
  animateEditDialog();
}

/**
 * function runs animation
 */
function animateEditDialog() {
  setTimeout(() => {
    document.getElementById("edit-contact-modal").classList.add("slide-in");
  }, 10);
}

/**
 * function closes Edit Contact Dialog
 */
function closeEditContactDialog() {
  document.getElementById("edit-contact-modal").classList.remove("slide-in");

  setTimeout(() => {
    document.getElementById("overlay2").classList.add("d-none");
  }, 200);
}

/**
 * function renders the contact edit dialog modal
 * @param {integer} index
 * @returns HTML code
 */
function generateContactEditDialog(index) {
  return `
  <div class="contact-dialog-top">
                    <img class="close-icon" src="../img/close_icon.png" onclick="closeEditContactDialog()">
                    <img src="../img/join-logo.png">
                    <h2 class="contact-title" id="exampleModalLabel">Edit contact</h2>
  
                    <h4 id="info-text" class="info-text">Tasks are better with a team!</h4>
  
                </div>
                <div class="contact-dialog-bottom">

                    <div class="user-avatar" id="user-avatar"></div>
                    
                    <div class="form">
                        <form class="add-contact_form" onsubmit="updateUserContact(${index}); return false;">
                            <div class="add-contact-input-field">
                                <input id="edit-contact-name" class="contact-form-control contacts_input" type="text"
                                    placeholder="Name" required> 
                                <img src="/src/img/input_name.png" alt="">
                            </div>
                            <div class="add-contact-input-field">
                                <input id="edit-contact-email" class="contact-form-control contacts_input " type="email"
                                    placeholder="Email" required>
                                <img src="/src/img/input_mail.png" alt="">
                            </div>
                            <div class="add-contact-input-field">
                                <input id="edit-contact-phone" class="contact-form-control contacts_input " type="number"
                                    pattern="" placeholder="Phone" required>
                                <img src="/src/img/phone_icon.png" alt="">
                            </div>
                            <div class="edit-contact-buttons">
                            <button type="submit" class="edit-contact-button" required>
                                <span>Save</span><img src="../img/addcontact.png">
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
                `;
}

/**
 * function renders the contact details
 * @param {integer} index
 * @param {string} name
 * @param {string} initials
 * @param {string} initialsColor
 * @param {string} email
 * @param {string} phone
 * @returns HTML code
 */
function generateContactDetail(index, name, initials, initialsColor, email, phone) {
  return `
    <div onclick="slideOut()" class="contact-detail-mobile" id="contact-detail-mobile"><img src="../img/arrow_forward.png" alt=""></div>
    <span class="span-display-none">Kanban Project Management Tool</span>
    <div class="contact-detail-header">
    <div class="letters-large" style="background-color: ${initialsColor}">${initials}
    </div>
    <div>
        <div class="contact-detail-header-right">
            <div class="contact-name">${name}</div>
            <div onclick ="toAddTask()"class="add-task-link"><img src="../img/plus_icon_small.png">Add Task</div>
        </div>
  
    </div>
    </div> 
  
  <div class="contact-body">
  
    <div class="contact-body-header">
        <div class="contact-information">Contact Information</div>
        <div class="edit-contact" onclick="openEditContactDialog(${index})"><img  onclick="openEditContactDialog()"src="../img/pencil_small.png">Edit Contact</div>
    </div>
    <div class="contact-detail-bold">Email</div>
    <a class="contact-detail-medium" href="mailto:${email}">${email}</a>
    <div class="contact-detail-bold">Phone</div>
    <a class="contact-detail-medium" href="tel:${phone}">${phone}</a>
    <div class="edit-contact-responsive" onclick="openEditContactDialog(${index})"><img  src="../img/edit_contact_responsive_icon.png"></div>
    </div>
  </div>
        `;
}


/**
 * function gets arry activeUserContacts and renders drop-down in Add-Task Dialog
 */
function renderContactsInDropDown() {
  content = document.getElementById("collapseContacts");
  content.innerHTML = " ";
  content.innerHTML = `
  <div class="dropdown-contact">
    <input  type="email" id="new-contact-email" maxlength="200" required placeholder="name@email.domain" title="Please provide a valide email address" name="invite_contact"/>
    <input value="Invite" onclick="inviteNewContactToTask()" type="button" class="btn-add-task-invite"></label>
  </div>
  <span id="errorfield"></span>
  `;
  
  if (newContactInvite !== undefined) {
    content.innerHTML += `
        <div class="dropdown-contact">
        <label for="${newContactInvite}" style="display: flex;align-items: center;justify-content: space-between;width: 100% !important;">${newContactInvite}
        <input type="checkbox" id="${newContactInvite}" name="assign-contacts" value="${newContactInvite}">
        </label>
    </div>`;
  }
  for (let i = 0; i < activeUserContacts.length; i++) {
    let name = activeUserContacts[i]["name"];
    content.innerHTML += `
        <div class="dropdown-contact">
        <label for="${name}" style="display: flex;align-items: center;justify-content: space-between;width: 100% !important;">${name}
        <input type="checkbox" id="${name}" name="assign-contacts" value="${name}">
        </label>
    </div>`;
  }
}

/**
 * function renders all active user contacs into Contacts Edit DropDown
 * @param {integer} taskID
 */
function renderContactsInEditDropDown(taskID) {
  content = document.getElementById("collapseContactsEdit");
  content.innerHTML = " ";
  for (let i = 0; i < activeUserContacts.length; i++) {
    let name = activeUserContacts[i]["name"];
    if (contactAlreadyAssigned(taskID, name)) {
      content.innerHTML += `
      <div class="dropdown-contact">
        <label for="${name}">${name}
          <input type="checkbox" id="${name}"  checked  name="assign-contacts" value="${name}">
        </label>
      </div>`;
    } else {
      content.innerHTML += `
      <div class="dropdown-contact">
      <label for="${name}">${name}
      <input type="checkbox" id="${name}" name="assign-contacts" value="${name}"></label>
      </div>`;
    }
  }
}

/**
 * function searches task to derive contact names that are assign to task
 * @param {integer} taskID
 * @param {string} name
 * @returns
 */
function assignedToContactTrue(taskID, name) {
  let checkedNames = [];
  if (tasks[taskID]["assignedTo"] != null && contactAlreadyAssigned(taskID, name)) {
    for (let i = 0; i < tasks[taskID]["assignedTo"].length; i++) {
      checkedNames.push(tasks[taskID]["assignedTo"][i]);
    }
  }
  return checkedNames.includes(name);
}


function contactAlreadyAssigned(taskID, name) {
  let nameAllreadyAssigned = tasks[taskID]["assignedTo"].find(nameInArray => name == nameInArray)
  if (nameAllreadyAssigned != undefined)
    return true;
  else
    return false;
}
