/***    Variables   ***/
let indexActiveUser;
let indexReset;
let showLogOut = true;
let passwordVisible = false;


/***    Log In  ***/
// Main function in script.js

/**
 * The function is checking if the input data coresponds to an already sign up user; 
 * 
 * @param {string} emailUser - Email provided by the user;
 * @param {string} passwordUser - Password provided by the user;
 * 
 * @returns - If user already registered, true, otherwise false;
 */
async function checkIfExists(emailUser, passwordUser) {
    let emailArray = usersArray.map((email) => email.userEmail);
    let passwordArray = usersArray.map((password) => password.userPassword);
    let findEmail = emailArray.find((email) => email == emailUser);
    let findPassword = passwordArray.find((password) => password == passwordUser);
    if (findEmail === undefined) {
        responseValitation(emailUser, passwordUser, findEmail, findPassword)
        return false;
    } else if (emailUser === findEmail && passwordUser === findPassword) {
        return true;
    }
}


/**
 * The functions provides the given format if email and/or password is incorect.
 * @param {string} emailUser - Email provided by the user.
 * @param {string} passwordUser - Password provided by the user.
 * @param {string} findEmail - Email from database.
 * @param {string} findPassword - Password from database.
 */
function responseValitation(emailUser, passwordUser, findEmail, findPassword) {
    let validation = document.getElementById('logIn__validation');
    if (emailUser != findEmail && passwordUser != findPassword) {
        validation.classList.remove('d-none');
        validation.innerHTML = 'Wrong email and password'
    } else if (emailUser === findEmail && passwordUser != findPassword) {
        validation.classList.remove('d-none');
        validation.innerHTML = 'Wrong password';
    } else if (emailUser != findEmail) {
        validation.classList.remove('d-none');
        validation.innerHTML = 'Wrong email';
    }
}


/**
 * The function register the selection of "Remember me" checkbox.
 * 
 * @returns If checked, return true, otherwise false.
 */
function callCheckBox() {
    let checkbox = document.getElementById('rememberMe');
    let result = checkbox.checked;
    checkbox.addEventListener('change', e => {
        if (e.target.checked) {
            checkbox.setAttribute('checked', true);
            result = e.target.checked;
            return result;
        } else {
            result = e.target.checked;
            return result;
        }
    })
    return result;
}


/**
 * The function selects the user from the user database and is giving the value to activeUser;
 * 
 * @param {string} userEmail - The value coresponds to the email provided by the user.
 */
async function setActiveUser(userEmail) {
    let index = checkIfEmailExists(userEmail)
    indexActiveUser = index;
    activeUser = usersArray[indexActiveUser];
    if (localStorage.getItem("activeUser") !== null)
        activeUser.quickAcces = true;
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
 * The funtion is adding the corresponding email and password of a "Guest User".
 */
function logInUserGuest() {
    let guestEmail = "guestemail@gmail.com";
    let guestPassword = "guestpassword";
    document.getElementById("email").value = guestEmail;
    document.getElementById("password").value = guestPassword;
    logInUser();
}


/**
 * The funtion transform a copy of the email into variable "param".
 * 
 * @param {string} emailUser - Value coresponding to the email given by the user.
 * @returns URL params value.
 */
async function getActiveUserURL(emailUser) {
    var first = "email";
    var second = `${emailUser}`;
    let params = new URLSearchParams();
    params.append("first", first);
    params.append("second", JSON.stringify(second));
    console.log(params)
    return params;
}


/**
 * The function forwards to "Summary" page.
 * 
 * @param {boolean} acces - If acces is granted or not.
 * @param {*} emailUser - Value coresponding to the email given by the user.
 */
async function goToSummary(acces, emailUser) {
    if (acces == true) {
        let params = await getActiveUserURL(emailUser)
        location.href = "./src/html/summary.html?" + params.toString();
    }
}


/**
 * The function is adding a new user to database.
 */
async function addNewUser() {
    await getUserInfo();
}

/**
 * The function is creating an object with the informations of the new user.
 */
async function getUserInfo() {
    let newName = document.getElementById('newUser-name').value;
    let newEmail = document.getElementById('newUser-email').value;
    let newPassword = document.getElementById('newUser-password').value;
    let newID = usersArray.length;
    let newInitials = getInitials(newName);
    let newColor = getColor();
    let newUser = {
        "userName": newName,
        "userEmail": newEmail,
        "userPassword": newPassword,
        "userID": newID,
        "userInitials": newInitials,
        "userPhone": "",
        "userContacts": [],
        "userColor": newColor,
        "quickAcces": false,
    };
    await processNewUserInfo(newEmail, newUser);
}


/**
 * The function provide the feedback if "New user" has been succesfully created or not.
 * 
 * @param {string} newEmail - Value coresponding to the email given by the new user.
 * @param {object} newUser - Object with data coresponding to the new user.
 */
async function processNewUserInfo(newEmail, newUser) {
    let z = checkIfAlreadyRegistered(newEmail);
    if (z == undefined) {
        await addToDatabase(newUser);
        setTimeout(toLogInPage, 1250);
        setTimeout(resetConfirmation, 1250);
        cleanInput();
    } else {
        showUserAlreadyRegistered();
    }
}


/**
 * The functions is adding the "New User" to the existing user database.
 * 
 * @param {object} newUser - Object with data coresponding to the new user.
 */
async function addToDatabase(newUser) {
    usersArray.push(newUser);
    await saveInBackend();
    showConfirmation();
}


/**
 * 
 * @param {*} newEmail - Value coresponding to the email given by the new user.
 * @returns - "undefined" if nothing has been found or a string, if "newEmail" is already in database. 
 */
function checkIfAlreadyRegistered(newEmail) {
    let emailArray = usersArray.map((email) => email.userEmail);
    let findEmail = emailArray.find((email) => email == newEmail);
    return findEmail;
}


/**
 * The function creates a random color for the new user and provide it to "newUser". 
 * 
 * @returns - The color generated by the function.
 */
function getColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = `rgb(${r}, ${g}, ${b})`;
    return color;
}


