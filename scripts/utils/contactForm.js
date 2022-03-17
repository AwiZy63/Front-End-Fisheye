/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-vars
const form = document.getElementById('contactForm');
form.addEventListener('submit', (event) => validateForm(event));

/**
 * It validates the form and sends the data to the console.
 * @param event - The event that triggered the validation.
 */
const validateForm = (event) => {
  const firstInput = document.getElementById('firstName');
  const lastInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  event.preventDefault();

  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;

  const error = {};

  const data = {
    firstName: firstInput.value,
    lastName: lastInput.value,
    email: emailInput.value,
    message: messageInput.value
  };

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

    if (error[errorName] && !errorLabel[errorName].attributes["data-error-visible"]) {
      element.classList.add('error-input');
      errorLabel[errorName].setAttribute("data-error-visible", "true");
    }

    if (!error[errorName] && !errorLabel[errorName].attributes["data-error-visible"]) {
      element.classList.remove('error-input');
      errorLabel[errorName].removeAttribute("data-error-visible");
    }
  };

  // Création des messages d'erreurs.
  createError(firstInput, 'firstName');
  createError(lastInput, 'lastName');
  createError(emailInput, 'email');
  createError(messageInput, 'message');

  Object.keys(error).length === 0
    ? (
      console.log(data),
      firstInput.value = '',
      lastInput.value = '',
      emailInput.value = '',
      messageInput.value = '',
      alert('formulaire envoyé'),
      closeModal()
    )
    : event.preventDefault();
}
