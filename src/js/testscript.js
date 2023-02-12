function validateEmail() {
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const email = document.getElementById("emailAddress").value;
  if (regex.test(email)) {
      console.log("email is valid");
      return true;
  } else {
      console.log("email is NOT valid");
      return false;
    }
    
}

function showError() {
    const emailError = document.getElementById('errorfield');
    if(validateEmail() == false) {
      // If the field is empty
      // display the following error message.
      emailError.innerHTML = 'You need to enter an e-mail address.';
    } else {
      // If the field doesn't contain an email address
      // display the following error message.
      emailError.innerHTML = 'Great. This email is valid';
    } 

    // Set the styling appropriately
    // emailError.className = 'error active';
  }