/**
 * The function is taking the first letter from each word and creates a new word. 
 * 
 * @param {string} newName - Value coresponding to the givin name from the new user.
 * @returns - A string made with the first letter of each word from "newName".
 */
function getInitials(newName) {
    var names = newName.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    } else if (names.length == 1) {
        initials = newName.substring(0, 2).toUpperCase();
    }
    return initials;
}


/*** Reset Password functions ***/
/**
 * The function is saving globally the index of the user that is requesting to change the password.
 * 
 * @returns - A number reprezenting the index of the user.
 */
function toResetPassword() {
    let emailUser = document.getElementById("forgot__password--email").value;
    indexReset = checkIfEmailExists(emailUser);
    allowResetPassword(indexReset);
    return indexReset;
}


/**
 * The function is calling the follow up functions to provide the password reset.
 * 
 * @param {*} indexReset - The value is coresponding to the index of the user.
 */
async function resetPasswordUser(indexReset) {
    let oldPass = usersArray[indexReset];
    let newPass = document.getElementById('user__newPassword-1').value;
    let confirmPass = document.getElementById('user__newPassword-2').value;
    if (indexReset >= 0 && newPass === confirmPass) {
        document.getElementById('compar__password--validation').classList.add('d-none')
        oldPass['userPassword'] = newPass;
        await saveInBackend();
        showNewPasswordConfirmed();
        setTimeout(toLogInPage, 1000);
    } else {
        document.getElementById('compar__password--validation').classList.remove('d-none')
    }
    clearInputNewPassword();
}



/**
 * The functions is checking if email does exist in database.
 * 
 * @param {string} emailUser - Email provided by the user.
 * @returns - An index coresponding to the location in the "userArry" where the email has been found, otherwise "undefined".
 */
function checkIfEmailExists(emailUser) {
    let emailArray = usersArray.map((email) => email.userEmail);
    let findEmailIndex = emailArray.findIndex((email) => email == emailUser);
    return findEmailIndex;
}


/**
 * The function is changing the icon of the password.
 */
function checkPasswordImg() {
    setInterval(() => {
        let a = 0;
        let input = document.getElementById('password');
        let img = document.getElementById('password__img');
        if (input.value.length > a && passwordVisible) {
            visiblePasswordImg(input, img);
        } else if (input.value.length > a && !passwordVisible) {
            hiddenPasswordImg(input, img);
        } else {
            defaultPasswordImg(img);
        }
    }, 100)
}


/**
 * The function in changing to password icon
 * 
 * @param {HTMLInputElement} input - DOM Element; 
 * @param {img} img - DOM Element;
 */
function visiblePasswordImg(input, img) {
    img.src = "./src/img/icon_password_visible.png";
    img.style = "cursor: pointer";
    input.type = "text";
}


/**
 * The function in changing to password icon
 * 
 * @param {HTMLInputElement} input - DOM Element; 
 * @param {img} img - DOM Element;
 */
function hiddenPasswordImg(input, img) {
    img.src = "./src/img/icon_password_nonvisible.png";
    img.style = "cursor: pointer";
    input.type = "password";
}


/**
 * The function in changing to password icon
 * 
 * @param {img} img - DOM Element;
 */
function defaultPasswordImg(img) {
    img.style = "cursor: unset";
    img.src = "./src/img/input_password.png";
}


/**
 * The function chnages the password from not readable to readable.
 */
function changeViewPassword() {
    if (passwordVisible === false) {
        passwordVisible = true;
    } else {
        passwordVisible = false;
    }
}
