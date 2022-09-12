/* 

-- 
  "Below is the original code for the challenge that was written purely in JavaScript per request. 
   In my spare time, I've refactored it to use both React and TypeScript not only for my own personal gain 
   and knowledge but also to demonstrate just how superior and optimal React is compared to JavaScript. I've 
   also gone ahead and added a bit more styling to the React form since I had more time to play around. 
   Enjoy!"
--

<div id="add-user-wrapper">
  <h2>Add a User:</h2>
  <form id="add-user-form">
    <div class="form-element-wrapper">
      <div class="field-container">
        <label for="username">* Username:</label>
        <input class="form-input" type="text" id="username" name="username" placeholder="name" required aria-required="true">
      </div>
      <div class="form-errors" id="username-error"></div>
    </div>
    <div class="form-element-wrapper">
      <div class="field-container">
        <label for="email">* Email:</label>
        <input class="form-input" type="email" id="email" name="email" placeholder="email" required aria-required="true">
      </div>
      <div class="form-errors" id="email-error"></div>
    </div>
    <div>
      <button id="submit-button" type="submit" disabled>add user</button>
    </div>
  </form>
  <div id="form-submit-error" class="form-element-wrapper">
  </div>
  <div>
    <h2>Users:</h2>
    <ul id="users"></
    ul>
  </div>
</div>
______________________

/*
Assignement:

# HTML
Complete the HTML to have semantic and compliant markups.

# PURE JAVASCRIPT
Dynamically add a user to the users list.
1. Highlight the email input when a user enters an invalid email address and display following message: "please enter a valid email address" in red.
2. Use the addUser function to submit the user's data.
3. If the ajax request returns an error, display the error message in red.
4. Display the newly added user in the users list when the request was successful. 

# BONUS
- make WCAG compliant
- add some CSS3 properties



// START YOUR CODE HERE

// Global Values are bad practice, for sake of brevity I used this approach.
let formValidations = {
  username: false,
  email: false,
}
let usernameInput;
let emailInput;

window.onload = (() => {
  usernameInput = document.querySelector('input[name="username"]');
  usernameInput.addEventListener("change", validateUsername);
  usernameInput.addEventListener("blur", validateUsername);

  emailInput = document.querySelector('input[name="email"]');
  emailInput.addEventListener("change", validateEmail);
  emailInput.addEventListener("blur", validateEmail);

  const submitForm = document.querySelector('#add-user-form');
  submitForm.addEventListener("submit", handleSubmit);
})

// validateEmail and validateUsername could be refactored to be a reusable function that follows the dry principle.
function validateEmail(event) {
  const {
    value
  } = event.currentTarget;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailErrorElement = document.querySelector("#email-error");
  if (emailRegex.test(value)) {
    emailErrorElement.innerText = "";
    emailErrorElement.classList.remove("has-error");
    emailInput.classList.remove("has-error");
    formValidations.email = true;
  } else {
    emailErrorElement.innerText = "Please enter a valid email address.";
    emailErrorElement.classList.add("has-error");
    emailInput.classList.add("has-error");
    formValidations.email = false;
  }

  handleSubmitEnabled();
}

// validateEmail and validateUsername could be refactored to be a reusable function that follows the dry principle.
function validateUsername(event) {
  const {
    value
  } = event.currentTarget;
  const usernameErrorElement = document.querySelector("#username-error");
  if (value.length > 0) {
    usernameErrorElement.innerText = "";
    usernameErrorElement.classList.remove("has-error");
    usernameInput.classList.remove("has-error");
    formValidations.username = true;
  } else {
    usernameErrorElement.innerText = "Please enter a username.";
    usernameErrorElement.classList.add("has-error");
    usernameInput.classList.add("has-error");
    formValidations.username = false;
  }

  handleSubmitEnabled();
}

function handleSubmitEnabled() {
  const submitButton = document.querySelector("#submit-button");
  submitButton.disabled = Object
    .values(formValidations)
    .some(value => !value);
}

function onSubmitSuccess(response) {
  const {
    error
  } = response;

  const submitErrorElement = document.querySelector("#form-submit-error");

  if (error) {
    submitErrorElement.innerText = error;
    submitErrorElement.classList.add("has-error");
    return; //escape hatch
  } else {
    submitErrorElement.innerText = "";
    submitErrorElement.classList.remove("has-error");
  }

  // Destruct response user
  const {
    username,
    email
  } = response.user;

  // Get users list item
  const usersElement = document.querySelector("#users");

  // Create new list item entry
  const newUserEntry = document.createElement("li");

  // create new username element and append it to new list item.
  const usernameElement = document.createElement("span");
  usernameElement.innerText = `${username} `;
  newUserEntry.append(usernameElement);

  // create new email element and append it to new list item.
  const emailElement = document.createElement("span");
  emailElement.innerText = email;
  newUserEntry.append(emailElement);

  // append new user entry to the queired users unordered lists.
  usersElement.append(newUserEntry);

  usernameInput.value = ""
  emailInput.value = ""
  formValidations = {
    username: false,
    email: false,
  }

  handleSubmitEnabled();
}

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  const {
    email,
    username
  } = formProps;

  addUser(username, email, onSubmitSuccess);
}

// END YOUR CODE HERE

// Do not modify this function. Add user service wrapper.
function addUser(username, email, callback) {
  var xhr = new XMLHttpRequest();
  var response;
  var success = (!!Math.round(Math.random()));

  if (!success) {
    response = JSON.stringify({
      success: success,
      error: "Oops, something went wrong!"
    });
  } else {
    response = JSON.stringify({
      success: success,
      user: {
        username: username,
        email: email
      }
    });
  }

  xhr.open("POST", "/echo/json/");
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  }
  xhr.send("json=" + response);
};

__________________________________

#add-user-wrapper {
  padding: 10px 20px;
}

#add-user-form {
  display: flex;
  flex-direction: column;
}

.form-element-wrapper {
  border: 1px solid #000000;
  padding: 8px 0;
  margin: 5px 0;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.05);
}

.field-container {
  display: flex;
  align-items: center;
}

.field-container > label {
  min-width: 95px;
  display: inline-block;
  text-align: right;
}

.field-container > input {
  padding: 3px 5px;
  margin: 0 10px;
  flex-grow: 1;
}

#form-submit-error {
  display: none;
  padding: 10px;
  color: #FF0000;
  font-weight: 600;
}

.has-error {
  border: 1px solid #FF0000;
}

.form-errors {
  color: #FF0000;
  border: none;
  text-align: center;
  width: 100%;
  display: block;
}

.form-errors.has-error {
  padding: 10px 0 5px;
}

#form-submit-error.has-error {
  display: block;
}

#submit-button {
  margin: 5px 0;
  padding: 5px;
  border-radius: 5px;
  width: 100%;
  text-transform: uppercase;
}

*/