/**
 * It fetches the data from the photographers.json file and returns the data as a JavaScript object.
 * @returns An object with a single key, `photographers`. The value of that key is an array of objects.
 * Each object represents a photographer.
 */
const getPhotographers = async () => {
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  const photographers = data.photographers;

  return ({
    photographers: [...photographers]
  });
}

/**
 * It takes in an array of photographers and then loops through each photographer and creates a user
 * card for each one.
 * @param photographers - an array of objects containing the photographer data.
 */
const displayData = async (photographers) => {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

/**
 * It gets the data from the API and displays it on the page.
 */
const init = async () => {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();
