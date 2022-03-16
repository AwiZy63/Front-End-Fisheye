/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-vars
function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';

  const photographName = document.querySelector('.photograph_name').textContent;
  const contactTitle = document.getElementById('contact_title');
  contactTitle.innerText = `Contactez-moi | ${photographName}`;
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

const form = document.getElementById('contactForm');
form.addEventListener('submit', (event) => validateForm(event));

function validateForm(event) {
  event.preventDefault();
  const firstInput = document.getElementById('firstName');
  const lastInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

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
