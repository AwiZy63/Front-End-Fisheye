/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-vars
const form = document.getElementById('contactForm');
form.addEventListener('submit', (event) => validateForm(event));

/**
 * It validates the form and sends the data to the console.
 * @param event - The event that triggered the validation.
 */
const validateForm = (event) => {
  /* Creating variables that will be used to store the elements of the form. */
  const firstInput = document.getElementById('firstName');
  const lastInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  /* It prevents the default action of the event from happening. */
  event.preventDefault();

  /* A regular expression that will be used to check if the email is valid. */
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;

  const error = {};

  /* Creating a variable that will be used to store the data that will be sent to the console. */
  const data = {
    firstName: firstInput.value,
    lastName: lastInput.value,
    email: emailInput.value,
    message: messageInput.value
  };

  /* Checking if the value of the input is empty or if the length of the value is less than 2. If it is
  the case, then it will add the error class to the input element and make the error label visible. */
  !data.firstName || data.firstName.length < 2 ? error.firstName = true : null;
  !data.lastName || data.lastName.length < 2 ? error.lastName = true : null;
  !data.email || !data.email.match(emailRegex) ? error.email = true : null;
  !data.message || data.message.length < 2 ? error.message = true : null;

  /**
   * * If the error is present and the error label is not visible, then add the error class to the
   * input element and make the error label visible.
   * * If the error is not present and the error label is visible, then remove the error class from the
   * input element and make the error label invisible
   * @param element - The element that is being validated.
   * @param errorName - The name of the error that you want to create.
   */
  const createError = (element, errorName) => {
    const errorLabel = [];
    errorLabel[errorName] = document.getElementById(`${errorName}Data`);
    errorLabel[errorName].removeAttribute("data-error-visible");

    /* Adding the error class to the input element and making the error label visible. */
    if (error[errorName] && !errorLabel[errorName].attributes["data-error-visible"]) {
      element.classList.add('error-input');
      errorLabel[errorName].setAttribute("data-error-visible", "true");
    }

    if (!error[errorName] && !errorLabel[errorName].attributes["data-error-visible"]) {
      element.classList.remove('error-input');
      errorLabel[errorName].removeAttribute("data-error-visible");
    }
  };


  /* Creating the error label for each input element. */
  createError(firstInput, 'firstName');
  createError(lastInput, 'lastName');
  createError(emailInput, 'email');
  createError(messageInput, 'message');

  /* Checking if there is any error in the form. If there is no error, then it will send the data to the
  console and close the modal. */
  if (Object.keys(error).length === 0) {
    console.log(data);
    firstInput.value = '';
    lastInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    alert('formulaire envoyé');
    closeModal();
  }
}
