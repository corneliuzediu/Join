let contact = [];
let emails = [];
let newmail;
let newContact = {};
let newContactInvite;
let alphabetLetters = []; //takes all first letters of activeUserContacts in alphabetically order
let priorLetter; //sets the last letter for the Alphabet Registery


/**
 * -loads all contacts into contact-details and checks. If contacts do exist, a contact delete button will be displayed
 */
async function loadAllContacts() {
  await init();
  renderContactList();
  showDeleteButton();
}


/**
 * function gets a specific contact object by id
 * @param {integer} index -the index of a specific contact
 * @returns {object array} -returns a single complete contact as object
 */
function getContactDetails(index) {
  contact = activeUserContacts[index];
  return contact;
}


/**
 * function pushes new user object into activeUserContacts and saves it into the backend
 * @returns 
 */
async function addNewUserContact() {
  let newContact = getContactInfo();
  newmail = newContact["email"];
  if (checkIfNewContactEmailExists(newmail)) {
    sorryEmailAlreadyExists(newmail);
    return;
  }
  activeUserContacts.push(newContact);
  await saveInBackendUserContacts();
if (document.URL.includes("contacts.html")) {
    await loadAllContacts();
  document.getElementById("delete-contact-button").classList.remove("d-none");
  let j = getIndexOfEmail(newmail);
  openContactDetail(j);
  clearContent();
  closeAddContactDialog();
} else { return; }
}


/**
 * function checks if a newmail already exists in the activeUserContacts array
 * @param {object} newmail
 * @returns true including the newmail if it already exists 
 */
function checkIfNewContactEmailExists(newmail) {
  let mailarray = activeUserContacts.map((email) => email.email);
  for (let i = 0; i < mailarray.length; i++) {
    let mail = mailarray[i];
    if (mail == newmail) {
      return true, newmail;
    }
  }
}


/**
 * Editing of existing contact
 * Function reads updated form fields and replaces specified contact object in object array
 * @param {integer} index
 */
async function updateUserContact(index) {
  newContactData = getNewContactInfo();
  activeUserContacts.splice(index, 1, newContactData);
  await saveInBackendUserContacts();
  await loadAllContacts(); // refreshing contacts in contacts.html
  openContactDetail(index);
  clearEditContent();
  closeEditContactDialog();
}


/**
 * Function reads the newly submitted form fields when adding a new contact details in "New Contact Dialog"
 * @returns new contact as object
 */
function getContactInfo() {
  let newEmail;
  let newName;
  
  if (newContactInvite) {
    newEmail = newContactInvite;
    newName = newEmail.split('@')[0];
  } else {
    newEmail = document.getElementById("new-contact-email").value;
    newName = document.getElementById("new-contact-name").value;
  }
  
  let newPhone = document.getElementById("new-contact-phone");
  newPhone == null ? newPhone = '' : newPhone = newPhone.value;
  
  let initials = setContactInitials(newName);
  let initialsColor = setColorForInitial(initials);

  let newContact = {
    name: newName,
    initials: initials,
    initialsColor: initialsColor,
    email: newEmail,
    phone: newPhone,
  };
  return newContact;
}


/**
 * function is called within the AddTask when a new contact is being invited during this action
 * @returns calls and error message, if email is not valid otherwise adds the invite to all contacts
 */
function inviteNewContactToTask() {
  let emailError = document.getElementById('errorfield');
  newContactInvite = document.getElementById("new-contact-email").value;
  if (validateEmail() == true) {
    emailError.classList.remove = 'error active';
    renderContactsInDropDown();
  } else if (validateEmail() == false) {
    newContactInvite = '';
    showError();
    return;
  }
  addNewUserContact();
}


/**
 * function checks validity of current input of invited email
 * @returns boolean
 */
function validateEmail() {
  const regex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const email = document.getElementById("new-contact-email").value;
  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
}


/**
 * function displays the error message in a specific HTML element
 */
function showError() {
  let emailError = document.getElementById('errorfield');
  emailError.innerHTML = 'Please enter a valid e-mail address';
    emailError.className = 'error active';
    } 


/**
 * Function is called when adding a new contact and if submitted new contacts email already exists in contacts array
 * @param {string} newmail
 */
function sorryEmailAlreadyExists(newmail) {
  document.getElementById("info-text").classList.remove("info-text");
  document.getElementById("new-contact-email").style.color = "red";
  document.getElementById("info-text").innerHTML = `Sorry, the e-mail ${newmail} already exists!`;
  document.getElementById("info-text").classList.add("info-text-alert");
}


/**
 * Function reads the form fields when altering/editing existing contact details in "Edit Contact Dialog"
 * @returns new contact as object
 */
function getNewContactInfo() {
  let newName = document.getElementById("edit-contact-name").value;
  let newEmail = document.getElementById("edit-contact-email").value;
  let newPhone = document.getElementById("edit-contact-phone").value;
  let initials = setContactInitials(newName);
  let initialsColor = setColorForInitial(initials);
  let newContact = {
    name: newName,
    initials: initials,
    initialsColor: initialsColor,
    email: newEmail,
    phone: newPhone,
  };
  return newContact;
}


/**
 * function sorts the contacts array in alphabetical order
 */
function sortActiveUserContacts() {
  activeUserContacts.sort((a, b) => {
    if (a.name != undefined && b.name != undefined) {
      const firstName = a.name.toUpperCase(); // ignore upper and lowercase
      const secondName = b.name.toUpperCase(); // ignore upper and lowercase
      if (firstName < secondName) {
        return -1;
      }
      if (firstName > secondName) {
        return 1;
      }
      // names must be equal
      return 0;
    }
  });
}


/**
 * @returns array of emails that belong to the active user contacts
 */
function getEmails() {
  emails = activeUserContacts.map((element) => {
    return element.email;
  });
  return emails;
}


/**
 * function get the index of newmail
 * @param {string} newmail
 * @returns index of email of newly created contact
 */
function getIndexOfEmail(newmail) {
  let emails = activeUserContacts.map((element) => {
    return element.email;
  });
  let i = emails.indexOf(newmail);
  return i;
}


/**
 *function creates the initials from first- and lastname
 * @param {string} newName
 * @returns Upper Case Initials of FirstName and LastName in array
 */
function setContactInitials(newName) {
  let names = newName.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  } else if (names.length == 1) {
    initials = newName.substring(0, 2).toUpperCase();
  }
  return initials;
}

