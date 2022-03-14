/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-vars
function displayModal () {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';

  const photographName = document.querySelector('.photograph_name').textContent;
  const contactTitle = document.getElementById('contact_title');
  contactTitle.innerText = `Contactez-moi | ${photographName}`;
}

function closeModal () {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

const form = document.getElementById('contactForm');
form.addEventListener('submit', (event) => validateForm(event));

function validateForm (event) {
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
    // Création d'un tableau pour l'insertion d'une variable temporaire pour la fonction.
    const errorLabel = [];
    // Insertion d'une variable temporaire dans le tableau précédent pour la fonction par rapport au nom de l'erreur.
    errorLabel[errorName] = document.getElementById(`${errorName}Error`);
    // Condition ternaire qui vérifie si l'erreur correspondant est oui ou non activée.

    if (error[errorName]) {
      errorLabel[errorName].style.display !== 'block';
      if (element.type) {
        element.classList.toggle('error-input');
        errorLabel[errorName].style.display = 'block';
      } else {
        errorLabel[errorName].style.display = 'block';
      }
    } else if (errorLabel[errorName].style.display === 'block') {
      if (element.type) {
        // Si c'est un input, on désactive la classe d'erreur sur le champ du formulaire ainsi que le texte d'erreur.
        element.classList.toggle('error-input');
        errorLabel[errorName].style.display = 'none';
      } else {
        // Sinon on désactive uniquement le texte.
        errorLabel[errorName].style.display = 'none';
      }
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
